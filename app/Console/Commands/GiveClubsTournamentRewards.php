<?php

namespace App\Console\Commands;

use App\ClubTournament_Club;
use Illuminate\Console\Command;

class GiveClubsTournamentRewards extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:calculatetournamentresults';

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
        $club_tournament = new ClubTournament_Club();
        echo $club_tournament->CalculateTournamentWinners();

    }
}
