<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\CommunityCenter;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $center = Cache::remember('community_center', 300, fn () => CommunityCenter::with('socialLinks')->first());

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'communityCenter' => $center,
            'pageSettings' => $this->resolvePageSettings($request, $center),

            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'msg' => $request->session()->get('msg'),
                'msgType' => $request->session()->get('msgType'),
            ],
        ];
    }

    private function resolvePageKey(Request $request): ?string
    {
        $route = $request->route();
        if (! $route) {
            return null;
        }

        $name = $route->getName();

        return match ($name) {
            'dashboard' => 'dashboard',
            'home' => 'home',
            'login' => 'login',
            'family' => 'familia',
            'family.register' => 'familia',
            'family.edit' => 'familia',
            'beneficios' => 'beneficios',
            default => null,
        };
    }

    private function resolvePageSettings(Request $request, ?CommunityCenter $center): ?array
    {
        $pageKey = $this->resolvePageKey($request);

        if (! $pageKey) {
            return null;
        }

        $path = config_path("pages/{$pageKey}.php");

        if (! file_exists($path)) {
            return null;
        }

        $defaults = require $path;
        $saved = $center?->settings[$pageKey] ?? [];

        return array_replace_recursive($defaults, $saved);
    }
}
