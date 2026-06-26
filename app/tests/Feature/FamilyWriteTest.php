<?php

namespace Tests\Feature;

use App\Models\Family;
use App\Models\FamilyMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FamilyWriteTest extends TestCase
{
    use RefreshDatabase;

    private function validFamilyPayload(array $overrides = []): array
    {
        return array_merge([
            '_token' => 'test-token',
            'name' => 'João Silva',
            'cpf' => '12345678900',
            'telefone' => '11999999999',
            'email' => 'joao@example.com',
            'data_nascimento' => '1990-01-01',
            'cep' => '01001000',
            'logradouro' => 'Rua Teste',
            'numero' => '123',
            'cidade' => 'São Paulo',
            'UF' => 'SP',
            'bairro' => 'Centro',
            'moradia' => 'propria',
            'fonte_renda' => 'Formal',
            'renda_familiar' => '2500',
            'recebe_auxilio' => 'sim',
            'auxilios_recebidos' => 'Bolsa Família',
            'general_observations' => 'Observação de teste',
            'family_members' => [
                [
                    'name' => 'Maria Silva',
                    'cpf' => '98765432100',
                    'data_nascimento' => '2010-05-05',
                    'relacao_parentesco' => 'Filho(a)',
                ],
            ],
        ], $overrides);
    }

    public function test_store_creates_family_with_address_and_members(): void
    {
        $user = User::factory()->create();

        $response = $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload());

        $response->assertRedirect('/family');

        $this->assertDatabaseHas('families', [
            'responsible_name' => 'João Silva',
            'responsible_cpf' => '12345678900',
            'responsible_phone' => '11999999999',
            'responsible_email' => 'joao@example.com',
            'total_income' => 250000,
            'receives_government_aid' => true,
            'government_aid_description' => 'Bolsa Família',
            'housing_condition' => 'propria',
            'general_observations' => 'Observação de teste',
        ]);

        $family = Family::where('responsible_cpf', '12345678900')->first();

        $this->assertDatabaseHas('addresses', [
            'family_id' => $family->id,
            'zipcode' => '01001000',
            'street' => 'Rua Teste',
            'number' => '123',
            'neighborhood' => 'Centro',
            'city' => 'São Paulo',
            'state' => 'SP',
        ]);

        $this->assertDatabaseHas('family_members', [
            'family_id' => $family->id,
            'name' => 'Maria Silva',
            'cpf' => '98765432100',
            'relationship' => 'Filho(a)',
        ]);
    }

    public function test_store_persists_cpf_digits_only_when_formatted_input_is_sent(): void
    {
        $user = User::factory()->create();
        $payload = $this->validFamilyPayload([
            'cpf' => '123.456.789-00',
            'telefone' => '(11) 99999-9999',
            'cep' => '01001-000',
        ]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $payload)
            ->assertRedirect('/family');

        $this->assertDatabaseHas('families', [
            'responsible_name' => 'João Silva',
            'responsible_cpf' => '12345678900',
            'responsible_phone' => '11999999999',
        ]);

        $this->assertDatabaseHas('addresses', [
            'zipcode' => '01001000',
        ]);
    }

    public function test_update_modifies_family_data(): void
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        $family->address()->create([
            'zipcode' => '00000000',
            'street' => 'Old Street',
            'number' => '1',
            'neighborhood' => 'Old',
            'city' => 'Old City',
            'state' => 'RJ',
        ]);
        FamilyMember::factory()->for($family)->create([
            'name' => 'Old Member',
            'cpf' => '11111111111',
        ]);

        $payload = $this->validFamilyPayload([
            'name' => 'João Atualizado',
            'cpf' => $family->getRawOriginal('responsible_cpf'),
            'email' => 'atualizado@example.com',
            'renda_familiar' => '3000',
        ]);

        $response = $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put("/family/{$family->id}", $payload);

        $response->assertRedirect("/family/details/{$family->id}");

        $this->assertDatabaseHas('families', [
            'id' => $family->id,
            'responsible_name' => 'João Atualizado',
            'responsible_email' => 'atualizado@example.com',
            'total_income' => 300000,
        ]);
    }

    public function test_update_upserts_address(): void
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        $oldAddress = $family->address()->create([
            'zipcode' => '00000000',
            'street' => 'Old Street',
            'number' => '1',
            'neighborhood' => 'Old',
            'city' => 'Old City',
            'state' => 'RJ',
        ]);

        $payload = $this->validFamilyPayload([
            'cpf' => $family->getRawOriginal('responsible_cpf'),
        ]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put("/family/{$family->id}", $payload)
            ->assertRedirect("/family/details/{$family->id}");

        $this->assertDatabaseHas('addresses', [
            'id' => $oldAddress->id,
            'family_id' => $family->id,
            'zipcode' => '01001000',
            'street' => 'Rua Teste',
            'state' => 'SP',
        ]);

        $this->assertDatabaseCount('addresses', 1);
    }

    public function test_update_replaces_members(): void
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        $oldMember = FamilyMember::factory()->for($family)->create([
            'name' => 'Old Member',
            'cpf' => '11111111111',
        ]);

        $payload = $this->validFamilyPayload([
            'cpf' => $family->getRawOriginal('responsible_cpf'),
            'family_members' => [
                [
                    'name' => 'Novo Membro',
                    'cpf' => '22222222222',
                    'data_nascimento' => '2015-03-10',
                    'relacao_parentesco' => 'Cônjuge',
                ],
            ],
        ]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put("/family/{$family->id}", $payload)
            ->assertRedirect("/family/details/{$family->id}");

        $this->assertDatabaseMissing('family_members', ['id' => $oldMember->id]);
        $this->assertDatabaseHas('family_members', [
            'family_id' => $family->id,
            'name' => 'Novo Membro',
            'cpf' => '22222222222',
            'relationship' => 'Cônjuge',
        ]);
        $this->assertDatabaseCount('family_members', 1);
    }

    public function test_update_ignores_unique_cpf_for_same_family(): void
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        $family->address()->create([
            'zipcode' => '00000000',
            'street' => 'Old',
            'number' => '1',
            'neighborhood' => 'Old',
            'city' => 'Old',
            'state' => 'RJ',
        ]);

        $payload = $this->validFamilyPayload([
            'cpf' => $family->getRawOriginal('responsible_cpf'),
        ]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put("/family/{$family->id}", $payload)
            ->assertRedirect("/family/details/{$family->id}");

        $this->assertDatabaseCount('families', 1);
    }
}
