<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tournament_User extends Model
{
    protected $fillable = [
      'user_id','tournament_id','time'
    ];
    private $tournament;
    private $races;
    private $user;
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->tournament = new Tournament();
        $this->races = new Race();
        $this->user = new User();
    }

    public function RegisterToTournament($request){
        if($this->user->CheckIfUserHasEnoughMoney($request['user_id'],20000)){
            if($this->CheckIfUserIsRegistered($request['user_id'])){
                $tournament = $this->tournament->GetTodayTournament();
                $time = $this->races->CalculateUserTimesWrapper($request['user_id']);
                $input = [
                    'user_id' => $request['user_id'],
                    'tournament_id' => $tournament['id'],
                    'time' => $time
                ];
                return ['success' => Tournament_User::create($input)];
            }
           else return ['error' => 'You already registered in this tournament!'];

        }
        return ['error' => 'User has not enough money'];
    }

    public function CalculateTournamentWinners(){
        $tournament = $this->tournament->GetTodayTournament();
        $tournamentUsers = Tournament_User::where('tournament_id',$tournament['id'])->get()->sortBy('time');
        if(count($tournamentUsers) > 0){
            $winners =  $this->GiveUsersRewards($tournamentUsers);
            return $this->tournament->UpdateWinnersAfterTournament($winners);
        }
    }

    private function GiveUsersRewards($tournamentUsers){
        $i = 0;
        $winners = [];
        foreach($tournamentUsers as $user){
            if($i === 0){
                $this->AddRewards($user['user_id'],60000,1200);
                $winners[0] = $user['user_id'];
                $i++;
            }
            else if($i === 1) {
                $this->AddRewards($user['user_id'],30000,600);
                $winners[1] = $user['user_id'];
                $i++;
            }
            else if($i === 2){
                $this->AddRewards($user['user_id'],15000,300);
                $winners[2] = $user['user_id'];
                $i++;
            }
            else{
                $this->AddRewards($user['id'],4000,100);
                $i++;
            }
        }
        return $winners;
    }

    private function AddRewards($user_id,$cash,$cups){
        $user = $this->user->GetUser($user_id);
        if($user != null){
            $user->cash += $cash;
            $user->cups += $cups;
            $user->save();
        }
    }

    private function CheckIfUserIsRegistered($user_id){

        $tournament = $this->tournament->GetTodayTournament();
        $tournamentUsers = Tournament_User::where('user_id',$user_id)->where('tournament_id',$tournament['id'])->get();
        if(count($tournamentUsers) > 0) {
            return false;
        }
        return true;
    }

}
