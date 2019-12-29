<?php

namespace App\Http\Controllers\Api;

use App\Repositories\MarketRepositoryInterface;
use App\Repositories\RacesRepositoryInterface;
use App\Repositories\TournamentRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;

class TournamentController extends Controller
{
    private $tournamentRepository;

    public function __construct(TournamentRepositoryInterface $tournamentRepository){
        $this->tournamentRepository = $tournamentRepository;
    }

    public function RegisterToTournament(Request $request){
       return $this->tournamentRepository->RegisterToTournament($request);
    }
}