<?php

namespace App\Http\Controllers\Api;

use App\Repositories\MarketRepositoryInterface;
use App\Repositories\RacesRepositoryInterface;
use App\Repositories\ReportRepository;
use App\Repositories\ReportRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;

class ReportController extends Controller
{
    private $reportRepo;

    public function __construct(ReportRepositoryInterface $reportRepo){
        $this->reportRepo = $reportRepo;
    }

    public function GetReportByUserId($id){
       return $this->reportRepo->GetReportByUserId($id);
    }
}