<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Turbo extends Model
{
    protected $fillable = [
        'title', 'level', 'power', 'part_id','image_url'
    ];

    public function AddTurbo($request)
    {
        $input = [
            'title' => $request['title'],
            'level' => $request['level'],
            'power' => $request['power'],
            'part_id' => $request['part_id'],
            'image_url' => $request['image_url']
        ];

        return Turbo::create($input);
    }
}
