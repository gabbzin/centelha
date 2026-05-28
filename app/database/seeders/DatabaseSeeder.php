<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CommunityCenter;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        CommunityCenter::create([
            'name' => 'Centelha',
            'location' => '',
            'slogan' => 'Gestão inteligente e eficiência na comunicação',
            'rodape_text' => '© 2026 Centelha Administrative System. Todos os direitos reservados.',
            'logo_path' => './logo.png',
            'favicon_path' => './logo.png',
            'fontFamily' => 'Inter',
            'settings' => [],
        ]);

        $this->call([
            FamilySeeder::class,
        ]);
    }
}
