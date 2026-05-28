<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FamilyFactory extends Factory
{
    public function definition(): array
    {
        $aid = fake()->boolean(60);
        return [
            'responsible_name' => fake()->name(),
            'responsible_cpf' => fake()->unique()->numerify('###.###.###-##'),
            'responsible_birth_date' => fake()->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d'),
            'responsible_phone' => fake()->phoneNumber(),
            'is_active' => true,
            'total_income' => fake()->numberBetween(50000, 300000), // Valor em centavos (500,00 a 3000,00)
            'income_source' => fake()->randomElement(['Informal', 'Formal', 'Desempregado']),
            'receives_government_aid' => $aid,
            'government_aid_description' => $aid ? fake()->randomElement(['Bolsa Família', 'Auxílio Gás']) : null,
            'housing_condition' => fake()->randomElement(['Alugada', 'Própria', 'Ocupação', 'Cedida']),
            'general_observations' => fake()->optional(0.3)->sentence(),
        ];
    }
}
