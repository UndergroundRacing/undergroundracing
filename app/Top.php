<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Top extends Model
{
    private $user;
    private $clubs;
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->user = new User();
        $this->clubs = new Club();
    }

    public function GetTops(){
        $users = User::all()->sortByDesc('experience');
        $clubs = Club::all()->sortByDesc('points')->take(10);
        $return_data = [];
        $i = 0;
        foreach($users as $user){
            $return_data["users"]{$i} = $user;
            $i++;
        }
        $i=0;
        foreach($clubs as $club){
            $return_data["clubs"]{$i} = $club;
            $i++;
        }
        return $return_data;
    }
}
