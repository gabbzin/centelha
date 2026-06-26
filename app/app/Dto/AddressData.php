<?php

declare(strict_types=1);

namespace App\Dto;

final readonly class AddressData
{
    public function __construct(
        public readonly string $zipcode,
        public readonly string $street,
        public readonly string $number,
        public readonly string $neighborhood,
        public readonly string $city,
        public readonly string $state,
    ) {}
}
