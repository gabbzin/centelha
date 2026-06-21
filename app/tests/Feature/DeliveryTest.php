<?php

namespace Tests\Feature;

use App\Models\Benefit;
use App\Models\Family;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class DeliveryTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login()
    {
        $this->get('/entregas')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_list_deliveries()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/entregas')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('entregas')
                ->has('deliveries.data')
                ->has('benefits')
            );
    }

    public function test_authenticated_user_can_store_delivery_and_decrement_stock()
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        $benefit = Benefit::factory()->create(['stock' => 10]);

        $response = $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/entregas', [
                '_token' => 'test-token',
            'family_id' => $family->id,
            'benefit_id' => $benefit->id,
            'quantity' => 3,
            'delivery_date' => now()->format('Y-m-d'),
            'location' => 'Centro Comunitário A',
            'notes' => 'Observação de teste',
        ]);

        $response->assertRedirect('/entregas');

        $this->assertDatabaseHas('deliveries', [
            'family_id' => $family->id,
            'benefit_id' => $benefit->id,
            'quantity' => 3,
            'location' => 'Centro Comunitário A',
        ]);

        $this->assertDatabaseHas('stock_movements', [
            'benefit_id' => $benefit->id,
            'quantity' => -3,
            'type' => 'delivery',
        ]);

        $this->assertEquals(7, $benefit->fresh()->stock);
    }

    public function test_delivery_fails_when_stock_is_insufficient()
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        $benefit = Benefit::factory()->create(['stock' => 2]);

        $response = $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/entregas', [
                '_token' => 'test-token',
            'family_id' => $family->id,
            'benefit_id' => $benefit->id,
            'quantity' => 5,
            'delivery_date' => now()->format('Y-m-d'),
            'location' => 'Centro Comunitário A',
        ]);

        $response->assertRedirect('/entregas');
        $response->assertSessionHasErrors(['quantity' => 'Estoque insuficiente para este benefício.']);

        $this->assertDatabaseCount('deliveries', 0);
        $this->assertEquals(2, $benefit->fresh()->stock);
    }

    public function test_delivery_accepts_valid_receipt_file()
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        $benefit = Benefit::factory()->create(['stock' => 5]);

        $response = $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/entregas', [
                '_token' => 'test-token',
            'family_id' => $family->id,
            'benefit_id' => $benefit->id,
            'quantity' => 1,
            'delivery_date' => now()->format('Y-m-d'),
            'location' => 'Centro Comunitário A',
            'receipt' => UploadedFile::fake()->create('comprovante.jpg', 100, 'image/jpeg'),
        ]);

        $response->assertRedirect('/entregas');
        $this->assertDatabaseCount('deliveries', 1);
    }

    public function test_delivery_rejects_invalid_receipt_file()
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        $benefit = Benefit::factory()->create(['stock' => 5]);

        $response = $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/entregas', [
                '_token' => 'test-token',
            'family_id' => $family->id,
            'benefit_id' => $benefit->id,
            'quantity' => 1,
            'delivery_date' => now()->format('Y-m-d'),
            'location' => 'Centro Comunitário A',
            'receipt' => UploadedFile::fake()->create('comprovante.exe', 100, 'application/x-msdownload'),
        ]);

        $response->assertSessionHasErrors(['receipt']);
        $this->assertDatabaseCount('deliveries', 0);
    }
}
