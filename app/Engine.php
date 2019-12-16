<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Engine extends Model
{
    protected $fillable = [
        'title', 'level', 'weight', 'power', 'capacity', 'part_id','image_url'
    ];

    public function AddEngine($request)
    {
        $input = [
            'title' => $request['title'],
            'level' => $request['level'],
            'weight' => $request['weight'],
            'power' => $request['power'],
            'capacity' => $request['capacity'],
            'part_id' => $request['part_id'],
            'image_url' => $request['image_url']
        ];

        return Engine::create($input);
    }

}
