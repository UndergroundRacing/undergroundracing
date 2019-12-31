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
        $car_garage = new Garage_Vechile();
        $car_garage_obj = $car_garage->getGarageVechileById($car_id);
        $car = new Vechile();
        $car_obj = $car->getVechileById($car_garage_obj->vechile_id);
        $user = new User();
        $user_obj = $user->GetUser($user_id);
        if($user_obj->level >= $car_obj->level )
        {
            $garage->update(['car_in_use_id' => $car_id]);
            return $garage;
        }
        else return 'Low level';
    }

    public function GetGarageByUserId($user_id){
        return Garage::where('user_id',$user_id)->get()->first();
    }

    public function GetCarInUseByUserId($user_id)
    {
        $garage = $this->GetGarageByUserId($user_id);

        return [
          'car_in_use' => $garage["car_in_use_id"]
        ];
    }

}
