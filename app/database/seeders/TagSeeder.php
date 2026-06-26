<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public const TAGS = [
        ["name" => "Intolerância à Lactose", "color" => "#EF4444", "icon" => "Droplets"],
        ["name" => "Necessidade de Fraldas (Infantil)", "color" => "#F97316", "icon" => "Baby"],
        ["name" => "Necessidade de Fraldas (Geriátrica)", "color" => "#A855F7", "icon" => "Heart"],
        ["name" => "PCD / Mobilidade Reduzida", "color" => "#3B82F6", "icon" => "Accessibility"],
        ["name" => "Gestante", "color" => "#EC4899", "icon" => "HeartHandshake"],
        ["name" => "Acamado", "color" => "#6366F1", "icon" => "Home"],
    ];

    public function run(): void
    {
        foreach (self::TAGS as $tag) {
            Tag::firstOrCreate(["name" => $tag["name"]], $tag);
        }
    }
}
