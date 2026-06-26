<?php

declare(strict_types=1);

namespace App\Dto;

use App\Models\Family;

final readonly class FamilyResult
{
    public function __construct(
        public readonly Family $family,
    ) {}
}
