<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    protected $fillable = [
        'winners'
    ];

    public function CreateTournament(){
        $tournament = Tournament::create([
            'winners' => serialize(['winners' => null])
        ]);
        return $tournament;
    }

    public function GetTodayTournament(){
        return Tournament::whereDate('created_at', date('Y-m-d'))->get()->first();
    }

    public function UpdateWinnersAfterTournament($winners){
        $tournament = $this->GetTodayTournament();
        $tournament->update(['winners' => serialize($winners)]);
        return $tournament;
    }
}
