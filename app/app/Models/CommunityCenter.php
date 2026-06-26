<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\StorageService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CommunityCenter extends Model
{
    use HasFactory;

    public const DEFAULT_LOGO_PATH = 'logo.svg';

    public const DEFAULT_FAVICON_PATH = 'logo.png';

    private const ASSET_DISK = 'minio';

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
        'delivery_cooldown_days',
        'singleton',
    ];

    protected $appends = ['logo_url', 'favicon_url', 'has_custom_logo', 'has_custom_favicon'];

    protected function casts(): array
    {
        return [
            'settings' => 'array',
            'colors' => 'array',
            'maintenance_mode' => 'boolean',
            'delivery_cooldown_days' => 'integer',
            'singleton' => 'boolean',
        ];
    }

    public static function instance(): self
    {
        return self::firstOrCreate(
            ['singleton' => true],
            [
                'name' => 'Centelha',
                'location' => '',
                'logo_path' => self::DEFAULT_LOGO_PATH,
                'favicon_path' => self::DEFAULT_FAVICON_PATH,
                'fontFamily' => 'Inter',
                'settings' => [],
                'colors' => [
                    'primary' => '#1558D6',
                    'background' => '#FFFFFF',
                    'surface' => '#F8F9FA',
                    'text_primary' => '#191C1E',
                    'text_secondary' => '#959598',
                    'text_disabled' => '#C5C6C7',
                    'hover' => '#EFF6FF',
                    'active' => '#1A5090',
                    'success' => '#4ADE80',
                    'error' => '#EF4444',
                    'warning' => '#F59E0B',
                    'info' => '#3B82F6',
                    'button' => '#094785',
                ],
            ],
        );
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

    public function getHasCustomLogoAttribute(): bool
    {
        return $this->logo_path !== null && ! $this->isStaticAssetPath($this->logo_path);
    }

    public function getHasCustomFaviconAttribute(): bool
    {
        return $this->favicon_path !== null && ! $this->isStaticAssetPath($this->favicon_path);
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

        if (Storage::disk(self::ASSET_DISK)->exists($path)) {
            return app(StorageService::class)->url(self::ASSET_DISK, $path);
        }

        return asset($default);
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

        if (Storage::disk(self::ASSET_DISK)->exists($path)) {
            return Storage::disk(self::ASSET_DISK)->url($path);
        }

        return null;
    }

    private function isStaticAssetPath(string $path): bool
    {
        return str_starts_with($path, './') || ! str_contains($path, '/');
    }
}
