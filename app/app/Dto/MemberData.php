<?php

declare(strict_types=1);

namespace App\Dto;

final readonly class MemberData
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $cpf,
        public readonly ?string $birthDate,
        public readonly ?string $relationship,
    ) {}
}
