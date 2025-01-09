<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        // Register broadcast routes
        Broadcast::routes();

        // Define the broadcast channel for all users (doctors)
        Broadcast::channel('doctors', function () {
            return true; // All logged-in users can listen to this channel
        });
    }
}
