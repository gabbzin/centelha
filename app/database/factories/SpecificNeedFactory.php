<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SpecificNeedFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
        ];
    }
}
