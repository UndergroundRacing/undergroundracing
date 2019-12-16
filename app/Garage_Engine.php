<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Garage_Engine extends Model
{
    protected $fillable = [
        'garage_id', 'engine_id'
    ];

    public function AddEngineToGarage($request)
    {
        $input = [
            'garage_id' => $request['garage_id'],
            'engine_id' => $request['engine_id']
        ];

        $garage_engine = Garage_Engine::create($input);

        return $garage_engine;
    }

    public function GetEngineSpecsById($id){
        $engine = Garage_Engine::find($id);
        $new_nos = Engine::find($engine->engine_id);
        return $new_nos;
    }
}
