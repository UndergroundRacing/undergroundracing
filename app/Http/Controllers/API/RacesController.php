<?php

namespace App\Http\Controllers\Api;

use App\Repositories\MarketRepositoryInterface;
use App\Repositories\RacesRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;

class RacesController extends Controller
{
    private $raceRepository;

    public function __construct(RacesRepositoryInterface $raceRepository)
    {
        $this->raceRepository = $raceRepository;
    }

    public function DoRaceAction(Request $request){
        return $this->raceRepository->DoRaceAction($request);
    }

    public function SearchOpponent($id){
        return $this->raceRepository->SearchOponent($id);
    }
}