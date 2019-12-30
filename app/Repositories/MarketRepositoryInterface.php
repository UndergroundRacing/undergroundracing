<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface MarketRepositoryInterface
{

    public function AddMarket(Request $request);

    public function AddPartToMarket(Request $request);

    public function BuyPartFromMarket(Request $request);

    public function CancelSellingPart(Request $request);

    public function BuyFromSystemMarket(Request $request);
}