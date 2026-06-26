<?php

namespace Tests\Feature;

use App\Constants\Messages;
use App\Models\Family;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FamilyStateTest extends TestCase
{
    use RefreshDatabase;

    public function test_deactivate_flips_is_active_to_false(): void
    {
        $user = User::factory()->create();
        $family = Family::factory()->create(['is_active' => true]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->patch("/family/{$family->id}/deactivate", ['_token' => 'test-token'])
            ->assertRedirect('/family')
            ->assertSessionHas('success', Messages::MSG_19);

        $this->assertFalse($family->fresh()->is_active);
    }

    public function test_activate_flips_is_active_to_true(): void
    {
        $user = User::factory()->create();
        $family = Family::factory()->create(['is_active' => false]);

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->patch("/family/{$family->id}/activate", ['_token' => 'test-token'])
            ->assertRedirect('/family')
            ->assertSessionHas('success', Messages::MSG_20);

        $this->assertTrue($family->fresh()->is_active);
    }

    public function test_deactivate_returns_404_for_nonexistent_family(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->patch('/family/9999/deactivate', ['_token' => 'test-token'])
            ->assertNotFound();
    }

    public function test_activate_returns_404_for_nonexistent_family(): void
    {
        $user = User::factory()->create();

        $this->withSession(['_token' => 'test-token'])
            ->actingAs($user)
            ->patch('/family/9999/activate', ['_token' => 'test-token'])
            ->assertNotFound();
    }
}
