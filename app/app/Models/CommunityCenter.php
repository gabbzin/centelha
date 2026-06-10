<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityCenter extends Model
{
    protected $table = 'community_center';
    protected $fillable = [
        'name',
        'location',
        'slogan',
        'rodape_text',
        'logo_path',
        'favicon_path',
        'fontFamily',
        'settings',
        'colors',
    ];
    protected function casts(): array
    {
        return [
            'settings' => 'array',
            'colors' => 'array',
        ];
    }
}
