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
use App\Repositories\RacesRepository;
use App\Repositories\RacesRepositoryInterface;
use App\Repositories\ReportRepository;
use App\Repositories\ReportRepositoryInterface;
use App\Repositories\TaskRepository;
use App\Repositories\TaskRepositoryInterface;
use App\Repositories\TopRepository;
use App\Repositories\TopRepositoryInterface;
use App\Repositories\TournamentRepository;
use App\Repositories\TournamentRepositoryInterface;
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
        $this->app->bind(RacesRepositoryInterface::class, RacesRepository::class);
        $this->app->bind(TournamentRepositoryInterface::class, TournamentRepository::class);
        $this->app->bind(TaskRepositoryInterface::class, TaskRepository::class);
        $this->app->bind(ReportRepositoryInterface::class, ReportRepository::class);
        $this->app->bind(TopRepositoryInterface::class, TopRepository::class);
    }
}
