<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Race extends Model
{
    protected $fillable = [
        'first_racer', 'second_racer', 'winner_id', 'prize', 'experience'
    ];
    private $user;
    private $garage;
    private $vehicle;
    private $task;
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->user = new User();
        $this->garage = new Garage();
        $this->vehicle = new Garage_Vechile();
        $this->task = new Tasks();
    }

    public function CreateRace($request){
        $winner = $this->DoRaceAction($request);
        if($winner === $request['first_racer']){
            $prize = $this->CalculatePrize($winner);
            if($this->task->GetUserInProgressTask($request["first_racer"]) != null){
               $this->task->AddRaceToTask($request['first_racer']);
            }
            $user_obj = $this->user->GetUser($request['first_racer']);
            $this->user->CheckForLevelUp($user_obj);
        }
        else{
            $prize = [
              'prize' => 0,
              'experience' => 0
            ];
        }

        $input = [
          'first_racer' => $request['first_racer'],
            'second_racer' => $request['second_racer'],
            'winner_id' => $winner,
            'prize' => $prize['prize'],
            'experience' => $prize['experience']
        ];

        $race = Race::create($input);
        return $race;
    }

    public function GetLastRace($user_id){
        return Race::where('first_racer',$user_id)->get()->last();
    }

    public function SearchOponent($id){
        $user = $this->user->GetUser($id);
        $minLevel = $user->level - 7;
        $maxLevel = $user->level + 7;
        $users = User::where('level','>',$minLevel)
            ->where('level','<',$maxLevel)
            ->where('id','!=', $id)
            ->get();
        $offset = rand(0,count($users)-1);
        $data = [
          'user' => $users[$offset],
          'car_in_use' =>$this->GetOpponentCarInUse($users[$offset]['id'])
        ];
        return $data;
    }

    public function GetOpponentCarInUse($user_id){
        $garage = new Garage();
        $gar = $garage->GetGarageByUserId($user_id);
        $part = new Parts();
            $req = [
                'part_type' => 6,
                'garage_part_id' => $gar['car_in_use_id']
            ];
            $car_in_use = $part->GetPartSpecificationInGarage($req);

        return $car_in_use;
    }

    public function CalculatePrize($user_id){
        $user = $this->user->GetUser($user_id);
        if($user->level > 0){
            $prize = (100 * $user->level) * 0.1;
            $exp = 20 * $user->level;
        }
        else{
            $prize = 100;
            $exp = 10;
        }
        $user->cash += $prize;
        $user->experience += $exp;
        $user->save();
        return [
            'prize' => $prize,
            'experience' =>$exp
        ];
    }

    public function DoRaceAction($request){
        $firsUserCalculation = $this->CalculateUserTimesWrapper($request['first_racer']);
        $secondUserCalculation = $this->CalculateUserTimesWrapper($request['second_racer']);
        if($firsUserCalculation <= $secondUserCalculation){
            return $request['first_racer'];
        }
        else{
            return $request['second_racer'];
        }
    }

    public function CalculateUserTimesWrapper($user_id){
        $userAbilities = $this->user->getAbilities($user_id);
        $userGarage = $this->garage->GetGarageByUserId($user_id);
        $userCarSpecs = $this->vehicle->GetUserVechileSpecs($userGarage->car_in_use_id);
        return $this->CalculateUserTime($userCarSpecs,$userAbilities);
    }

    public function CalculateUserTime($userCarSpecs,$userAbilities){
        return $this->CalculateET($userCarSpecs["weight"],$userCarSpecs["power"]) - $this->CalculateAbilitiesValue($userAbilities);
    }

    public function CalculateET($weight,$power){
        if($weight != null && $power != null){
            $et_eq = $weight / $power;
            $et = 6.290 * pow($et_eq,1/3);
            return $et;
        }
        return 20;
    }

    public function CalculateAbilitiesValue($abilities){
        $sum = 0;
        foreach($abilities as $ability){
            $sum += $ability;
        }
        return $sum * 0.001;
    }
}
