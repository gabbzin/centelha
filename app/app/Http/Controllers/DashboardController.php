<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Benefit;
use App\Models\Delivery;
use App\Models\Family;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $selectedMonth = (int) $request->input('month', now()->month);
        $selectedYear = (int) $request->input('year', now()->year);

        $currentStart = Carbon::create($selectedYear, $selectedMonth, 1)->startOfDay();
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

        $chartData = $this->getChartData($currentStart, $currentEnd, $previousStart, $previousEnd);
        $topItems = $this->getTopItems($currentStart, $currentEnd);

        $communityCenter = \App\Models\CommunityCenter::first();
        $lowStockLimit = $communityCenter?->settings['rules']['low_stock_limit'] ?? 50;

        $alerts = $this->getStockAlerts($lowStockLimit);

        $availablePeriods = $this->getAvailablePeriods();

        return Inertia::render('dashboard', [
            'statsCards' => [
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
            'alerts' => $alerts,
            'topItems' => $topItems,
            'chartData' => $chartData,
            'availablePeriods' => $availablePeriods,
            'selectedMonth' => $selectedMonth,
            'selectedYear' => $selectedYear,
        ]);
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

    private function getChartData(Carbon $currentStart, Carbon $currentEnd, Carbon $previousStart, Carbon $previousEnd): array
    {
        $categories = ['Alimentação', 'Financeiro', 'Saúde', 'Vestuário', 'Educação'];

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
        ], $categories);
    }

    private function getTopItems(Carbon $currentStart, Carbon $currentEnd): array
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

    private function getStockAlerts(int $lowStockLimit): array
    {
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

    private function getAvailablePeriods(): array
    {
        $dates = Delivery::query()
            ->select('delivery_date')
            ->distinct()
            ->orderByDesc('delivery_date')
            ->pluck('delivery_date')
            ->map(fn ($date) => ['year' => (int) Carbon::parse($date)->year, 'month' => (int) Carbon::parse($date)->month])
            ->unique(fn (array $period) => "{$period['year']}-{$period['month']}")
            ->values()
            ->toArray();

        $currentMonth = ['year' => (int) now()->year, 'month' => (int) now()->month];

        if (! in_array($currentMonth, $dates)) {
            array_unshift($dates, $currentMonth);
        }

        return $dates;
    }
}
