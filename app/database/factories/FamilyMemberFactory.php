<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FamilyMemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'birth_date' => fake()->dateTimeBetween('-80 years', 'now')->format('Y-m-d'),
            'relationship' => fake()->randomElement(['Filho(a)', 'Cônjuge', 'Pai/Mãe', 'Neto(a)', 'Outro']),
            'cpf' => fake()->optional(0.5)->numerify('###.###.###-##'),
        ];
    }
}
