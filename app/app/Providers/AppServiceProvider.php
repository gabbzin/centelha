<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\CommunityCenter;
use App\Services\StorageService;
use Illuminate\Database\Eloquent\Model;
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
        $this->app->singleton(DeliveryOrchestrator::class);
        $this->app->singleton(FamilyRegistration::class);
        $this->app->singleton(DashboardDataProvider::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::preventSilentlyDiscardingAttributes();

        View::composer('app', function ($view) {
            $view->with('communityCenter', CommunityCenter::first());
        });
    }
}
