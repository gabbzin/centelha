<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TagFactory extends Factory
{
    private const COLORS = [
        "#EF4444", "#F97316", "#EAB308", "#22C55E",
        "#3B82F6", "#6366F1", "#A855F7", "#EC4899",
    ];

    private const ICONS = [
        "Heart", "Baby", "Home", "HeartHandshake", "Apple",
        "Pill", "Accessibility", "Droplets", "Shield",
        "ShoppingBasket", "Stethoscope", "Wheat",
    ];

    public function definition(): array
    {
        return [
            "name" => fake()->word(),
            "color" => fake()->randomElement(self::COLORS),
            "icon" => fake()->randomElement(self::ICONS),
        ];
    }
}
