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
}
