<?php

namespace App\Http\Controllers\Api;

use App\Repositories\MarketRepositoryInterface;
use App\Repositories\RacesRepositoryInterface;
use App\Repositories\ReportRepository;
use App\Repositories\ReportRepositoryInterface;
use App\Repositories\TopRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;

class TopController extends Controller
{
    private $topRepository;

    public function __construct(TopRepositoryInterface $topRepository){
        $this->topRepository = $topRepository;
    }

    public function GetTops(){
        return $this->topRepository->GetTops();
    }
}