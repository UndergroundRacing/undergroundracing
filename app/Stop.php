<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stop extends Model
{
    protected $fillable = [
        'title', 'level', 'stop_time', 'part_id','image_url'
    ];

    public function AddStop($request)
    {
        $input = [
            'title' => $request['title'],
            'level' => $request['level'],
            'stop_time' => $request['stop_time'],
            'part_id' => $request['part_id'],
            'image_url' => $request['image_url']
        ];

        return Stop::create($input);
    }
}
