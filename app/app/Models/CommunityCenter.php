<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\StorageService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CommunityCenter extends Model
{
    public const DEFAULT_LOGO_PATH = 'logo.svg';

    public const DEFAULT_FAVICON_PATH = 'logo.png';

    protected $table = 'community_center';

    protected $fillable = [
        'name',
        'location',
        'slogan',
        'rodape_text',
        'logo_path',
        'favicon_path',
        'fontFamily',
        'settings',
        'colors',
        'maintenance_mode',
    ];

    protected $appends = ['logo_url', 'favicon_url'];

    protected function casts(): array
    {
        return [
            'settings' => 'array',
            'colors' => 'array',
            'maintenance_mode' => 'boolean',
        ];
    }

    public function socialLinks()
    {
        return $this->hasMany(SocialLink::class);
    }

    public function getLogoUrlAttribute(): string
    {
        return $this->resolveAssetUrl($this->logo_path, self::DEFAULT_LOGO_PATH);
    }

    public function getFaviconUrlAttribute(): string
    {
        return $this->resolveAssetUrl($this->favicon_path, self::DEFAULT_FAVICON_PATH);
    }

    public function logoFilePath(): ?string
    {
        return $this->resolveAssetFilePath($this->logo_path);
    }

    public function faviconFilePath(): ?string
    {
        return $this->resolveAssetFilePath($this->favicon_path);
    }

    private function resolveAssetUrl(?string $path, string $default): string
    {
        if (! $path) {
            return asset($default);
        }

        if ($this->isStaticAssetPath($path)) {
            return asset(ltrim($path, './'));
        }

        $url = app(StorageService::class)->url('public', $path);

        return $url ?? asset($default);
    }

    private function resolveAssetFilePath(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if ($this->isStaticAssetPath($path)) {
            $candidate = public_path(ltrim($path, './'));

            return file_exists($candidate) ? $candidate : null;
        }

        $candidate = Storage::disk('public')->path($path);

        return file_exists($candidate) ? $candidate : null;
    }

    private function isStaticAssetPath(string $path): bool
    {
        return str_starts_with($path, './') || ! str_contains($path, '/');
    }
}
