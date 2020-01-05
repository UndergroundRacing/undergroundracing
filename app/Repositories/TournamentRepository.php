<?php

namespace App\Repositories;

use App\Garage_Vechile;
use App\Race;
use App\User;
use App\Garage;
use App\Tournament;
use App\Tournament_User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class TournamentRepository implements TournamentRepositoryInterface
{

    private $user;
    private $tournament;
    private $tournamentUser;
    private $successStatus = 200;
    public function __construct()
    {
        $this->user = new User();
        $this->tournament = new Tournament();
        $this->tournamentUser = new Tournament_User();
    }

    public function RegisterToTournament(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        return response()->json($this->tournamentUser->RegisterToTournament($request),$this->successStatus);

    }

    public function CheckIfUserIsRegistered($user_id){
        return response()->json(['success' => $this->tournamentUser->CheckIfUserIsRegisteredToTournament($user_id)],$this->successStatus);
    }
}