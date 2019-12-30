<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Engine extends Model
{
    protected $fillable = [
        'title', 'level', 'weight', 'power', 'capacity', 'part_id','image_url','is_default','price'
    ];

    public function AddEngine($request)
    {
        $input = [
            'title' => $request['title'],
            'level' => $request['level'],
            'weight' => $request['weight'],
            'power' => $request['power'],
            'capacity' => $request['capacity'],
            'price' => $request['price'],
            'part_id' => $request['part_id'],
            'is_default' => $request['is_default'],
            'image_url' => $request['image_url']
        ];

        return Engine::create($input);
    }

    public function GetDefaultEngine(){
        $eng = Engine::where('is_default',1)->get()->first();
        return $eng->id;
    }

}
