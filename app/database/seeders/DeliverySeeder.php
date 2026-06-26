<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Benefit;
use App\Models\Delivery;
use App\Models\Family;
use App\Models\StockMovement;
use App\Models\User;
use App\Services\DashboardDataProvider;
use App\Services\DeliveryOrchestrator;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class DeliverySeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', UserRole::Admin->value)->first()
            ?? User::factory()->create(['role' => UserRole::Admin->value, 'ativo' => true]);

        $families = Family::all();
        $benefits = Benefit::where('status', 'Ativo')
            ->where('stock', '>', 0)
            ->get()
            ->keyBy('id');

        if ($families->isEmpty() || $benefits->isEmpty()) {
            return;
        }

        $periods = [
            now()->subMonth()->startOfMonth(),
            now()->startOfMonth(),
        ];

        foreach ($periods as $startOfMonth) {
            $endOfMonth = $startOfMonth->copy()->endOfMonth();
            $deliveriesCount = rand(12, 18);

            for ($i = 0; $i < $deliveriesCount; $i++) {
                $family = $families->random();
                $benefit = $this->pickBenefit($benefits);

                if (! $benefit) {
                    continue;
                }

                $quantity = min(rand(1, 3), $benefit->stock);
                $deliveryDate = $this->randomDateInMonth($startOfMonth, $endOfMonth);

                $delivery = Delivery::create([
                    'family_id' => $family->id,
                    'benefit_id' => $benefit->id,
                    'quantity' => $quantity,
                    'location' => $family->address?->neighborhood ?? 'Centro',
                    'delivery_date' => $deliveryDate,
                    'notes' => null,
                    'delivered_by' => $admin->id,
                    'status' => 'Entregue',
                ]);

                $delivery->update(['code' => $delivery->generateCode()]);

                $benefit->decrement('stock', $quantity);

                StockMovement::create([
                    'benefit_id' => $benefit->id,
                    'quantity' => -$quantity,
                    'type' => 'delivery',
                    'reference_type' => Delivery::class,
                    'reference_id' => $delivery->id,
                    'created_by' => $admin->id,
                    'reason' => "Entrega {$delivery->code} - {$delivery->quantity} unidade(s)",
                ]);

                if ($benefit->stock <= 0) {
                    $benefits->forget($benefit->id);
                }
            }
        }

        Cache::increment(DeliveryOrchestrator::CACHE_VERSION_KEY);
        DashboardDataProvider::bumpVersion();
    }

    private function pickBenefit($benefits): ?Benefit
    {
        if ($benefits->isEmpty()) {
            return null;
        }

        return $benefits->random();
    }

    private function randomDateInMonth(Carbon $start, Carbon $end): Carbon
    {
        $timestamp = rand($start->timestamp, $end->timestamp);

        return Carbon::createFromTimestamp($timestamp)->startOfDay();
    }
}
