<?php
namespace App\Repositories;
use App\Engine;
use App\Garage;
use App\Garage_Engine;
use App\Garage_Nos;
use App\Garage_Stop;
use App\Garage_Turbo;
use App\Garage_Vechile;
use App\Garage_Wheels;
use App\Stop;
use App\Turbo;
use App\Vechile;
use App\Parts;
use App\Wheels;
use App\Nos;
use Illuminate\Http\Request;
use Validator;

class GarageRepository implements GarageRepositoryInterface
{
    public $successStatus = 200;

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddVechile(Request $request){
        $validator = Validator::make($request->all(),
            [
                'title' => 'required',
                'level' => 'required',
                'weight' => 'required',
                'part_id' => 'required',
                'image_url' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $vechile = new Vechile();
        $createdVechile = $vechile->createVechile($request);
        return response()->json($createdVechile,$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddStop(Request $request){
        $validator = Validator::make($request->all(),
            [
                'level' => 'required',
                'weight' => 'required',
                'stop_time' => 'required',
                'part_id' => 'required',
                'image_url' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $stops = new Stop();
        $createdStop = $stops->AddStop($request);
        return response()->json(['success' => $createdStop],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddWheels(Request $request){
        $validator = Validator::make($request->all(),
            [
                'title' => 'required',
                'level' => 'required',
                'weight' => 'required',
                'power' => 'required',
                'part_id' => 'required',
                'image_url' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $wheels = new Wheels();
        $createdWheel = $wheels->AddWheels($request);
        return response()->json(['success' => $createdWheel],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddTurbo(Request $request){
        $validator = Validator::make($request->all(),
            [
                'level' => 'required',
                'weight' => 'required',
                'power' => 'required',
                'part_id' => 'required',
                'image_url' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $turbo = new Turbo();
        $createdTurbo = $turbo->AddTurbo($request);
        return response()->json(['success' => $createdTurbo],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddNos(Request $request){
        $validator = Validator::make($request->all(),
            [
                'level' => 'required',
                'weight' => 'required',
                'power' => 'required',
                'part_id' => 'required',
                'image_url' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $nos = new Nos();
        $createdNos = $nos->AddNos($request);
        return response()->json(['success' => $createdNos],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddPart(Request $request){
        $validator = Validator::make($request->all(),
            [
                'title' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $parts = new Parts();
        $createdPart =  $parts->AddPart($request);

        return response()->json(['success' => $createdPart],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddEngine(Request $request){
        $validator = Validator::make($request->all(),
            [
                'level' => 'required',
                'weight' => 'required',
                'power' => 'required',
                'capacity' => 'required',
                'part_id' => 'required',
                'image_url' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $engine = new Engine();
        $createdEngine = $engine->AddEngine($request);
        return response()->json(['success' => $createdEngine],$this->successStatus);

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddVechileToGarage(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'garage_id' => 'required',
                'vechile_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        $garage_vechile = $garage->addVechileToGarage($request);
        return response()->json(['success' => $garage_vechile],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddEngineToGarage(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'garage_id' => 'required',
                'engine_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Engine();
        $garage_engine = $garage->AddEngineToGarage($request);
        return response()->json(['success' => $garage_engine],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddNosToGarage(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'garage_id' => 'required',
                'nos_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Nos();
        $garage_nos = $garage->AddNosToGarage($request);
        return response()->json(['success' => $garage_nos],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddStopToGarage(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'garage_id' => 'required',
                'stops_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Stop();
        $garage_stop = $garage->AddStopToGarage($request);
        return response()->json(['success' => $garage_stop],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddTurboToGarage(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'garage_id' => 'required',
                'turbo_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Turbo();
        $garage_turbo = $garage->AddTurboToGarage($request);
        return response()->json(['success' => $garage_turbo],$this->successStatus);
    }

    /**
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function ChangeCarInUse($request){
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'car_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage();
        $gar = $garage->ChangeCarInUse($request['user_id'],$request['car_id']);
        return response()->json(['success' => $gar],$this->successStatus);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function GetAllVechilesInGarage($id)
    {
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->GetAllVechilesByUserId($id)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddEngineToVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required',
                'garage_engine_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->AddEngineForVechile($request)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddWheelsToGarage(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'garage_id' => 'required',
                'wheels_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $garage = new Garage_Wheels();
        $garage_wheels = $garage->AddWheelsToGarage($request);
        return response()->json(['success' => $garage_wheels],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddWheelsToVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required',
                'garage_wheel_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->AddWheelsForVechile($request)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddNosToVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required',
                'garage_nos_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->AddNosToVechile($request)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddStopsToVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required',
                'garage_stops_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->AddStopsToVechile($request)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddTurboToVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required',
                'garage_turbo_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->AddTurboToVechile($request)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function RemoveEngineFromVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->RemoveEngineFromVechile($request)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function RemoveWheelsFromVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->RemoveWheelsFromVechile($request)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function RemoveStopsFromVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->RemoveStopsFromVechile($request)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function RemoveTurboFromVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->RemoveTurboFromVechile($request)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function RemoveNosFromVechile(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'garage_vechile_id' => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $garage = new Garage_Vechile();
        return response()->json(['success' => $garage->RemoveNosFromVechile($request)],$this->successStatus);
    }
}