<?php

namespace App\Console\Commands;

use App\Models\Delivery;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class MigrateDeliveryReceipts extends Command
{
    protected $signature = 'centelha:migrate-delivery-receipts';

    protected $description = 'Migra comprovantes de entregas do disco public local para o MinIO (paths identicos, sem atualizar DB)';

    public function handle(): int
    {
        $publicDisk = Storage::disk('public');
        $minioDisk = Storage::disk('minio');

        $deliveries = Delivery::whereNotNull('receipt_path')->get();

        if ($deliveries->isEmpty()) {
            $this->info('Nenhuma entrega com comprovante encontrada.');

            return self::SUCCESS;
        }

        $migrated = 0;
        $skipped = 0;

        foreach ($deliveries as $delivery) {
            $path = $delivery->receipt_path;

            if ($minioDisk->exists($path)) {
                $this->warn("Entrega #{$delivery->id}: comprovante já existe no MinIO ({$path}). Pulando.");
                $skipped++;

                continue;
            }

            if (! $publicDisk->exists($path)) {
                $this->warn("Entrega #{$delivery->id}: arquivo não encontrado no disco public ({$path}). Pulando.");
                $skipped++;

                continue;
            }

            $minioDisk->put($path, $publicDisk->get($path));

            $publicDisk->delete($path);

            $migrated++;
        }

        $this->info("{$migrated} comprovante(s) migrado(s) com sucesso.");
        $this->info("{$skipped} comprovante(s) pulado(s).");

        return self::SUCCESS;
    }
}
