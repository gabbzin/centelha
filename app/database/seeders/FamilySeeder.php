<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Family;
use App\Models\FamilyMember;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class FamilySeeder extends Seeder
{
    public function run(): void
    {
        $tags = collect();
        foreach (TagSeeder::TAGS as $tagData) {
            $tags->push(Tag::firstOrCreate(["name" => $tagData["name"]], $tagData));
        }

        Family::factory()
            ->count(8)
            ->has(
                Address::factory()->state(function (array $attributes, Family $family) {
                    return ["family_id" => $family->id];
                }),
                "address"
            )
            ->has(
                FamilyMember::factory()
                    ->count(rand(1, 4))
                    ->state(function (array $attributes, Family $family) {
                        return ["family_id" => $family->id];
                    }),
                "members"
            )
            ->create()
            ->each(function (Family $family) use ($tags) {
                $randomTags = $tags->random(rand(0, 2))->pluck("id");
                $family->tags()->attach($randomTags);
            });
    }
}
