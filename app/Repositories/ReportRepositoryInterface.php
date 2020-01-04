<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface ReportRepositoryInterface
{
    public function GetReportByUserId($id);
}