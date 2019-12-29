<?php

namespace App\Console\Commands;

use App\Tournament_User;
use Illuminate\Console\Command;

class GiveTournamentRewards extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:giveTournamentRewards';

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
        $tournamentUser =new Tournament_User();
        echo $tournamentUser->CalculateTournamentWinners();

    }
}
