<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Garage_Nos extends Model
{
    protected $fillable = [
        'garage_id', 'nos_id'
    ];

    public function AddNosToGarage($request)
    {
        $input = [
            'garage_id' => $request['garage_id'],
            'nos_id' => $request['nos_id']
        ];

        $garage_nos = Garage_Nos::create($input);

        return $garage_nos;
    }

    public function GetNosSpecsById($id){
        $nos = Garage_Nos::find($id);
        $new_wheels = Nos::find($nos->nos_id);
        return $new_wheels;
    }
}
