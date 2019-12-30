<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClubTournament_Club extends Model
{
    protected $fillable = [
        'club_id','tournament_id','time'
    ];

    private $tournament;
    private $club;
    private $race;
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->tournament = new ClubTournament();
        $this->club = new Club();
        $this->race = new Race();
    }

    public function RegisterToTournament($request){
        $club = $this->club->GetClub($request['club_id']);
        if($club->owner_id == $request['user_id']) {
            if ($this->CheckIfClubIsRegistered($request['club_id'])) {
                $tournament = $this->tournament->GetTodayTournament();
                $input = [
                    'club_id' => $request['club_id'],
                    'tournament_id' => $tournament['id'],
                    'time' => $this->CalculateClubTime($request['club_id'])
                ];
                return ['success' => ClubTournament_Club::create($input)];
            } else return ['error' => 'You already registered in this tournament!'];
        }
        else return ['error' => 'You are not club owner!'];
    }

    public function CalculateClubTime($club_id){
        $club_members = $this->club->GetClubMembers($club_id);
        $sum = 0;
        $i = 0;
        foreach($club_members as $member){
            $sum += $this->race->CalculateUserTimesWrapper($member["id"]);
            $i++;
        }
        return $sum / $i;
    }

    public function CalculateTournamentWinners(){
        $tournament = $this->tournament->GetTodayTournament();
        $tournamentUsers = ClubTournament_Club::where('tournament_id',$tournament['id'])->get()->sortBy('time');
        if(count($tournamentUsers) > 0){
            $this->GiveClubsReward($tournamentUsers);
            return $this->tournament->UpdateWinnersAfterTournament($tournamentUsers[0]);
        }
    }

    public function GiveClubsReward($tournamentUsers){
        $i = 0;
        $winners = [];
        foreach($tournamentUsers as $club){
            $cups = 22 - $i;
            if($cups > 0)
            {
                $this->AddRewards($club['id'],$cups);
                $i++;
            }
        }
        return $winners;
    }

    public function AddRewards($club_id,$cups){
        $club = $this->club->GetClub($club_id);
        if($club != null){
            $club->points += $cups;
            $club->save();
        }
    }

    private function CheckIfClubIsRegistered($club_id){

        $tournament = $this->tournament->GetTodayTournament();
        $tournamentUsers = ClubTournament_Club::where('club_id',$club_id)->where('tournament_id',$tournament['id'])->get();
        if(count($tournamentUsers) > 0) {
            return false;
        }
        return true;
    }
}
