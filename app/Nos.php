<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nos extends Model
{
    protected $fillable = [
        'title', 'level', 'power', 'part_id','image_url'
    ];

    public function AddNos($request){
        $input = [
            'title' => $request['title'],
            'level' => $request['level'],
            'power' => $request['power'],
            'part_id' => $request['part_id'],
            'image_url' => $request['image_url']
        ];

        return Nos::create($input);
    }
}
