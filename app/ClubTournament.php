<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClubTournament extends Model
{
    protected $fillable = [
        'winner'
    ];

    public function CreateTournament(){
        $tournament = ClubTournament::create([
            'winner' => serialize(['winner' => null])
        ]);
        return $tournament;
    }

    public function GetTodayTournament(){
        return ClubTournament::whereDate('created_at', date('Y-m-d'))->get()->first();
    }

    public function UpdateWinnersAfterTournament($winners){
        $tournament = $this->GetTodayTournament();
        $tournament->update(['winner' => $winners['club_id']]);
        return $tournament;
    }
}
