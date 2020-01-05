<?php


namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    private $races;
    private $parts;
    private $garage;
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->garage = new Garage();
    }

    public function GetReportByUserId($id){
        return [
          'vehicle_count' => $this->GetVechileCount($id),
          'parts_count' => $this->GetPartsCount($id),
          'races_count' => $this->GetRacesCount($id),
          'races_win_count' => $this->GetWonRacesCount($id),
          'win_percent' => round($this->GetWonRacesPercent($id),2)
        ];
    }

    public function GetVechileCount($id){
        $garage = $this->garage->GetGarageByUserId($id);
        return Garage_Vechile::where('garage_id',$garage["id"])->get()->count();
    }

    public function GetPartsCount($id){
        $garage = $this->garage->GetGarageByUserId($id);
        $enginesCount = Garage_Engine::where('garage_id',$garage["id"])->get()->count();
        $stopsCount = Garage_Stop::where('garage_id',$garage["id"])->get()->count();
        $wheelsCount = Garage_Wheels::where('garage_id',$garage["id"])->get()->count();
        $turboCount = Garage_Turbo::where('garage_id',$garage["id"])->get()->count();
        $nosCount = Garage_Nos::where('garage_id',$garage["id"])->get()->count();

        return $enginesCount + $stopsCount + $wheelsCount + $turboCount + $nosCount;
    }

    public function GetRacesCount($id){
        return Race::where('first_racer',$id)->get()->count();
    }

    public function GetWonRacesCount($id){
        return Race::where('first_racer',$id)->where('winner_id',$id)->get()->count();
    }

    public function GetWonRacesPercent($id){
        $allRaces = $this->GetRacesCount($id);
        $wonRaces = $this->GetWonRacesCount($id);
        return (100 * $wonRaces) / $allRaces;
    }
}
