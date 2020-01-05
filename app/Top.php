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
        $users = User::all()->sortByDesc('experience')->take(10);
        $clubs = Club::all()->sortByDesc('points')->take(10);
        return [
            'users' => $users,
            'clubs' => $clubs
        ];
    }
}
