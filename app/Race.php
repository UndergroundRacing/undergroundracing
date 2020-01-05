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
    private $parts;
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->user = new User();
        $this->garage = new Garage();
        $this->vehicle = new Garage_Vechile();
        $this->task = new Tasks();
        $this->parts = new Parts();
    }

    /**
     * Creating race table in database
     * @param $request
     * @return mixed
     */
    public function CreateRace($request){
        $secondRacer = $this->SearchOponent($request["first_racer"]);
        $winner = $this->DoRaceAction($request['first_racer'],$secondRacer["user"]["id"]);
        if($winner['winnerId'] === $request['first_racer']){
            $prize = $this->CalculatePrize($winner['winnerId']);
            if($this->task->GetUserInProgressTask($request["first_racer"]) != null){
               $this->task->AddRaceToTask($request['first_racer']);
            }
            $user_obj = $this->user->GetUser($request['first_racer']);
            $this->user->CheckForLevelUp($user_obj);
            $status = 1;
        }
        else{
            $prize = [
              'prize' => 0,
              'experience' => 0
            ];
            $status= 0;
        }

        $input = [
          'first_racer' => $request['first_racer'],
            'second_racer' => $secondRacer["user"]["id"],
            'winner_id' => $winner['winnerId'],
            'prize' => $prize['prize'],
            'experience' => $prize['experience']
        ];

        $race = Race::create($input);


        return $this->GenerateResponse($race,$winner,$status);
    }

    /**
     * Generate race response
     * @param $race
     * @param $times
     * @param $status
     * @return array
     */
    public function GenerateResponse($race,$times,$status){
        $firstRacerSpecifications = $this->GetCarSpecificationsAndCarInUseByUserId($race->first_racer);
        $secondRacerSpecification = $this->GetCarSpecificationsAndCarInUseByUserId($race->second_racer);
        $opponent = $this->user->GetUser($race->second_racer);
        $response=[
            'status' => $status,
            'race' => $race,
            'times' => [
                'firstRacer' => $times['firstRacerTime'],
                'secondRacer' => $times['secondRacerTime']
            ],
            'specifications' => [
                'firstRacerSpecifications' =>$firstRacerSpecifications['carSpecs'],
                'secondRacerSpecifications' => $secondRacerSpecification['carSpecs']
            ],
            'car_in_use' => [
                'firstRacer' => $firstRacerSpecifications['carInUse'],
                'secondRacer' => $secondRacerSpecification['carInUse']
            ],
            'opponent_info' => $opponent
        ];


        return $response;
    }


    /**
     * Get user last race
     * @param $user_id
     * @return mixed
     */
    public function GetLastRace($user_id){
        return Race::where('first_racer',$user_id)->get()->last();
    }

    /**
     * Search opponent for user
     * @param $id
     * @return mixed
     */
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

    /**
     * Calculating prize for winner
     * @param $user_id
     * @return array
     */
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

    /**
     * Doing race action and getting race statistics
     * @param $firstRacer
     * @param $secondRacer
     * @return array
     */
    public function DoRaceAction($firstRacer,$secondRacer){
        $firsUserCalculation = $this->CalculateUserTimesWrapper($firstRacer);
        $secondUserCalculation = $this->CalculateUserTimesWrapper($secondRacer);
        if($firsUserCalculation <= $secondUserCalculation){
            $winnerId = $firstRacer;
        }
        else $winnerId = $secondRacer;

        return [
            'winnerId' => $winnerId,
            'firstRacerTime' => $firsUserCalculation,
            'secondRacerTime' => $secondUserCalculation
        ];
    }

    /**
     * Returning user car specification and car in use
     * @param $user_id
     * @return array
     */
    public function GetCarSpecificationsAndCarInUseByUserId($user_id){
        $userGarage = $this->garage->GetGarageByUserId($user_id);
        $userCarSpecs = $this->vehicle->GetUserVechileSpecs($userGarage->car_in_use_id);
        $req=[
            'garage_part_id'=>$userGarage->car_in_use_id,
            'part_type'=>6
        ];
        $userCarDetails = $this->parts->GetPartSpecificationInGarage($req);
        return [
            'carSpecs' => $userCarSpecs,
            'carInUse' => $userCarDetails,
        ];
    }

    /**
     * Method for getting user racing information and calculating user time
     * @param $user_id
     * @return user time
     */
    public function CalculateUserTimesWrapper($user_id){
        $userAbilities = $this->user->getAbilities($user_id);
        $userGarage = $this->garage->GetGarageByUserId($user_id);
        $userCarSpecs = $this->vehicle->GetUserVechileSpecs($userGarage->car_in_use_id);
        return $this->CalculateUserTime($userCarSpecs,$userAbilities);
    }

    /**
     * user total time including his abilities value and ET
     * @param $userCarSpecs
     * @param $userAbilities
     * @return time
     */
    public function CalculateUserTime($userCarSpecs,$userAbilities){
        return $this->CalculateET($userCarSpecs["weight"],$userCarSpecs["power"]) - $this->CalculateAbilitiesValue($userAbilities);
    }

    /**
     * Calculating user time
     * @param $weight
     * @param $power
     * @return float|int
     */
    public function CalculateET($weight,$power){
        if($weight != null && $power != null){
            $et_eq = $weight / $power;
            $et = 6.290 * pow($et_eq,1/3);
            return $et;
        }
        return 20;
    }

    /**
     * Calculating user abilities value for time
     * @param $abilities
     * @return float
     */
    public function CalculateAbilitiesValue($abilities){
        $sum = 0;
        foreach($abilities as $ability){
            $sum += $ability;
        }
        return $sum * 0.001;
    }
}
