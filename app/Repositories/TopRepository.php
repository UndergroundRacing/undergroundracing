<?php

namespace App\Repositories;

use App\Garage_Vechile;
use App\Race;
use App\Report;
use App\Top;
use App\User;
use App\Garage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class TopRepository implements TopRepositoryInterface
{
    private $successStatus = 200;
    private $top;

    public function __construct()
    {
        $this->top = new Top();
    }

    public function GetTops()
    {
        return response()->json(['success' => $this->top->GetTops()],$this->successStatus);
    }

}