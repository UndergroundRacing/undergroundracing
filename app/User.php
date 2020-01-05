<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Http\Request;
class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'username', 'level', 'experience', 'cups', 'abilities', 'cash', 'credits', 'role', 'next_level_exp', 'club_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * register action
     * @param Request $request
     * @return mixed
     */
    public function createUser(Request $request)
    {

        $abilities = [
            'acceleration' => 1,
            'shifting' => 1,
            'reaction' => 1,
            'mobility' => 1,
        ];

        $input = [
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => $request->get('password'),
            'username' => $request->get('username'),
            'level' => 1,
            'experience' => 0,
            'cash' => 0,
            'credits' => 0,
            'next_level_exp' => $this->NextLevelExp(1,2),
            'cups' => 0,
            'abilities' => serialize($abilities),
            'role' => 1,
            'club_id' => null
        ];

        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        return $user;
    }

    public function createAdminUser(Request $request)
    {

        $abilities = [
            'acceleration' => 1,
            'shifting' => 1,
            'reaction' => 1,
            'mobility' => 1,
        ];

        $input = [
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => $request->get('password'),
            'username' => $request->get('username'),
            'level' => 0,
            'next_level_exp' => 0,
            'experience' => 0,
            'cash' => 0,
            'credits' => 0,
            'cups' => 0,
            'abilities' => serialize($abilities),
            'role' => 2,
            'club_id' => null
        ];

        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        return $user;
    }

    /**
     * @param $userId
     * @return int|mixed
     */
    public function getAbilities($userId)
    {
        $user = User::find($userId);
        if ($user != null) {
            return unserialize($user->abilities);
        }
        return -1;
    }

    public function GetUser($id)
    {
        return User::find($id);
    }

    /**
     * @param $request
     */
    public function updateAbilities($request)
    {
        switch ($request['action']) {
            case 1:
                return $this->AddUserAbility($request['userId'],'acceleration');
                break;
            case 2:
                return $this->AddUserAbility($request['userId'],'shifting');
                break;
            case 3:
                return $this->AddUserAbility($request['userId'],'reaction');
                break;
            case 4:
                return $this->AddUserAbility($request['userId'],'mobility');
                break;
            default:
                return 'null';
                break;
        }
    }

    /**
     * @param $userId
     * @param $ability
     * @return float|int
     */
    private function AddUserAbility($userId,$ability)
    {
        $user = $this->GetUser($userId);
        $abilities = unserialize($user->abilities);
        $money_needed = 1024 + (1024 * $abilities[$ability]);
        if($this->CheckIfUserHasEnoughMoney($userId,$money_needed)){
            $abilities[$ability] += 1;
            $user->abilities = serialize($abilities);
            $user->save();
            $this->MinusUserCash($userId,$money_needed);
            return $user;
        }
        return $money_needed;
    }



    /**
     * @param $userId
     * @param $money_needed
     * @return bool
     */
    public function CheckIfUserHasEnoughMoney($userId,$money_needed){
        $user = $this->GetUser($userId);
        if($user->cash >= $money_needed){
            return true;
        }
        return false;
    }

    /**
     * @param $userId
     * @param $cash
     * @return mixed
     */
    public function AddCashForUser($userId,$cash){
        $user = $this->getUser($userId);
        $user->cash += $cash;
        $user->save();
        return $user;
    }

    /**
     * @param $userId
     * @param $cash
     * @return int
     */
    public function MinusUserCash($userId,$cash){
        if($this->CheckIfUserHasEnoughMoney($userId,$cash)){
            $user = $this->getUser($userId);
            $user->cash -= $cash;
            $user->save();
            return $user;
        }
        return -1;
    }

    public function NextLevelExp($cur_level,$level){
        return ((200 * pow($level,2)) - (200 * $level)) + ((200 * pow($cur_level,2)) - (200 * $cur_level));
    }

    public function CheckForLevelUp($user){
        if($user->experience >= $user->next_level_exp){
            return $this->LevelUp($user);
        }
    }

    public function LevelUp($user){
        if($user != null){
            $user->level += 1;
            $nextLevel = $user->level + 1;
            $user->next_level_exp = $this->NextLevelExp($user->level,$nextLevel);
            $user->save();
            return $user;
        }
    }
}