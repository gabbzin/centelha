<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FamilyAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login_from_index(): void
    {
        $this->get('/family')->assertRedirect('/login');
    }

    public function test_guests_are_redirected_to_login_from_show(): void
    {
        $this->get('/family/details/1')->assertRedirect('/login');
    }

    public function test_guests_are_redirected_to_login_from_edit(): void
    {
        $this->get('/family/1/edit')->assertRedirect('/login');
    }

    public function test_guests_are_redirected_to_login_from_store(): void
    {
        $this->post('/family', ['_token' => 'test-token'])
            ->assertRedirect('/login');
    }

    public function test_guests_are_redirected_to_login_from_update(): void
    {
        $this->put('/family/1', ['_token' => 'test-token'])
            ->assertRedirect('/login');
    }

    public function test_guests_are_redirected_to_login_from_deactivate(): void
    {
        $this->patch('/family/1/deactivate', ['_token' => 'test-token'])
            ->assertRedirect('/login');
    }

    public function test_guests_are_redirected_to_login_from_activate(): void
    {
        $this->patch('/family/1/activate', ['_token' => 'test-token'])
            ->assertRedirect('/login');
    }

    public function test_authenticated_users_can_access_family_index(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/family')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('family/family'));
    }
}
