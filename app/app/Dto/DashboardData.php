<?php

declare(strict_types=1);

namespace App\Dto;

final readonly class DashboardData
{
    public function __construct(
        public readonly array $statsCards,
        public readonly array $alerts,
        public readonly array $topItems,
        public readonly array $chartData,
        public readonly array $availablePeriods,
        public readonly int $selectedMonth,
        public readonly int $selectedYear,
    ) {}
}
