<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wheels extends Model
{
    protected $fillable = [
        'title', 'level', 'power', 'part_id','weight','image_url'
    ];

    public function AddWheels($request){
        $input = [
            'title' => $request['title'],
            'level' => $request['level'],
            'power' => $request['power'],
            'weight' => $request['weight'],
            'part_id' => $request['part_id'],
            'image_url' => $request['image_url']
        ];

        return Wheels::create($input);
    }
}
