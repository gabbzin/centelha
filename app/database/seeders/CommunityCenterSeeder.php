<?php

namespace Database\Seeders;

use App\Models\CommunityCenter;
use Illuminate\Database\Seeder;

class CommunityCenterSeeder extends Seeder
{
    public function run(): void
    {
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
    }
}
