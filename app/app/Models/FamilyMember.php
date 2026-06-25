<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'birth_date' => 'date',
        'cpf' => \App\Casts\MaskedCpf::class,
    ];
    public function family()
    {
        return $this->belongsTo(Family::class);
    }
}
