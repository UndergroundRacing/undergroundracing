<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
class Market_Garage extends Model
{
    protected $fillable = [
        'user_id' , 'price' , 'part', 'market_id'
    ];

    public function AddPartToMarket($request){
        /**
         * Part type:
         * 1 - engines
         * 2 - stops
         * 3 - wheels
         * 4 - nos
         * 5 - turbo
         */
        $part = [
          'garage_part_id' => $request['garage_part_id'],
          'part_type' => $request['part_type']
        ];

        $input = [
            'user_id' => $request['seller_id'],
            'market_id' => $request['market_id'],
            'price' => $request['price'],
            'part' => serialize($part)
        ];

        return Market_Garage::create($input);
    }

    public function BuyPartFromMarket($request){
        $partInMarket = Market_Garage::find($request['market_part_id']);
        $part = unserialize($partInMarket['part']);
        $user = new User();
        $seller =$user->GetUser($partInMarket['user_id']);
        $buyer = $user->GetUser($request['buyer_id']);
        if($user->CheckIfUserHasEnoughMoney($buyer->id,$partInMarket['price'])){
            $partToChange = $this->getPartObject($part);
            $garage = new Garage();
            $buyerGarage =  $garage->GetGarageByUserId($buyer->id);
            $user->AddCashForUser($seller->id,$partInMarket["price"]);
            $user->MinusUserCash($buyer->id,$partInMarket["price"]);
            $partToChange->garage_id = $buyerGarage['id'];
            $partToChange->save();
            $partInMarket->delete();
            return true;
        }
        return false;
    }

    private function getPartObject($part){
        switch ($part['part_type']) {
            case 1:
                return Garage_Engine::find($part['garage_part_id']);
                break;
            case 2:
                return Garage_Stop::find($part['garage_part_id']);
                break;
            case 3:
                return Garage_Wheels::find($part['garage_part_id']);
                break;
            case 4:
                return Garage_Nos::find($part['garage_part_id']);
                break;
            case 5:
                return Garage_Turbo::find($part['garage_part_id']);
                break;
            default:
                return 'null';
                break;
        }
    }

    public function CancelSellingPart($request){
        $part = Market_Garage::find($request['market_part_id']);
        $part->delete();
        return true;
    }
}
