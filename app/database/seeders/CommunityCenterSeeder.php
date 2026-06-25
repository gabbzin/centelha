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
        ]);
    }
}
