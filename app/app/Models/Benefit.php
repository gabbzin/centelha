<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Benefit extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'stock' => 'integer',
        'validity' => 'date',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public static function generateCode(): string
    {
        $latest = static::orderBy('id', 'desc')->first();
        $nextId = $latest ? $latest->id + 1 : 1;
        return 'BNF-' . str_pad((string) $nextId, 3, '0', STR_PAD_LEFT);
    }
}
