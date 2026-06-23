<?php

namespace App\Console\Commands;

use App\Models\Benefit;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class MigrateBenefitImages extends Command
{
    protected $signature = 'centelha:migrate-benefit-images';

    protected $description = 'Migra imagens de benefícios do disco public local para o MinIO';

    public function handle(): int
    {
        $publicDisk = Storage::disk('public');
        $minioDisk = Storage::disk('minio');

        $benefits = Benefit::whereNotNull('image_path')->get();

        if ($benefits->isEmpty()) {
            $this->info('Nenhum benefício com imagem encontrada.');

            return self::SUCCESS;
        }

        $migrated = 0;
        $skipped = 0;

        foreach ($benefits as $benefit) {
            $oldPath = $benefit->image_path;

            if (! $publicDisk->exists($oldPath)) {
                $this->warn("Benefício #{$benefit->id}: arquivo não encontrado no disco public ({$oldPath}). Pulando.");
                $skipped++;

                continue;
            }

            $newPath = 'benefits/images/'.basename($oldPath);

            if ($minioDisk->exists($newPath)) {
                $this->warn("Benefício #{$benefit->id}: destino já existe no MinIO ({$newPath}). Pulando.");
                $skipped++;

                continue;
            }

            $minioDisk->put($newPath, $publicDisk->get($oldPath));

            $benefit->update(['image_path' => $newPath]);

            $publicDisk->delete($oldPath);

            $migrated++;
        }

        $this->info("{$migrated} imagem(ns) migrada(s) com sucesso.");
        $this->info("{$skipped} imagem(ns) pulada(s).");

        return self::SUCCESS;
    }
}
