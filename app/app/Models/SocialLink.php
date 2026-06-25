<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    protected $fillable = [
        'community_center_id',
        'value',
    ];

    public function communityCenter()
    {
        return $this->belongsTo(CommunityCenter::class);
    }
}
