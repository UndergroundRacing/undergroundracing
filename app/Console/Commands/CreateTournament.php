<?php

namespace App\Console\Commands;
use App\Tournament_User;
use App\Tournament;
use Illuminate\Console\Command;

class CreateTournament extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:createtournament';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $tournament = new Tournament();
        $tournament->CreateTournament();
        echo $tournament;
    }
}
