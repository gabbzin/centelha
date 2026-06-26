<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Family;
use App\Models\FamilyMember;
use App\Models\SpecificNeed;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FamilyReadTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_renders_family_listing_page(): void
    {
        $user = User::factory()->create();
        Family::factory()->count(3)->create();

        $this->actingAs($user)
            ->get('/family')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('family/family')
                ->has('families.data')
            );
    }

    public function test_index_filters_families_by_responsible_name(): void
    {
        $user = User::factory()->create();
        $matching = Family::factory()->create(['responsible_name' => 'João Silva']);
        Family::factory()->create(['responsible_name' => 'Maria Souza']);

        $response = $this->actingAs($user)->get('/family?search=João');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('family/family')
            ->has('families.data', 1)
            ->where('families.data.0.id', $matching->id)
        );
    }

    public function test_show_renders_family_info_page(): void
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        Address::factory()->for($family)->create();
        FamilyMember::factory()->for($family)->count(2)->create();
        $needs = SpecificNeed::factory()->count(2)->create();
        $family->specificNeeds()->attach($needs);

        $this->actingAs($user)
            ->get("/family/details/{$family->id}")
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('family/[id]/family-info')
                ->has('id')
                ->has('backUrl')
                ->has('family')
                ->has('family.address')
                ->has('family.members', 2)
                ->has('family.specific_needs', 2)
            );
    }

    public function test_show_returns_404_for_nonexistent_family(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/family/details/9999')
            ->assertNotFound();
    }

    public function test_edit_renders_family_form_page(): void
    {
        $user = User::factory()->create();
        $family = Family::factory()->create();
        Address::factory()->for($family)->create();
        FamilyMember::factory()->for($family)->count(2)->create();

        $this->actingAs($user)
            ->get("/family/{$family->id}/edit")
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('family/form/edit')
                ->has('family')
                ->has('family.address')
                ->has('family.members', 2)
            );
    }
}
