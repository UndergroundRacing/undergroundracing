<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    protected $fillable = [
        'title', 'points', 'cash' , 'owner_id'
    ];

    private $user;

    public function  __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $user = new User();
    }

    public function AddClub($request){
        $input = [
            'title' => $request['title'],
            'points' => 0,
            'cash' => 0,
            'owner_id' => $request['owner_id']
        ];
        $user = new User();
        $user_obj = $user->GetUser($request['owner_id']);
        if($user->CheckIfUserHasEnoughMoney($user_obj->id,10000)){
            if($user_obj->club_id === null){
                $club = Club::create($input);
                $user_obj->club_id = $club->id;
                $user_obj = $user->GetUser($request['owner_id']);
                $user_obj->club_id = $club->id;
                $user_obj->save();
                $user->MinusUserCash($request['owner_id'],10000);
                return ['success' => $club];
            }
            else{
                return ['error' => 'user has club'];
            }
        }
        else{
            return ['error' => 'user has not enough money'];
        }

    }

    public function AddUserToClub($request){
        $user = new User();
        $user_obj = $user->GetUser($request['user_id']);

        if($user_obj->club_id === null && $this->UsersInClub($request['club_id']) <= 27){
            $user_obj->club_id = $request['club_id'];
            $user_obj->save();
            return ['success' => $user_obj];
        }
        return ['error' => 'user has club,or club is full'];
    }

    public function LeaveClub($request){
        $user= new User();
        $userObj = $user->GetUser($request['user_id']);
        if($userObj->club_id != null){
            if($this->GetClubOwner($userObj->club_id) === $userObj->id){
                return ['error' => 'You have to destroy club because you are owner'];
            }
            $userObj->club_id = null;
            $userObj->save();
            return ['success' => $userObj];
        }
        return ['error' => 'user has no club'];
    }

    public function UsersInClub($club_id){
        $count = User::where(['club_id' => $club_id])->count();
        return $count;
    }

    public function GetClubMembers($club_id){
        $members = User::where(['club_id' => $club_id])->get();
        return $members;
    }

    public function GetClubOwner($club_id){
        $club = $this->GetClub($club_id);
        return $club->owner_id;
    }

    public function GetClub($club_id){
        return Club::find($club_id);
    }

    public function DestroyClub($request){
        $club = $this->GetClub($request['club_id']);
        if($club->owner_id == $request['user_id']){
            $this->UnasignClubMembers($request['club_id']);
            $this->RemoveTournaments($request['club_id']);
            Club::destroy($request['club_id']);
            return ['success' => 'club deleted'];
        }
        return ['error' => 'Only owners can delete club'];
    }

    public function UnasignClubMembers($club_id){
        $users = User::where(['club_id' => $club_id])->get();
        foreach($users as $user)
        {
            $user->update(['club_id' => null]);
        }
        return $users;
    }

    public function RemoveTournaments($club_id){
        $tournaments = ClubTournament_Club::where('club_id',$club_id)->get();

        foreach($tournaments as $tournament){
            ClubTournament_Club::destroy($tournament->id);
        }
    }

    public function GetClubByUserId($user_id){
        $registered = 0;
        $user = new User();
        $user_obj = $user->GetUser($user_id);
        $club = Club::find($user_obj->club_id);
        $usersInClub = $this->GetClubMembers($user_obj->club_id);
        $usersCount = $this->UsersInClub($user_obj->club_id);
        $tournament = new ClubTournament_Club();
        if($tournament->CheckIfClubIsRegistered($user_obj->club_id)){
            $registered = 1;
        }
        $ret = [
            "club" => $club,
            "users" => $usersInClub,
            "usersCount" => $usersCount,
            "isRegisteredToTournament" => $registered
        ];
        return $ret;
    }
}
