<?php

namespace Database\Factories;

use App\Models\CommunityCenter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CommunityCenter>
 */
class CommunityCenterFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'location' => fake()->city(),
            'slogan' => fake()->optional()->sentence(),
            'rodape_text' => fake()->optional()->sentence(),
            'logo_path' => 'logo.svg',
            'favicon_path' => 'logo.png',
            'fontFamily' => 'Inter',
            'singleton' => null,
            'settings' => [],
            'colors' => [
                'primary' => '#1558D6',
                'background' => '#FFFFFF',
                'surface' => '#F8F9FA',
                'text_primary' => '#191C1E',
                'text_secondary' => '#959598',
                'text_disabled' => '#C5C6C7',
                'hover' => '#EFF6FF',
                'active' => '#1A5090',
                'success' => '#4ADE80',
                'error' => '#EF4444',
                'warning' => '#F59E0B',
                'info' => '#3B82F6',
                'button' => '#094785',
            ],
        ];
    }

    public function singleton(): static
    {
        return $this->state(fn () => ['singleton' => true]);
    }
}
