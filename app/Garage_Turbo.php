<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Garage_Turbo extends Model
{
    protected $fillable = [
        'garage_id', 'turbo_id','in_use'
    ];

    public function AddTurboToGarage($request)
    {
        $input = [
            'in_use' => 0,
            'garage_id' => $request['garage_id'],
            'turbo_id' => $request['turbo_id']
        ];

        $garage_turbo = Garage_Turbo::create($input);

        return $garage_turbo;
    }

    public function GetTurboSpecsById($id){
        $turbo = Garage_Turbo::find($id);
        $new_turbo = Turbo::find($turbo->turbo_id);
        return $new_turbo;
    }

    public function ChangeTurboStatus($id,$status){
        $turbo = Garage_Turbo::find($id);
        $turbo->in_use = $status;
        $turbo->save();
        return $turbo;
    }

}
