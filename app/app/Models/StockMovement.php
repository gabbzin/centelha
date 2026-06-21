<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'quantity' => 'integer',
    ];

    public function benefit()
    {
        return $this->belongsTo(Benefit::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
