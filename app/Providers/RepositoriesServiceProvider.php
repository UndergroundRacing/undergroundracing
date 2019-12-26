<?php

namespace App\Providers;

use App\Repositories\AuthRepository;
use App\Repositories\AuthRepositoryInterface;
use App\Repositories\GarageRepository;
use App\Repositories\GarageRepositoryInterface;
use App\Repositories\MarketRepository;
use App\Repositories\MarketRepositoryInterface;
use App\Repositories\ClubRepositoryInterface;
use App\Repositories\MessagesRepository;
use App\Repositories\MessagesRepositoryInterface;
use App\Repositories\UserRepository;
use App\Repositories\ClubRepository;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoriesServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(AuthRepositoryInterface::class,AuthRepository::class);
        $this->app->bind(GarageRepositoryInterface::class,GarageRepository::class);
        $this->app->bind(UserRepositoryInterface::class,UserRepository::class);
        $this->app->bind(MarketRepositoryInterface::class,MarketRepository::class);
        $this->app->bind(ClubRepositoryInterface::class,ClubRepository::class);
        $this->app->bind(MessagesRepositoryInterface::class, MessagesRepository::class);
    }
}
