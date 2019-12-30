<?php
namespace App\Repositories;
use App\Club;
use App\ClubTournament_Club;
use App\User;
use App\Garage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ClubRepository implements ClubRepositoryInterface
{
    private $user;
    private $club;
    private $clubTournament;
    private $successStatus = 200;
    public function __construct()
    {
        $this->user = new User();
        $this->club = new Club();
        $this->clubTournament = new ClubTournament_Club();
    }

    public function AddClub(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'title' => 'required',
                'owner_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        return response()->json($this->club->AddClub($request), $this->successStatus);

    }

    public function AddUserToClub(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'club_id' => 'required',
                'user_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        return response()->json($this->club->AddUserToClub($request), $this->successStatus);
    }

    public function LeaveClub(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        return response()->json($this->club->LeaveClub($request), $this->successStatus);
    }

    public function DestroyClub(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'club_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        return response()->json($this->club->DestroyClub($request), $this->successStatus);
    }

    public function RegisterToTournament(Request $request){
        $validator = Validator::make($request->all(),
            [
                'club_id' => 'required',
                'user_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        return response()->json($this->clubTournament->RegisterToTournament($request),$this->successStatus);
    }
}