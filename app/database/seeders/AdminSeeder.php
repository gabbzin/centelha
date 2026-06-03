<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if (empty($email) || empty($password)) {
            throw new \RuntimeException('ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment.');
        }

        User::firstOrCreate(
            ['email' => $email],
            [
                'name' => 'Administrador',
                'password' => $password,
                'role' => UserRole::Admin->value,
                'ativo' => true,
            ]
        );
    }
}
