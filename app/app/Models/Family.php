<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

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
