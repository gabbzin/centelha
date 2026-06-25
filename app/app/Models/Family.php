<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    protected $fillable = [
        'responsible_name',
        'responsible_cpf',
        'responsible_birth_date',
        'responsible_phone',
        'responsible_email',
        'is_active',
        'total_income',
        'income_source',
        'receives_government_aid',
        'government_aid_description',
        'housing_condition',
        'general_observations',
    ];

    protected $casts = [
        'responsible_birth_date' => 'date',
        'is_active' => 'boolean',
        'receives_government_aid' => 'boolean',
        'total_income' => 'integer',
        'responsible_cpf' => \App\Casts\MaskedCpf::class,
    ];
    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function members()
    {
        return $this->hasMany(FamilyMember::class);
    }

    public function specificNeeds()
    {
        return $this->belongsToMany(SpecificNeed::class);
    }

    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }
}
