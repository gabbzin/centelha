<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\MaskedCpf;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'family_id',
        'name',
        'birth_date',
        'relationship',
        'cpf',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'cpf' => MaskedCpf::class,
    ];

    public function family()
    {
        return $this->belongsTo(Family::class);
    }
}
