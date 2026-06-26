<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\MaskedCpf;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Family extends Model
{
    use HasFactory;

    protected $fillable = [
        "responsible_name",
        "responsible_cpf",
        "responsible_birth_date",
        "responsible_phone",
        "responsible_email",
        "is_active",
        "total_income",
        "income_source",
        "receives_government_aid",
        "government_aid_description",
        "housing_condition",
        "general_observations",
    ];

    protected $casts = [
        "responsible_birth_date" => "date",
        "is_active" => "boolean",
        "receives_government_aid" => "boolean",
        "total_income" => "integer",
        "responsible_cpf" => MaskedCpf::class,
    ];

    public function address(): HasOne
    {
        return $this->hasOne(Address::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(FamilyMember::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, "family_tag", "family_id", "tag_id");
    }

    public function deliveries(): HasMany
    {
        return $this->hasMany(Delivery::class);
    }
}
