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
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->user = new User();
        $this->garage = new Garage();
        $this->vehicle = new Garage_Vechile();
    }

    public function CreateRace($request){
        $winner = $this->DoRaceAction($request);
        if($winner === $request['first_racer']){
            $prize = $this->CalculatePrize($winner);
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

    public function SearchOponent($id){
        $user = $this->user->GetUser($id);
        $minLevel = $user->level - 7;
        $maxLevel = $user->level + 7;
        $users = User::where('level','>',$minLevel)
            ->where('level','<',$maxLevel)
            ->where('id','!=', $id)
            ->get();

        $offset = rand(0,count($users)-1);
        return $users[$offset];
    }

    public function CalculatePrize($user_id){
        $user = $this->user->GetUser($user_id);
        if($user->level > 0){
            $prize = (100 * $user->level) * 0.5;
            $exp = 10 * $user->level;
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
        $firstUserAbilities = $this->user->getAbilities($request['first_racer']);
        $firstUserGarage = $this->garage->GetGarageByUserId($request['first_racer']);
        $firstUserCarSpecs = $this->vehicle->GetUserVechileSpecs($firstUserGarage->car_in_use_id);
        $secondUserAbilities = $this->user->getAbilities($request['second_racer']);
        $secondUserGarage = $this->garage->GetGarageByUserId($request['second_racer']);
        $secondUserCarSpecs = $this->vehicle->GetUserVechileSpecs($secondUserGarage->car_in_use_id);
        $firsUserCalculation = $this->CalculateUserTime($firstUserCarSpecs,$firstUserAbilities);
        $secondUserCalculation = $this->CalculateUserTime($secondUserCarSpecs,$secondUserAbilities);
        if($firsUserCalculation <= $secondUserCalculation){
            return $request['first_racer'];
        }
        else{
            return $request['second_racer'];
        }
        return $secondUserCalculation;
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
