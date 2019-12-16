<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Garage_Turbo extends Model
{
    protected $fillable = [
        'garage_id', 'turbo_id'
    ];

    public function AddTurboToGarage($request)
    {
        $input = [
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
}
