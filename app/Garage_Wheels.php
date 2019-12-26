<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Garage_Wheels extends Model
{
    protected $fillable = [
        'garage_id', 'wheels_id','in_use'
    ];


    public function AddWheelsToGarage($request)
    {
        $input = [
            'in_use' => 0,
            'garage_id' => $request['garage_id'],
            'wheels_id' => $request['wheels_id']
        ];

        $garage_turbo = Garage_Wheels::create($input);

        return $garage_turbo;
    }

    public function GetWheelsSpecsById($id){
        $wheels = Garage_Wheels::find($id);
        $new_wheels = Wheels::find($wheels->wheels_id);
        return $new_wheels;
    }

    public function ChangeWheelStatus($id,$status){
        $wheels = Garage_Wheels::find($id);
        $wheels->in_use = $status;
        $wheels->save();
        return $wheels;
    }
}
