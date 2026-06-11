<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'statsCards' => [
                'benefitsDelivered' => [
                    'value' => 1240,
                    'percentageChange' => 15,
                ],
                'familiesServed' => [
                    'value' => 850,
                    'percentageChange' => 8,
                ],
                'newRegistrations' => [
                    'value' => 230,
                    'percentageChange' => -6,
                ],
            ],
            'alerts' => [
                ['label' => 'Cestas básicas', 'rest' => 12, 'alertLevel' => 'warning'],
                ['label' => 'Gás', 'rest' => 8, 'alertLevel' => 'critical'],
                ['label' => 'Kit Higiene', 'rest' => 5, 'alertLevel' => 'critical'],
            ],
            'topItems' => [
                ['name' => 'Cestas básicas', 'quantity' => 270, 'percentage' => 75],
                ['name' => 'Gás', 'quantity' => 150, 'percentage' => 60],
                ['name' => 'Kit Higiene', 'quantity' => 90, 'percentage' => 40],
            ],
            'chartData' => [
                ['name' => 'Kit Higiene', 'anterior' => 250, 'atual' => 320],
                ['name' => 'Cestas básicas', 'anterior' => 300, 'atual' => 270],
                ['name' => 'Gás', 'anterior' => 200, 'atual' => 150],
                ['name' => 'Medicamentos', 'anterior' => 100, 'atual' => 180],
            ],
        ]);
    }
}
