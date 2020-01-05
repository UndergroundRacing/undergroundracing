<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Club_Invitations extends Model
{
    protected $fillable = [
        'user_id', 'club_id'
    ];

    public function Invite($request){
        $input = [
          'user_id' => $request['user_id'],
          'club_id' => $request['club_id']
        ];

        return Club_Invitations::create($input);
    }

    public function GetUserInvitations($user_id){
        $clubs = Club_Invitations::where('user_id',$user_id)->get();
        $i = 0;
        $club_ob = new Club();
        $ret = [];
        foreach($clubs as $club){
            $club_obj = $club_ob->GetClub($club["id"]);
            $ret[$i] = [
                'club_id' => $club_obj->id,
                'club_name' => $club_obj->title
            ];
            $i++;
        }
        return $ret;
    }

}
