<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            CommunityCenterSeeder::class,
            TagSeeder::class,
            FamilySeeder::class,
            BenefitSeeder::class,
            DeliverySeeder::class,
        ]);
    }
}
