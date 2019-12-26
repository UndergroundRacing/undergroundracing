<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Garage_Stop extends Model
{
    protected $fillable = [
        'garage_id', 'stops_id','in_use'
    ];

    public function AddStopToGarage($request)
    {
        $input = [
            'in_use' => 0,
            'garage_id' => $request['garage_id'],
            'stops_id' => $request['stops_id']
        ];

        $garage_stop = Garage_Stop::create($input);

        return $garage_stop;
    }

    public function GetStopsSpecsById($id){
        $stops = Garage_Stop::find($id);
        $new_stops = Stop::find($stops->stops_id);
        return $new_stops;
    }

    public function ChangeStopStatus($id,$status){
        $stops = Garage_Stop::find($id);
        $stops->in_use = $status;
        $stops->save();
        return $stops;
    }
}
