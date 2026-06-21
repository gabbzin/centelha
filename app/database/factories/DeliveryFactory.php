<?php

namespace Database\Factories;

use App\Models\Benefit;
use App\Models\Delivery;
use App\Models\Family;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DeliveryFactory extends Factory
{
    protected $model = Delivery::class;

    public function definition(): array
    {
        return [
            'code' => 'ENT-' . str_pad((string) $this->faker->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT),
            'family_id' => Family::factory(),
            'benefit_id' => Benefit::factory(),
            'quantity' => $this->faker->numberBetween(1, 5),
            'location' => $this->faker->streetName(),
            'delivery_date' => $this->faker->date(),
            'notes' => $this->faker->optional()->sentence(),
            'delivered_by' => User::factory(),
            'status' => 'Entregue',
        ];
    }
}
