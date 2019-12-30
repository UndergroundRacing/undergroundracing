<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Parts extends Model
{
    protected $fillable = [
        'title'
    ];

    public function AddPart($input){
        $input = [
            'title' => $input['title']
        ];

        $part = Parts::create($input);
        return $part;
    }

    public function GetPartSpecificationById($request){
        switch ($request['part_type']) {
            case 1:
                return Engine::find($request['part_id']);
                break;
            case 2:
                return Stop::find($request['part_id']);
                break;
            case 3:
                return Wheels::find($request['part_id']);
                break;
            case 4:
                return Nos::find($request['part_id']);
                break;
            case 5:
                return Turbo::find($request['part_id']);
                break;
            case 6:
                return Vechile::find($request['part_id']);
            default:
                return null;
                break;
        }
    }

    public function GetAllPartsByType($part_type){
        switch ($part_type) {
            case 1:
                return Engine::all();
                break;
            case 2:
                return Stop::all();
                break;
            case 3:
                return Wheels::all();
                break;
            case 4:
                return Nos::all();
                break;
            case 5:
                return Turbo::all();
                break;
            case 6:
                return Vechile::all();
            default:
                return null;
                break;
        }
    }

    public function GetPartSpecificationInGarage(Request $request){
        switch ($request['part_type']) {
            case 1:
                $garage_part = Garage_Engine::find($request['garage_part_id']);
                $req = [
                    'part_type' => $request['part_type'],
                    'part_id' => $garage_part->engine_id
                ];
                return $this->GetPartSpecificationById($req);
                break;
            case 2:
                $garage_part = Garage_Stop::find($request['garage_part_id']);
                $req = [
                    'part_type' => $request['part_type'],
                    'part_id' => $garage_part->stops_id
                ];
                return $this->GetPartSpecificationById($req);
                break;
            case 3:
                $garage_part = Garage_Wheels::find($request['garage_part_id']);
                $req = [
                    'part_type' => $request['part_type'],
                    'part_id' => $garage_part->wheels_id
                ];
                return $this->GetPartSpecificationById($req);
                break;
            case 4:
                $garage_part = Garage_Nos::find($request['garage_part_id']);
                $req = [
                    'part_type' => $request['part_type'],
                    'part_id' => $garage_part->nos_id
                ];
                return $this->GetPartSpecificationById($req);
                break;
            case 5:
                $garage_part = Garage_Turbo::find($request['garage_part_id']);
                $req = [
                    'part_type' => $request['part_type'],
                    'part_id' => $garage_part->turbo_id
                ];
                return $this->GetPartSpecificationById($req);
                break;
            case 6:
                $garage_part = Garage_Vechile::find($request['garage_part_id']);
                $req = [
                    'part_type' => $request['part_type'],
                    'part_id' => $garage_part->vechile_id
                ];
                return $this->GetPartSpecificationById($req);
                break;
            default:
                return null;
                break;
        }
    }

    public function GetAllPartsInGarage($request){
        switch ($request['part_type']) {
            case 1:
                 $garage_part = Garage_Engine::where('garage_id',$request['garage_id'])->get();
                 return $this->GetAllGaragePartsSpecifications($garage_part,$request['part_type']);
                break;
            case 2:
                $garage_part = Garage_Stop::where('garage_id',$request['garage_id'])->get();
                return $this->GetAllGaragePartsSpecifications($garage_part,$request['part_type']);
                break;
            case 3:
                $garage_part = Garage_Wheels::where('garage_id',$request['garage_id'])->get();
                return $this->GetAllGaragePartsSpecifications($garage_part,$request['part_type']);
                break;
            case 4:
                $garage_part = Garage_Nos::where('garage_id',$request['garage_id'])->get();
                return $this->GetAllGaragePartsSpecifications($garage_part,$request['part_type']);
                break;
            case 5:
                $garage_part = Garage_Turbo::where('garage_id',$request['garage_id'])->get();
                return $this->GetAllGaragePartsSpecifications($garage_part,$request['part_type']);
                break;
            case 6:
                $garage_part = Garage_Vechile::where('garage_id',$request['garage_id'])->get();
                return $this->GetAllGaragePartsSpecifications($garage_part,$request['part_type']);
                break;
            default:
                return null;
                break;
        }
    }

    public function GetAllGaragePartsSpecifications($parts,$part_type){
        $parts_to_return = [];
        $i= 0;
        switch ($part_type){
            case 1:
                foreach($parts as $part){
                    $req= [
                        'part_type' => $part_type,
                        'part_id' => $part['engine_id']
                    ];
                    $specs = $this->GetPartSpecificationById($req);
                    $parts_to_return[$i] = [
                        'garage_engine_id' => $part['id'],
                        'specs' => $specs
                    ];
                    $i++;
                }
                return $parts_to_return;
                break;
            case 2:
                foreach($parts as $part){
                    $req= [
                        'part_type' => $part_type,
                        'part_id' => $part['stops_id']
                    ];
                    $specs = $this->GetPartSpecificationById($req);
                    $parts_to_return[$i] = [
                        'garage_stops_id' => $part['id'],
                        'specs' => $specs
                    ];
                    $i++;
                }
                return $parts_to_return;
                break;
            case 3:
                foreach($parts as $part){
                    $req= [
                        'part_type' => $part_type,
                        'part_id' => $part['wheels_id']
                    ];
                    $specs = $this->GetPartSpecificationById($req);
                    $parts_to_return[$i] = [
                        'garage_wheels_id' => $part['id'],
                        'specs' => $specs
                    ];
                    $i++;
                }
                return $parts_to_return;
                break;
            case 4:
                foreach($parts as $part){
                    $req= [
                        'part_type' => $part_type,
                        'part_id' => $part['nos_id']
                    ];
                    $specs = $this->GetPartSpecificationById($req);
                    $parts_to_return[$i] = [
                        'garage_nos_id' => $part['id'],
                        'specs' => $specs
                    ];
                    $i++;
                }
                return $parts_to_return;
                break;
            case 5:
                foreach($parts as $part){
                    $req= [
                        'part_type' => $part_type,
                        'part_id' => $part['turbo_id']
                    ];
                    $specs = $this->GetPartSpecificationById($req);
                    $parts_to_return[$i] = [
                        'garage_turbo_id' => $part['id'],
                        'specs' => $specs
                    ];
                    $i++;
                }
                return $parts_to_return;
                break;
            case 6:
                foreach($parts as $part){
                    $req= [
                        'part_type' => $part_type,
                        'part_id' => $part['vechile_id']
                    ];
                    $specs = $this->GetPartSpecificationById($req);
                    $parts_to_return[$i] = [
                        'garage_vechile_id' => $part['id'],
                        'specs' => $specs
                    ];
                    $i++;
                }
                return $parts_to_return;
                break;
            default:
                return null;
                break;
        }
    }
}
