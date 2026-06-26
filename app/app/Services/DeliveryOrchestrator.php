<?php

declare(strict_types=1);

namespace App\Services;

use App\Dto\DeliveryData;
use App\Dto\DeliveryResult;
use App\Models\Benefit;
use App\Models\CommunityCenter;
use App\Models\Delivery;
use App\Models\Family;
use App\Models\StockMovement;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

final class DeliveryOrchestrator
{
    public const CACHE_VERSION_KEY = 'deliveries.cache_version';

    private const RECEIPT_DISK = 'minio';

    private const RECEIPT_DIRECTORY = 'deliveries/receipts';

    private const COOLDOWN_DAYS = 7;

    public function __construct(private readonly StorageService $storage) {}

    public function execute(DeliveryData $data): DeliveryResult
    {
        $receiptPath = null;
        if ($data->receipt) {
            $receiptPath = $this->storage->upload(self::RECEIPT_DISK, self::RECEIPT_DIRECTORY, $data->receipt);
        }

        try {
            $delivery = DB::transaction(function () use ($data, $receiptPath): Delivery {
                // Lock em ordem lexicográfica (Family → Benefit) para que
                // entregas concorrentes não entrem em deadlock entre si.
                $family = Family::lockForUpdate()->findOrFail($data->familyId);
                $benefit = Benefit::lockForUpdate()->findOrFail($data->benefitId);

                // A checagem de cooldown roda dentro da transação sob os locks,
                // fechando a janela de TOCTOU onde duas submissões concorrentes
                // para a mesma família+benefício poderiam passar ambas.
                $this->ensureNoDuplicateDelivery($family->id, $benefit->id, $data->deliveryDate);

                if ($benefit->stock < $data->quantity) {
                    throw ValidationException::withMessages([
                        'quantity' => 'Estoque insuficiente para este benefício.',
                    ]);
                }

                $delivery = Delivery::create([
                    'family_id' => $data->familyId,
                    'benefit_id' => $data->benefitId,
                    'quantity' => $data->quantity,
                    'location' => $data->location,
                    'delivery_date' => $data->deliveryDate,
                    'notes' => $data->notes,
                    'receipt_path' => $receiptPath,
                    'delivered_by' => $data->deliveredBy,
                    'status' => 'Entregue',
                ]);

                $delivery->update(['code' => $delivery->generateCode()]);

                $benefit->decrement('stock', $data->quantity);

                StockMovement::create([
                    'benefit_id' => $benefit->id,
                    'quantity' => -$data->quantity,
                    'type' => 'delivery',
                    'reference_type' => Delivery::class,
                    'reference_id' => $delivery->id,
                    'created_by' => $data->deliveredBy,
                    'reason' => "Entrega {$delivery->code} - {$delivery->quantity} unidade(s)",
                ]);

                return $delivery;
            });
        } catch (\Throwable $e) {
            if ($receiptPath) {
                $this->storage->delete(self::RECEIPT_DISK, $receiptPath);
            }

            throw $e;
        }

        $this->invalidateDeliveryCache();
        DashboardDataProvider::bumpVersion();

        return new DeliveryResult($delivery);
    }

    private function ensureNoDuplicateDelivery(int $familyId, int $benefitId, Carbon $deliveryDate): void
    {
        $cooldownDays = $this->resolveCooldownDays();

        $exists = Delivery::where('family_id', $familyId)
            ->where('benefit_id', $benefitId)
            ->whereBetween('delivery_date', [
                $deliveryDate->copy()->subDays($cooldownDays)->startOfDay(),
                $deliveryDate->copy()->addDays($cooldownDays)->endOfDay(),
            ])
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'benefit_id' => 'Esta família já recebeu este benefício no período vigente.',
            ]);
        }
    }

    private function resolveCooldownDays(): int
    {
        return CommunityCenter::instance()->delivery_cooldown_days
            ?? (int) config('centelha.delivery.cooldown_days', self::COOLDOWN_DAYS);
    }

    private function invalidateDeliveryCache(): void
    {
        Cache::increment(self::CACHE_VERSION_KEY);
    }
}
