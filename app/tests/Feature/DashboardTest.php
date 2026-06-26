<?php

namespace Tests\Feature;

use App\Models\Benefit;
use App\Models\Family;
use App\Models\User;
use App\Services\DashboardDataProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $this->actingAs($user = User::factory()->create());

        $this->get('/dashboard')->assertOk();
    }

    public function test_dashboard_data_is_cached_by_period()
    {
        Cache::flush();

        $user = User::factory()->create();
        $family = Family::factory()->create();
        Benefit::factory()->create([
            'stock' => 100,
            'status' => 'Ativo',
            'created_by' => $user->id,
        ]);

        $this->actingAs($user)->get('/dashboard')->assertOk();

        $key = 'dashboard.1.'.now()->year.'.'.now()->month;
        $this->assertTrue(Cache::has($key), 'O snapshot do dashboard deveria estar cacheado.');
    }

    public function test_dashboard_cache_is_busted_after_data_changes()
    {
        Cache::flush();

        $user = User::factory()->create();
        Family::factory()->create();
        Benefit::factory()->create(['stock' => 100, 'status' => 'Ativo', 'created_by' => $user->id]);

        $this->actingAs($user)->get('/dashboard')->assertOk();

        $oldKey = 'dashboard.1.'.now()->year.'.'.now()->month;
        $this->assertTrue(Cache::has($oldKey), 'O snapshot do dashboard deveria estar cacheado.');

        Cache::put(DashboardDataProvider::CACHE_VERSION_KEY, 1);
        DashboardDataProvider::bumpVersion();

        $this->assertSame(2, Cache::get(DashboardDataProvider::CACHE_VERSION_KEY));

        $this->actingAs($user)->get('/dashboard')->assertOk();

        $newKey = 'dashboard.2.'.now()->year.'.'.now()->month;
        $this->assertTrue(Cache::has($newKey), 'O novo snapshot deveria estar cacheado após o bump.');
    }
}
