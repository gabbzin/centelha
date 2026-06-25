<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    use HasFactory;

    protected $fillable = [
        'benefit_id',
        'quantity',
        'type',
        'reference_type',
        'reference_id',
        'created_by',
        'reason',
    ];

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
