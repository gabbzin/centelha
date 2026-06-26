<?php

declare(strict_types=1);

namespace App\Services;

use App\Dto\DashboardData;
use App\Models\Benefit;
use App\Models\CommunityCenter;
use App\Models\Delivery;
use App\Models\Family;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

final class DashboardDataProvider
{
    public const CACHE_VERSION_KEY = 'dashboard.cache_version';

    private const TTL = 300;

    private const CHART_CATEGORIES = ['Alimentação', 'Financeiro', 'Saúde', 'Vestuário', 'Educação'];

    public function forPeriod(int $year, int $month): DashboardData
    {
        $cacheKey = $this->cacheKey($year, $month);

        return Cache::remember($cacheKey, self::TTL, function () use ($year, $month): DashboardData {
            $currentStart = Carbon::create($year, $month, 1)->startOfDay();
            $currentEnd = $currentStart->copy()->endOfMonth()->endOfDay();
            $previousStart = $currentStart->copy()->subMonth()->startOfMonth();
            $previousEnd = $currentStart->copy()->subMonth()->endOfMonth()->endOfDay();

            $benefitsDeliveredCurrent = Delivery::whereBetween('delivery_date', [$currentStart, $currentEnd])->count();
            $benefitsDeliveredPrevious = Delivery::whereBetween('delivery_date', [$previousStart, $previousEnd])->count();

            $familiesServedCurrent = Delivery::whereBetween('delivery_date', [$currentStart, $currentEnd])
                ->distinct('family_id')
                ->count('family_id');
            $familiesServedPrevious = Delivery::whereBetween('delivery_date', [$previousStart, $previousEnd])
                ->distinct('family_id')
                ->count('family_id');

            $newRegistrationsCurrent = Family::whereBetween('created_at', [$currentStart, $currentEnd])->count();
            $newRegistrationsPrevious = Family::whereBetween('created_at', [$previousStart, $previousEnd])->count();

            return new DashboardData(
                statsCards: [
                    'benefitsDelivered' => [
                        'value' => $benefitsDeliveredCurrent,
                        'percentageChange' => $this->percentageChange($benefitsDeliveredCurrent, $benefitsDeliveredPrevious),
                    ],
                    'familiesServed' => [
                        'value' => $familiesServedCurrent,
                        'percentageChange' => $this->percentageChange($familiesServedCurrent, $familiesServedPrevious),
                    ],
                    'newRegistrations' => [
                        'value' => $newRegistrationsCurrent,
                        'percentageChange' => $this->percentageChange($newRegistrationsCurrent, $newRegistrationsPrevious),
                    ],
                ],
                alerts: $this->alerts(),
                topItems: $this->topItems($currentStart, $currentEnd),
                chartData: $this->chartData($currentStart, $currentEnd, $previousStart, $previousEnd),
                availablePeriods: $this->availablePeriods(),
                selectedMonth: $month,
                selectedYear: $year,
            );
        });
    }

    public static function bumpVersion(): void
    {
        Cache::increment(self::CACHE_VERSION_KEY);
    }

    private function cacheKey(int $year, int $month): string
    {
        $version = Cache::get(self::CACHE_VERSION_KEY, 1);

        return "dashboard.{$version}.{$year}.{$month}";
    }

    private function percentageChange(int $current, int $previous): int
    {
        if ($previous === 0 && $current === 0) {
            return 0;
        }

        if ($previous === 0) {
            return 100;
        }

        return (int) round((($current - $previous) / $previous) * 100);
    }

    private function alerts(): array
    {
        $communityCenter = CommunityCenter::instance();
        $lowStockLimit = $communityCenter?->settings['rules']['low_stock_limit'] ?? 50;
        $criticalThreshold = (int) ceil($lowStockLimit / 2);

        return Benefit::where('status', 'Ativo')
            ->where('stock', '<=', $lowStockLimit)
            ->orderBy('stock')
            ->get()
            ->map(fn ($benefit) => [
                'label' => $benefit->name,
                'rest' => $benefit->stock,
                'alertLevel' => $benefit->stock <= $criticalThreshold ? 'critical' : 'warning',
            ])
            ->toArray();
    }

    private function topItems(Carbon $currentStart, Carbon $currentEnd): array
    {
        $items = Delivery::whereBetween('delivery_date', [$currentStart, $currentEnd])
            ->join('benefits', 'deliveries.benefit_id', '=', 'benefits.id')
            ->selectRaw('benefits.name, SUM(deliveries.quantity) as total_quantity')
            ->groupBy('benefits.name')
            ->orderByDesc('total_quantity')
            ->limit(5)
            ->get();

        $maxQuantity = $items->max('total_quantity') ?: 1;

        return $items->map(fn ($item) => [
            'name' => $item->name,
            'quantity' => (int) $item->total_quantity,
            'percentage' => (int) round(($item->total_quantity / $maxQuantity) * 100),
        ])->toArray();
    }

    private function chartData(Carbon $currentStart, Carbon $currentEnd, Carbon $previousStart, Carbon $previousEnd): array
    {
        $currentCounts = Delivery::whereBetween('delivery_date', [$currentStart, $currentEnd])
            ->join('benefits', 'deliveries.benefit_id', '=', 'benefits.id')
            ->selectRaw('benefits.category, COUNT(*) as total')
            ->groupBy('benefits.category')
            ->pluck('total', 'category');

        $previousCounts = Delivery::whereBetween('delivery_date', [$previousStart, $previousEnd])
            ->join('benefits', 'deliveries.benefit_id', '=', 'benefits.id')
            ->selectRaw('benefits.category, COUNT(*) as total')
            ->groupBy('benefits.category')
            ->pluck('total', 'category');

        return array_map(fn ($cat) => [
            'name' => $cat,
            'anterior' => (int) ($previousCounts[$cat] ?? 0),
            'atual' => (int) ($currentCounts[$cat] ?? 0),
        ], self::CHART_CATEGORIES);
    }

    private function availablePeriods(): array
    {
        $dates = Delivery::query()
            ->select('delivery_date')
            ->distinct()
            ->orderByDesc('delivery_date')
            ->pluck('delivery_date')
            ->map(fn ($date) => [
                'year' => (int) Carbon::parse($date)->year,
                'month' => (int) Carbon::parse($date)->month,
            ])
            ->unique(fn (array $period) => "{$period['year']}-{$period['month']}")
            ->values()
            ->toArray();

        $currentMonth = [
            'year' => (int) now()->year,
            'month' => (int) now()->month,
        ];

        if (! in_array($currentMonth, $dates, true)) {
            array_unshift($dates, $currentMonth);
        }

        return $dates;
    }
}
