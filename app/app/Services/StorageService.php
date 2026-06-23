<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class StorageService
{
    public function upload(string $disk, string $directory, UploadedFile $file): string
    {
        return $file->store($directory, $disk);
    }

    public function url(string $disk, ?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        return Storage::disk($disk)->url($path);
    }

    public function delete(string $disk, ?string $path): void
    {
        if ($path) {
            Storage::disk($disk)->delete($path);
        }
    }

    public function replace(string $disk, string $directory, UploadedFile $file, ?string $oldPath = null): string
    {
        $this->delete($disk, $oldPath);

        return $this->upload($disk, $directory, $file);
    }
}
