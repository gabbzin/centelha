# Dashboard Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a `DashboardController` that returns mocked dashboard data via Inertia, and update the route to use it.

**Architecture:** Single controller with an `index()` method returning structured mock data via `Inertia::render()`. Follows the existing pattern of `FamilyController@index`. The frontend will receive the data as props instead of using hardcoded values.

**Tech Stack:** Laravel 12, Inertia.js v2, PHP 8.2+

---

### Task 1: Create DashboardController

**Files:**
- Create: `app/app/Http/Controllers/DashboardController.php`

- [ ] **Step 1: Create the controller**

```php
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
```

- [ ] **Step 2: Verify file was created**

Run: `ls -la app/app/Http/Controllers/DashboardController.php`
Expected: File exists and contains the class above.

---

### Task 2: Update Route

**Files:**
- Modify: `app/routes/web.php:36-38`

- [ ] **Step 1: Replace the dashboard closure with controller reference**

Add the import at the top of `web.php` (after the existing imports):

```php
use App\Http\Controllers\DashboardController;
```

Then replace lines 36-38:

```php
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
```

- [ ] **Step 2: Verify the route**

Run: `php artisan route:list --name=dashboard`
Expected: Shows `GET|HEAD  dashboard ................................................ dashboard ................. App\Http\Controllers\DashboardController`

---

### Task 3: Adapt Frontend — Create Props Interface and Wire Up Data

**Files:**
- Modify: `app/resources/js/pages/dashboard.tsx`

This task shows the user exactly what to change in the frontend. The backend is done; now explain the frontend adaptation.

- [ ] **Step 1: Add DashboardProps import type and receive props**

The data sent by the controller arrives as component props via Inertia.

Replace the current component signature and add a typed interface:

```tsx
interface StatsCardData {
  value: number;
  percentageChange: number;
}

interface AlertInfo {
  label: string;
  rest: number;
  alertLevel: 'warning' | 'critical';
}

interface TopItem {
  name: string;
  quantity: number;
  percentage: number;
}

interface ChartDataItem {
  name: string;
  anterior: number;
  atual: number;
}

interface DashboardProps {
  statsCards: {
    benefitsDelivered: StatsCardData;
    familiesServed: StatsCardData;
    newRegistrations: StatsCardData;
  };
  alerts: AlertInfo[];
  topItems: TopItem[];
  chartData: ChartDataItem[];
}

export default function Dashboard({
  statsCards,
  alerts,
  topItems,
  chartData,
}: DashboardProps) {
  // ...
}
```

- [ ] **Step 2: Wire StatsCards with backend data**

Replace the hardcoded values on lines 67-84:

```tsx
<StatsCard
  icon={<HandWithHeartIcon />}
  percentageChange={statsCards.benefitsDelivered.percentageChange}
  title="Benefícios Entregues"
  value={statsCards.benefitsDelivered.value}
/>
<StatsCard
  icon={<FamilyIcon />}
  percentageChange={statsCards.familiesServed.percentageChange}
  title="Familias Atendidas"
  value={statsCards.familiesServed.value}
/>
<StatsCard
  icon={<UserAddIcon />}
  percentageChange={statsCards.newRegistrations.percentageChange}
  title="Novos Cadastros"
  value={statsCards.newRegistrations.value}
/>
```

- [ ] **Step 3: Wire AlertCard with backend data**

Replace lines 99-112:

```tsx
<AlertCard infos={alerts} />
```

- [ ] **Step 4: Wire TopItensCard with backend data**

Replace lines 113-126:

```tsx
<TopItensCard itens={topItems} />
```

- [ ] **Step 5: Wire SimpleBarChart with backend data**

Replace line 148 and remove the hardcoded `data` constant at the bottom (lines 156-172):

```tsx
<SimpleBarChart data={chartData} />
```

Remove the `const data = [...]` block at the end of the file.

---

### Task 4: Update Dashboard Test (if exists)

**Files:**
- Check: `tests/Feature/DashboardTest.php`

- [ ] **Step 1: Check if test file exists**

Run: `ls -la tests/Feature/DashboardTest.php 2>/dev/null || echo "No test file"`

If the file exists, update it to verify the new props are being passed. If not, optionally create a basic test.

---

## Summary

After these tasks:
1. **Backend** has a `DashboardController` returning structured mock data
2. **Route** uses the controller instead of a bare closure
3. **Frontend** receives data via Inertia props and passes it to child components
4. When the other developer creates the real database tables, only the controller's `index()` method needs to be updated — the frontend stays the same
