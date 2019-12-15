<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface GarageRepositoryInterface
{
    public function AddVechile(Request $request);

    public function AddEngine(Request $request);

    public function AddStop(Request $request);

    public function AddWheels(Request $request);

    public function AddTurbo(Request $request);

    public function AddNos(Request $request);

    public function  AddPart(Request $request);

    public function AddVechileToGarage(Request $request);

    public function AddEngineToGarage(Request $request);

    public function AddNosToGarage(Request $request);

    public function AddStopToGarage(Request $request);

    public function AddTurboToGarage(Request $request);

}