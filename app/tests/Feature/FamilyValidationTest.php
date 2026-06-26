<?php

namespace Tests\Feature;

use App\Models\Family;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FamilyValidationTest extends TestCase
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

    public function test_store_requires_name(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload(['name' => '']))
            ->assertSessionHasErrors(['name']);

        $this->assertDatabaseCount('families', 0);
    }

    public function test_store_requires_cpf(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload(['cpf' => '']))
            ->assertSessionHasErrors(['cpf']);

        $this->assertDatabaseCount('families', 0);
    }

    public function test_store_rejects_cpf_with_wrong_size(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload(['cpf' => '123']))
            ->assertSessionHasErrors(['cpf']);

        $this->assertDatabaseCount('families', 0);
    }

    public function test_store_rejects_duplicate_cpf(): void
    {
        $user = User::factory()->create();
        $existing = Family::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload([
                'cpf' => $existing->getRawOriginal('responsible_cpf'),
            ]))
            ->assertSessionHasErrors(['cpf']);

        $this->assertDatabaseCount('families', 1);
    }

    public function test_store_requires_telefone(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload(['telefone' => '']))
            ->assertSessionHasErrors(['telefone']);
    }

    public function test_store_rejects_underage_responsible(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload([
                'data_nascimento' => now()->subYears(17)->format('Y-m-d'),
            ]))
            ->assertSessionHasErrors(['data_nascimento']);

        $this->assertDatabaseCount('families', 0);
    }

    public function test_store_rejects_invalid_email(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload(['email' => 'not-an-email']))
            ->assertSessionHasErrors(['email']);
    }

    public function test_store_requires_address_fields(): void
    {
        $user = User::factory()->create();

        $payload = $this->validFamilyPayload([
            'cep' => '',
            'logradouro' => '',
            'numero' => '',
            'cidade' => '',
            'UF' => '',
            'bairro' => '',
        ]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $payload)
            ->assertSessionHasErrors(['cep', 'logradouro', 'numero', 'cidade', 'UF', 'bairro']);

        $this->assertDatabaseCount('families', 0);
    }

    public function test_store_rejects_uf_with_wrong_size(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload(['UF' => 'S']))
            ->assertSessionHasErrors(['UF']);
    }

    public function test_store_rejects_invalid_moradia_option(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload(['moradia' => 'invalid']))
            ->assertSessionHasErrors(['moradia']);
    }

    public function test_store_rejects_renda_familiar_above_maximum(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $this->validFamilyPayload(['renda_familiar' => '3501']))
            ->assertSessionHasErrors(['renda_familiar']);

        $this->assertDatabaseCount('families', 0);
    }

    public function test_store_rejects_family_member_without_name(): void
    {
        $user = User::factory()->create();

        $payload = $this->validFamilyPayload([
            'family_members' => [
                [
                    'name' => '',
                    'cpf' => '98765432100',
                    'data_nascimento' => '2010-05-05',
                    'relacao_parentesco' => 'Filho(a)',
                ],
            ],
        ]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $payload)
            ->assertSessionHasErrors(['family_members.0.name']);

        $this->assertDatabaseCount('families', 0);
    }

    public function test_store_rejects_family_member_with_invalid_cpf_size(): void
    {
        $user = User::factory()->create();

        $payload = $this->validFamilyPayload([
            'family_members' => [
                [
                    'name' => 'Maria Silva',
                    'cpf' => '123',
                    'data_nascimento' => '2010-05-05',
                    'relacao_parentesco' => 'Filho(a)',
                ],
            ],
        ]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/family', $payload)
            ->assertSessionHasErrors(['family_members.0.cpf']);

        $this->assertDatabaseCount('families', 0);
    }

    public function test_store_normalizes_formatted_input_before_validating(): void
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
            'responsible_cpf' => '12345678900',
            'responsible_phone' => '11999999999',
        ]);

        $this->assertDatabaseHas('addresses', [
            'zipcode' => '01001000',
        ]);
    }

    public function test_update_requires_name(): void
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

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put("/family/{$family->id}", $this->validFamilyPayload([
                'name' => '',
                'cpf' => $family->getRawOriginal('responsible_cpf'),
            ]))
            ->assertSessionHasErrors(['name']);
    }

    public function test_update_rejects_cpf_from_another_family(): void
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        $other = Family::factory()->create();
        $family->address()->create([
            'zipcode' => '00000000',
            'street' => 'Old',
            'number' => '1',
            'neighborhood' => 'Old',
            'city' => 'Old',
            'state' => 'RJ',
        ]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put("/family/{$family->id}", $this->validFamilyPayload([
                'cpf' => $other->getRawOriginal('responsible_cpf'),
            ]))
            ->assertSessionHasErrors(['cpf']);
    }

    public function test_update_rejects_underage_responsible(): void
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

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->put("/family/{$family->id}", $this->validFamilyPayload([
                'cpf' => $family->getRawOriginal('responsible_cpf'),
                'data_nascimento' => now()->subYears(17)->format('Y-m-d'),
            ]))
            ->assertSessionHasErrors(['data_nascimento']);
    }
}
