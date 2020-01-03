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
            'stop_time' => 0,
            'power' => 0,
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

    /**
     * @param $user_id
     * @return mixed
     */
    public function GetAllVechilesByUserId($user_id){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($user_id);
        return Garage_Vechile::where('garage_id',$garage->id)->get()->all();
    }

    /**
     * @param $request
     * @return |null
     */
    public function AddEngineForVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_vechile_id'])->get()->first();
        $eng = new Garage_Engine();
        $engine_specs = $eng->GetEngineSpecsById($request['garage_engine_id']);

        $vechile_specs = $this->GetVechileSpecs($vechile['vechile_id']);
        //adding new engine to vechile
        if($engine_specs['level'] <= $vechile_specs['level']){
            $parts = unserialize($vechile->parts);
            $specs = unserialize($vechile->specification);
            //if vechile has engine recalcualte specs
            if($parts['engine'] != null){
                $eng->ChangeNosStatus($parts['engine'],0);
                $old_engine_specs = $eng->GetEngineSpecsById($parts['engine']);
                $specs['weight'] -=  $old_engine_specs["weight"];
                $specs['power'] -= $old_engine_specs["power"];
            }
            // Adding new specifications and part in car
            $parts['engine'] = $request['garage_engine_id'];
            $eng->ChangeEngineStatus($request['garage_engine_id'],1);
            $specs['weight'] += $engine_specs['weight'];
            $specs['power'] += $engine_specs['power'];
            $specs['capacity'] = $engine_specs['capacity'];
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return ['success' => $vechile];
        }
        return ['error' => 'Vehicle level is too low'];
    }

    public function AddWheelsForVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_vechile_id'])->get()->first();
        $wheel = new Garage_Wheels();
        $wheels_spec = $wheel->GetWheelsSpecsById($request['garage_wheel_id']);

        $vechile_specs = $this->GetVechileSpecs($vechile['vechile_id']);
        //adding new engine to vechile
        if($wheels_spec['level'] <= $vechile_specs['level']){
            $parts = unserialize($vechile->parts);
            $specs = unserialize($vechile->specification);
            //if vechile has engine recalcualte specs
            if($parts['wheels'] != null){
                $wheel->ChangeWheelStatus($parts['wheels'],0);
                $old_engine_specs = $wheel->GetWheelsSpecsById($parts['wheels']);
                $specs['weight'] -=  $old_engine_specs["weight"];
                $specs['power'] -= $old_engine_specs["power"];
            }
            // Adding new specifications and part in car
            $parts['wheels'] = $request['garage_wheel_id'];
            $wheel->ChangeWheelStatus($request['garage_wheel_id'],1);
            $specs['weight'] += $wheels_spec['weight'];
            $specs['power'] += $wheels_spec['power'];
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return ['success' => $vechile];
        }
        return ['error' => 'Vehicle level is too low'];
    }

    public function AddNosToVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_nos_id'])->get()->first();
        $nos = new Garage_Nos();
        $wheels_spec = $nos->GetNosSpecsById($request['garage_nos_id']);

        $vechile_specs = $this->GetVechileSpecs($vechile['vechile_id']);
        //adding new engine to vechile
        if($wheels_spec['level'] <= $vechile_specs['level']){
            $parts = unserialize($vechile->parts);
            $specs = unserialize($vechile->specification);
            //if vechile has engine recalcualte specs
            if($parts['nos'] != null){
                $nos->ChangeNosStatus($parts['nos'],0);
                $old_engine_specs = $nos->GetNosSpecsById($parts['nos']);
                $specs['power'] -= $old_engine_specs["power"];
            }
            // Adding new specifications and part in car
            $parts['nos'] = $request['garage_nos_id'];
            $nos->ChangeNosStatus($request['garage_nos_id'],1);
            $specs['power'] += $wheels_spec['power'];
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return ['success' => $vechile];
        }
        return ['error' => 'Vehicle level is too low'];
    }

    public function AddStopsToVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_vechile_id'])->get()->first();
        $stops = new Garage_Stop();
        $wheels_spec = $stops->GetStopsSpecsById($request['garage_stops_id']);
        $vechile_specs = $this->GetVechileSpecs($vechile['vechile_id']);
        //adding new engine to vechile
        if($wheels_spec['level'] <= $vechile_specs['level']){
            $parts = unserialize($vechile->parts);
            if($parts['stops'] != null){
                $stops->ChangeStopStatus($parts['stops'],0);
            }
            $specs = unserialize($vechile->specification);
            //if vechile has engine recalcualte specs
            // Adding new specifications and part in car
            $parts['stops'] = $request['garage_stops_id'];
            $specs['stop_time'] = $wheels_spec['stop_time'];
            $stops->ChangeStopStatus($parts['stops'],1);
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return ['success' => $vechile];
        }
        return ['error' => 'Vehicle level is too low'];
    }

    public function AddTurboToVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_vechile_id'])->get()->first();
        $turbo = new Garage_Turbo();
        $wheels_spec = $turbo->GetTurboSpecsById($request['garage_turbo_id']);
        $vechile_specs = $this->GetVechileSpecs($vechile['vechile_id']);
        //adding new engine to vechile
        if($wheels_spec['level'] <= $vechile_specs['level']){
            $parts = unserialize($vechile->parts);
            $specs = unserialize($vechile->specification);
            //if vechile has engine recalcualte specs
            if($parts['turbo'] != null){
                $turbo->ChangeTurboStatus($parts['turbo'],0);
                $old_engine_specs = $turbo->GetTurboSpecsById($parts['turbo']);
                $specs['power'] -= $old_engine_specs["power"];
            }
            // Adding new specifications and part in car
            $parts['turbo'] = $request['garage_turbo_id'];
            $turbo->ChangeTurboStatus($parts['turbo'],1);
            $specs['power'] += $wheels_spec['power'];
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return ['success' => $vechile];
        }
        return ['error' => 'Vehicle level is too low'];
    }

    public function RemoveEngineFromVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_vechile_id'])->get()->first();
        $eng = new Garage_Engine();
        $vechile_specs = $this->GetVechileSpecs($vechile['vechile_id']);

        $parts = unserialize($vechile->parts);
        if($parts['engine'] != null) {
            $engine_specs = $eng->GetEngineSpecsById($parts['engine']);
            $eng->ChangeEngineStatus($parts['engine'],0);
            $specs = unserialize($vechile->specification);
            $specs['weight'] -=  $engine_specs["weight"];
            $specs['power'] -= $engine_specs["power"];
            $specs['capacity'] = 0;
            $parts['engine'] = null;
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return $vechile;
        }

        return null;
    }

    public function RemoveWheelsFromVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_vechile_id'])->get()->first();
        $wheels = new Garage_Wheels();

        $parts = unserialize($vechile->parts);
        if($parts['wheels'] != null) {
            $wheels_spec = $wheels->GetWheelsSpecsById($parts['wheels']);
            $wheels->ChangeWheelStatus($parts['wheels'],0);
            $specs = unserialize($vechile->specification);
            $specs['weight'] -= $wheels_spec['weight'];
            $specs['power'] -= $wheels_spec['power'];
            $parts['wheels'] = null;
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return $vechile;
        }
        return null;
    }

    public function RemoveStopsFromVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_vechile_id'])->get()->first();
        $stops = new Garage_Stop();

        $parts = unserialize($vechile->parts);
        if($parts['stops'] != null) {
            $stops_spec = $stops->GetStopsSpecsById($parts['stops']);
            $stops->ChangeStopStatus($parts['stops'],0);
            $specs = unserialize($vechile->specification);
            $specs['stop_time'] -= $stops_spec['stop_time'];
            $parts['stops'] = null;
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return $vechile;
        }
        return null;
    }

    public function RemoveTurboFromVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_vechile_id'])->get()->first();
        $turbo = new Garage_Turbo();

        $parts = unserialize($vechile->parts);
        if($parts['turbo'] != null) {
            $turbo_specs = $turbo->GetTurboSpecsById($parts['turbo']);
            $turbo->ChangeTurboStatus($parts['turbo'],0);
            $specs = unserialize($vechile->specification);
            $specs['power'] -= $turbo_specs['power'];
            $parts['turbo'] = null;
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return $vechile;
        }
        return null;
    }

    public function RemoveNosFromVechile($request){
        $garage_obj = new Garage();
        $garage = $garage_obj->GetGarageByUserId($request['user_id']);
        $vechile = Garage_Vechile::where('garage_id',$garage->id)->where('id',$request['garage_vechile_id'])->get()->first();
        $nos = new Garage_Nos();

        $parts = unserialize($vechile->parts);
        if($parts['nos'] != null) {
            $turbo_specs = $nos->GetNosSpecsById($parts['nos']);
            $nos->ChangeNosStatus($parts['nos'],0);
            $specs = unserialize($vechile->specification);
            $specs['power'] -= $turbo_specs['power'];
            $parts['nos'] = null;
            $vechile->update(['specification' => serialize($specs)]);
            $vechile->update(['parts' => serialize($parts)]);
            return $vechile;
        }
        return null;
    }
    public function GetUserVechileSpecs($id){
        $new_vechile = Garage_Vechile::find($id);
        return unserialize($new_vechile->specification);
    }

    public function GetVechileSpecs($id){
        $new_vechile = Vechile::find($id);
        return $new_vechile;
    }

    public function getGarageVechileById($id){
        return Garage_Vechile::find($id);
    }

    public function GetVechileInUseParts($id){
        $new_vechile = Garage_Vechile::find($id);
        return unserialize($new_vechile->parts);
    }
}
