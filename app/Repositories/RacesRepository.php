<?php

namespace App\Repositories;

use App\Garage_Vechile;
use App\Race;
use App\User;
use App\Garage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class RacesRepository implements RacesRepositoryInterface
{
    private $successStatus = 200;
    private $races;

    public function __construct()
    {
        $this->races = new Race();
    }

    public function DoRaceAction(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'first_racer' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        return response()->json(['success' => $this->races->CreateRace($request)],$this->successStatus);
    }

    public function SearchOponent($id)
    {
        return response()->json(['success' => $this->races->SearchOponent($id)],$this->successStatus);
    }

    public function GetLastRace($user_id)
    {
        return response()->json(['success' => $this->races->GetLastRace($user_id)],$this->successStatus);
    }
}