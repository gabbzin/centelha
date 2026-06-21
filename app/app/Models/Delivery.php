<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'delivery_date' => 'date',
        'quantity' => 'integer',
    ];

    public function family()
    {
        return $this->belongsTo(Family::class);
    }

    public function benefit()
    {
        return $this->belongsTo(Benefit::class);
    }

    public function deliveredBy()
    {
        return $this->belongsTo(User::class, 'delivered_by');
    }

    public function generateCode(): string
    {
        return 'ENT-' . str_pad((string) $this->id, 4, '0', STR_PAD_LEFT);
    }
}
