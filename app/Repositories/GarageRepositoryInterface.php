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

    public function AddWheelsToGarage(Request $request);

    public function AddNosToGarage(Request $request);

    public function AddStopToGarage(Request $request);

    public function AddTurboToGarage(Request $request);

    public function ChangeCarInUse($request);

    public function GetAllVechilesInGarage($id);

    public function AddEngineToVechile(Request $request);

    public function AddWheelsToVechile(Request $request);

    public function AddNosToVechile(Request $request);

    public function AddStopsToVechile(Request $request);

    public function AddTurboToVechile(Request $request);

    public function RemoveEngineFromVechile(Request $request);

    public function RemoveWheelsFromVechile(Request $request);

    public function RemoveStopsFromVechile(Request $request);

    public function RemoveTurboFromVechile(Request $request);

    public function RemoveNosFromVechile(Request $request);

    public function GetPartSpecificationById(Request $request);

    public function GetAllPartsByType($part_type);

    public function GetPartSpecificationInGarage(Request $request);

    public function GetAllPartsInGarage(Request $request);

    public function GetCarInUseByUserId($user_id);


    public function GetAllParts();

    public function GetCarAllSpecifications($vech_id);

}