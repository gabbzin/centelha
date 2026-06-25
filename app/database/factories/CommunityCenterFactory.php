<?php

namespace Database\Factories;

use App\Models\community_center;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<community_center>
 */
class CommunityCenterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
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
}
