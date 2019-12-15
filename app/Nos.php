<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nos extends Model
{
    protected $fillable = [
        'title', 'level', 'ac_time', 'part_id'
    ];

    public function AddNos($request){
        $input = [
            'title' => $request['title'],
            'level' => $request['level'],
            'ac_time' => $request['ac_time'],
            'part_id' => $request['part_id']
        ];

        return Nos::create($input);
    }
}
