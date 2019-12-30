<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    protected $fillable = [
        'title'
    ];
    private $user;
    private $garage;
    private $parts;
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->user = new User();
        $this->garage = new Garage();
        $this->parts = new Parts();
    }

    public function AddMarket($request){
        $input = [
            'title' => $request['title'],
        ];

        return Market::create($input);
    }

    public function BuyFromSystemMarket($request){
        $garage = $this->garage->GetGarageByUserId($request['user_id']);
        $req = [
          'part_type' => $request['part_type'],
          'part_id' => $request['part_id']
        ];
        $part = $this->parts->GetPartSpecificationById($req);
        if($this->user->CheckIfUserHasEnoughMoney($request['user_id'],$part->price)){
            switch ($request['part_type']) {
                case 1:
                    $garage_part = new Garage_Engine();
                    $part_req = [
                        'garage_id' => $garage["id"],
                        'engine_id' => $request['part_id']
                    ];
                    $this->user->MinusUserCash($request['user_id'],$part->price);
                    return ['success' =>$garage_part->AddEngineToGarage($part_req)];
                    break;
                case 2:
                    $garage_part = new Garage_Stop();
                    $part_req = [
                        'garage_id' => $garage["id"],
                        'stops_id' => $request['part_id']
                    ];
                    $this->user->MinusUserCash($request['user_id'],$part->price);
                    return ['success' =>$garage_part->AddStopToGarage($part_req)];
                    break;
                case 3:
                    $garage_part = new Garage_Wheels();
                    $part_req = [
                        'garage_id' => $garage["id"],
                        'wheels_id' => $request['part_id']
                    ];
                    $this->user->MinusUserCash($request['user_id'],$part->price);
                    return ['success' =>$garage_part->AddWheelsToGarage($part_req)];
                    break;
                case 4:
                    $garage_part = new Garage_Nos();
                    $part_req = [
                        'garage_id' => $garage["id"],
                        'nos_id' => $request['part_id']
                    ];
                    $this->user->MinusUserCash($request['user_id'],$part->price);
                    return ['success' => $garage_part->AddNosToGarage($part_req)];
                    break;
                case 5:
                    $garage_part = new Garage_Turbo();
                    $part_req = [
                        'garage_id' => $garage["id"],
                        'turbo_id' => $request['part_id']
                    ];
                    $this->user->MinusUserCash($request['user_id'],$part->price);
                    return ['success' => $garage_part->AddTurboToGarage($part_req)];
                    break;
                case 6:
                    $garage_part = new Garage_Vechile();
                    $part_req = [
                        'garage_id' => $garage["id"],
                        'vechile_id' => $request['part_id']
                    ];
                    $this->user->MinusUserCash($request['user_id'],$part->price);
                    return ['success' => $garage_part->addVechileToGarage($part_req)];
                    break;
                default:
                    return 'null';
                    break;
            }
        }
        return ['error' => 'You have not enough money'];

    }
}
