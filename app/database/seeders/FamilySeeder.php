<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Family;
use App\Models\FamilyMember;
use App\Models\SpecificNeed;
use Illuminate\Database\Seeder;

class FamilySeeder extends Seeder
{
    public function run(): void
    {
        // 1. Criar as Tags Base primeiro
        $tags = [
            'Intolerância à Lactose',
            'Necessidade de Fraldas (Infantil)',
            'Necessidade de Fraldas (Geriátrica)',
            'PCD / Mobilidade Reduzida',
            'Gestante',
            'Acamado',
        ];

        $specificNeeds = collect();
        foreach ($tags as $tag) {
            $specificNeeds->push(SpecificNeed::firstOrCreate(['name' => $tag]));
        }

        // 2. Criar 8 Famílias com Membros e vincular as Tags
        Family::factory()
            ->count(8)
            ->state(fn () => [
                'created_at' => fake()->dateTimeBetween(now()->subMonth()->startOfMonth(), now()),
            ])
            ->has(
                Address::factory()->state(function (array $attributes, Family $family) {
                    return ['family_id' => $family->id];
                }),
                'address'
            )
            ->has(
                FamilyMember::factory()
                    ->count(rand(1, 4))
                    ->state(function (array $attributes, Family $family) {
                        return ['family_id' => $family->id];
                    }),
                'members'
            )
            ->create()
            ->each(function (Family $family) use ($specificNeeds) {
                // Vincula de 0 a 2 necessidades específicas de forma aleatória
                $randomNeeds = $specificNeeds->random(rand(0, 2))->pluck('id');
                $family->specificNeeds()->attach($randomNeeds);
            });
    }
}
