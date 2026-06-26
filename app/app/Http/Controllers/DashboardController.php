<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\DashboardDataProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardDataProvider $provider) {}

    public function index(Request $request): Response
    {
        $selectedMonth = (int) $request->input('month', now()->month);
        $selectedYear = (int) $request->input('year', now()->year);

        $data = $this->provider->forPeriod($selectedYear, $selectedMonth);

        return Inertia::render('dashboard', [
            'statsCards' => $data->statsCards,
            'alerts' => $data->alerts,
            'topItems' => $data->topItems,
            'chartData' => $data->chartData,
            'availablePeriods' => $data->availablePeriods,
            'selectedMonth' => $data->selectedMonth,
            'selectedYear' => $data->selectedYear,
        ]);
    }
}
