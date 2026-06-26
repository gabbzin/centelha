<?php

declare(strict_types=1);

namespace App\Dto;

use App\Models\Delivery;

final readonly class DeliveryResult
{
    public function __construct(
        public readonly Delivery $delivery,
    ) {}
}
