<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = [
        'required_races','status','races_count','user_id','prize_cash','prize_exp'
    ];
    private $user;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->user= new User();
    }

    public function AddTask($request){
        $races_count = rand(10,50);
        if($this->GetTaskInProgressOrEnded($request['user_id']) == null){
            $input = [
                'required_races' => $races_count,
                'status' => 1,
                'races_count' => 0,
                'prize_cash' => $this->CalculateCashPrize($request['user_id'],$races_count),
                'prize_exp' => $this->CalculateExpPrize($request['user_id'],$races_count),
                'user_id' => $request['user_id']
            ];
            return ['success' => Tasks::create($input)];
        }
        return ['error' => 'You already have task'];
    }

    public function CalculateCashPrize($user_id,$races_count){
        $user = $this->user->GetUser($user_id);
        if($user->level == 0){
            $prize = 10 * $races_count;
            return $prize;
        }
        $prize = 10 * $user->level * $races_count;
        return $prize;
    }

    public function CalculateExpPrize($user_id,$races_count){
        $user = $this->user->GetUser($user_id);
        if($user->level == 0){
            $prize =  $races_count;
            return $prize;
        }
        $prize = $user->level * $races_count;
        return $prize;
    }

    public function GetUserInProgressTask($user_id){
        return Tasks::where('user_id',$user_id)->where('status',1)->get()->first();
    }

    public function GetEndedTask($user_id){
        return Tasks::where('user_id',$user_id)->where('status',2)->get()->first();
    }

    public function GetTask($task_id){
        return Tasks::find($task_id);
    }

    public function GetTaskInProgressOrEnded($user_id){
        $task_in_progress = $this->GetUserInProgressTask($user_id);
        if($task_in_progress != null){
            return $task_in_progress;
        }
        else{
            $task_ended = $this->GetEndedTask($user_id);
            if($task_ended != null){
                return $task_ended;
            }
            else{
                return null;
            }
        }
    }

    public function GetRewards($request){
        $task = $this->GetTask($request['task_id']);

        if($task != null && $task->user_id == $request['user_id']){
            if($task->status == 2){
                $user = $this->user->GetUser($request['user_id']);
                $user->cash += $task->prize_cash;
                $user->experience += $task->prize_exp;
                $user->save();
                $task->status = 3;
                $task->save();

                return ['success' => $task];
            }
            else return ['error' => 'Task not ended!'];
        }
    }


    public function AddRaceToTask($user_id){
        $task = $this->GetUserInProgressTask($user_id);
        if($task != null){
            if($task["required_races"] > $task["races_count"]){
                $count = $task["races_count"] + 1;
                $task->update(['races_count' => $count]);
            }
            else{
                $task->update(['status' => 2]);
            }
        }
    }
}
