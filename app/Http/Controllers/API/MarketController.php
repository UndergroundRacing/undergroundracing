<?php

namespace App\Http\Controllers\Api;

use App\Repositories\MarketRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;

class MarketController extends Controller
{
    private $marketRepository;

    public function __construct(MarketRepositoryInterface $repository)
    {
        $this->marketRepository = $repository;
    }

    public function AddMarket(Request $request)
    {
        return $this->marketRepository->AddMarket($request);
    }

    public function AddPartToMarket(Request $request)
    {
        return $this->marketRepository->AddPartToMarket($request);
    }

    public function BuyPartFromMarket(Request $request)
    {
        return $this->marketRepository->BuyPartFromMarket($request);
    }

    public function CancelSellingPart(Request $request){
        return $this->marketRepository->CancelSellingPart($request);
    }
    public function BuyFromSystemMarket(Request $request)
    {
        return $this->marketRepository->BuyFromSystemMarket($request);
    }
}