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

    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function generateCode(): string
    {
        return 'BNF-' . str_pad((string) $this->id, 3, '0', STR_PAD_LEFT);
    }
}
