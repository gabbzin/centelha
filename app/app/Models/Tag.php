<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "color",
        "icon",
    ];

    protected $casts = [
        "color" => "string",
        "icon" => "string",
    ];

    public function families(): BelongsToMany
    {
        return $this->belongsToMany(Family::class, "family_tag", "tag_id", "family_id");
    }
}
