<?php

namespace App;
use App\Vechile;
use Illuminate\Database\Eloquent\Model;

class Garage_Vechile extends Model
{
    protected $fillable = [
        'specification', 'parts', 'garage_id', 'vechile_id'
    ];

    /**
     * @param $request
     * @return mixed
     */
    public function addVechileToGarage($request)
    {
       $this->getSpecification($request);

        $input = [
            'specification' => serialize($this->getSpecification($request)),
            'parts' => serialize($this->getParts($request)),
            'garage_id' => $request['garage_id'],
            'vechile_id' => $request['vechile_id']
        ];

        $garage_vechile = Garage_Vechile::create($input);
        return $garage_vechile;
    }

    /**
     * @param $request
     * @return array
     */
    private function getSpecification($request){
        $vechile_obj = new Vechile();
        $vechile = $vechile_obj->getVechileById($request['vechile_id']);
        return [
            'ac_speed' => 0,
            'stop_time' => 0,
            'capacity' => 0,
            'liter'=> 0,
            'weight' => $vechile->weight,
        ];
    }

    /**
     * @param $request
     * @return array
     */
    private function getParts($request){
        return [
          'engine' => null,
          'stops' => null,
          'wheels' => null,
          'nos' => null,
          'turbo' => null
        ];
    }
}
