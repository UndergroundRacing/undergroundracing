<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Garage_Stop extends Model
{
    protected $fillable = [
        'garage_id', 'stops_id'
    ];

    public function AddStopToGarage($request)
    {
        $input = [
            'garage_id' => $request['garage_id'],
            'stops_id' => $request['stops_id']
        ];

        $garage_stop = Garage_Stop::create($input);

        return $garage_stop;
    }
}
