<?php

namespace App\Repositories;

use App\Market;
use App\Market_Garage;
use App\User;
use Illuminate\Http\Request;
use Validator;

class MarketRepository implements MarketRepositoryInterface
{
    public $successStatus = 200;
    private $user;

    public function __construct()
    {
        $this->user = new User();
    }

    public function AddMarket(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'title' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $market = new Market();
        $createdMarket = $market->AddMarket($request);
        return response()->json(['success' => $createdMarket],$this->successStatus);
    }

    public function AddPartToMarket(Request $request)
    {
        /**
         * Part type:
         * 1 - engines
         * 2 - stops
         * 3 - wheels
         * 4 - nos
         * 5 - turbo
         */
        $validator = Validator::make($request->all(),
            [
                'seller_id' => 'required',
                'market_id' => 'required',
                'price' => 'required',
                'part_type' => 'required',
                'garage_part_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $market = new Market_Garage();
        $createdMarket = $market->AddPartToMarket($request);
        return response()->json(['success' => $createdMarket],$this->successStatus);

    }

    public function BuyPartFromMarket(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'market_part_id' => 'required',
                'buyer_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $market = new Market_Garage();
        $createdMarket = $market->BuyPartFromMarket($request);
        return response()->json(['success' => $createdMarket],$this->successStatus);
    }

    public function CancelSellingPart(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'market_part_id' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $market = new Market_Garage();
        $createdMarket = $market->CancelSellingPart($request);
        return response()->json(['success' => $createdMarket],$this->successStatus);
    }
}