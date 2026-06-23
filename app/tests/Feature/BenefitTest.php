<?php

namespace Tests\Feature;

use App\Models\Benefit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BenefitTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login(): void
    {
        $this->get('/beneficios')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_list_benefits(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/beneficios')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('beneficios')
                ->has('benefits.data')
            );
    }

    public function test_benefit_can_be_created_with_image_uploaded_to_minio(): void
    {
        Storage::fake('minio');

        $user = User::factory()->create();

        $response = $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/beneficios', [
                '_token' => 'test-token',
                'name' => 'Cesta Básica',
                'category' => 'Alimentação',
                'quantity' => 10,
                'image' => UploadedFile::fake()->create('cesta.jpg', 100, 'image/jpeg'),
            ]);

        $response->assertRedirect('/beneficios');

        $benefit = Benefit::first();

        $this->assertNotNull($benefit->image_path);
        $this->assertStringStartsWith('benefits/images/', $benefit->image_path);

        Storage::disk('minio')->assertExists($benefit->image_path);
    }

    public function test_benefit_rejects_invalid_image_mime(): void
    {
        $user = User::factory()->create();

        $response = $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post('/beneficios', [
                '_token' => 'test-token',
                'name' => 'Cesta Básica',
                'category' => 'Alimentação',
                'quantity' => 10,
                'image' => UploadedFile::fake()->create('benefit.exe', 100, 'application/x-msdownload'),
            ]);

        $response->assertSessionHasErrors(['image']);
        $this->assertDatabaseCount('benefits', 0);
    }

    public function test_updating_image_removes_old_one_from_minio(): void
    {
        Storage::fake('minio');

        $user = User::factory()->create();
        $benefit = Benefit::factory()->create([
            'image_path' => 'benefits/images/old-hash.jpg',
        ]);

        Storage::disk('minio')->put('benefits/images/old-hash.jpg', 'old-content');

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post("/beneficios/{$benefit->id}", [
                '_method' => 'PUT',
                '_token' => 'test-token',
                'image' => UploadedFile::fake()->create('new.jpg', 100, 'image/jpeg'),
            ]);

        $benefit->refresh();

        $this->assertNotEquals('benefits/images/old-hash.jpg', $benefit->image_path);
        Storage::disk('minio')->assertMissing('benefits/images/old-hash.jpg');
        Storage::disk('minio')->assertExists($benefit->image_path);
    }

    public function test_removing_image_via_update_deletes_file_from_minio(): void
    {
        Storage::fake('minio');

        $user = User::factory()->create();
        $benefit = Benefit::factory()->create([
            'image_path' => 'benefits/images/keep.jpg',
        ]);

        Storage::disk('minio')->put('benefits/images/keep.jpg', 'content');

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->post("/beneficios/{$benefit->id}", [
                '_method' => 'PUT',
                '_token' => 'test-token',
                'remove_image' => '1',
            ]);

        $benefit->refresh();

        $this->assertNull($benefit->image_path);
        Storage::disk('minio')->assertMissing('benefits/images/keep.jpg');
    }

    public function test_destroying_benefit_deletes_image_from_minio(): void
    {
        Storage::fake('minio');

        $user = User::factory()->create();
        $benefit = Benefit::factory()->create([
            'image_path' => 'benefits/images/to-delete.jpg',
        ]);

        Storage::disk('minio')->put('benefits/images/to-delete.jpg', 'content');

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->delete("/beneficios/{$benefit->id}", ['_token' => 'test-token'])
            ->assertRedirect('/beneficios');

        $this->assertDatabaseMissing('benefits', ['id' => $benefit->id]);
        Storage::disk('minio')->assertMissing('benefits/images/to-delete.jpg');
    }

    public function test_benefit_serializes_image_url_accessor(): void
    {
        Storage::fake('minio');

        $benefit = Benefit::factory()->create([
            'image_path' => 'benefits/images/serialized.jpg',
        ]);

        $array = $benefit->toArray();

        $this->assertArrayHasKey('image_url', $array);
        $this->assertNotNull($array['image_url']);
    }

    public function test_benefit_without_image_returns_null_image_url(): void
    {
        $benefit = Benefit::factory()->create(['image_path' => null]);

        $this->assertNull($benefit->toArray()['image_url'] ?? null);
    }
}
