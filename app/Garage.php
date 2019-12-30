<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Garage extends Model
{
    protected $fillable = [
        'user_id','car_in_use_id'
    ];

    public function createGarage($user_id){
        $input = [
            'user_id' => $user_id,
            'car_in_use_id' => null
        ];

        $garage = Garage::create($input);

        return $garage;
    }

    public function ChangeCarInUse($user_id, $car_id){
        $garage = $this->GetGarageByUserId($user_id);

        $garage->update(['car_in_use_id' => $car_id]);

        return $garage;
    }

    public function GetGarageByUserId($user_id){
        return Garage::where('user_id',$user_id)->get()->first();
    }

}
