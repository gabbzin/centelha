<?php

namespace App\Providers;

use App\Models\CommunityCenter;
use App\Services\StorageService;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(StorageService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('app', function ($view) {
            $view->with('communityCenter', CommunityCenter::first());
        });
    }
}
