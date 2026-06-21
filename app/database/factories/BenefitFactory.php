<?php

namespace Database\Factories;

use App\Models\Benefit;
use Illuminate\Database\Eloquent\Factories\Factory;

class BenefitFactory extends Factory
{
    protected $model = Benefit::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'category' => $this->faker->randomElement(['Alimentação', 'Financeiro', 'Saúde', 'Vestuário', 'Educação']),
            'stock' => $this->faker->numberBetween(1, 100),
            'status' => 'Ativo',
            'donor' => $this->faker->company(),
            'validity' => $this->faker->date(),
            'notes' => $this->faker->sentence(),
        ];
    }
}
