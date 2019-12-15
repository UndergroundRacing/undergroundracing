<?php
namespace App\Http\Controllers\Api;
use App\Repositories\GarageRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
class GarageController extends Controller
{
    /**
     * @var AuthRepository
     */
    private $garageRepository;

    public function __construct(GarageRepositoryInterface $garageRepository){
        $this->garageRepository = $garageRepository;
    }

    public function AddVechile(Request $request){
       return $this->garageRepository->AddVechile($request);
    }

    public function AddPart(Request $request){
        return $this->garageRepository->AddPart($request);
    }

    public function AddEngine(Request $request){
        return $this->garageRepository->AddEngine($request);
    }

    public function AddWheels(Request $request){
        return $this->garageRepository->AddWheels($request);
    }

    public function AddNos(Request $request){
        return $this->garageRepository->AddNos($request);
    }

    public function AddTurbo(Request $request){
        return $this->garageRepository->AddTurbo($request);
    }

    public function AddStop(Request $request){
        return $this->garageRepository->AddStop($request);
    }

    public function AddVechileToGarage(Request $request){
        return $this->garageRepository->AddVechileToGarage($request);
    }

    public function AddEngineToGarage(Request $request){
        return $this->garageRepository->AddEngineToGarage($request);
    }

    public function AddNosToGarage(Request $request){
        return $this->garageRepository->AddNosToGarage($request);
    }

    public function AddStopToGarage(Request $request){
        return $this->garageRepository->AddStopToGarage($request);
    }

    public function AddTurboToGarage(Request $request){
        return $this->garageRepository->AddTurboToGarage($request);
    }
}