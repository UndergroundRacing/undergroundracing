<?php

namespace App\Repositories;

use App\Garage_Vechile;
use App\Race;
use App\Report;
use App\User;
use App\Garage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ReportRepository implements ReportRepositoryInterface
{
    private $successStatus = 200;
    private $report;

    public function __construct()
    {
        $this->report = new Report();
    }

    public function GetReportByUserId($id)
    {
        return response()->json(['success' => $this->report->GetReportByUserId($id)],$this->successStatus);
    }

}