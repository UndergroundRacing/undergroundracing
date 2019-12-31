<?php
namespace App\Repositories;

use App\Garage_Vechile;
use App\Race;
use App\Tasks;
use App\User;
use App\Garage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class TaskRepository implements TaskRepositoryInterface
{
    private $successStatus = 200;
    private $tasks;
    public function __construct()
    {
        $this->tasks = new Tasks();
    }

    public function AddTask(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        return response()->json($this->tasks->AddTask($request),$this->successStatus);
    }

    public function GetRewards(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'user_id' => 'required',
                'task_id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        return response()->json($this->tasks->GetRewards($request),$this->successStatus);
    }

    public function GetTaskByUserId($user_id){
        $task = $this->tasks->GetTaskInProgressOrEnded($user_id);
        if($task !=null){
            return response()->json(['success' => $task],$this->successStatus);
        }

        return response()->json(['error' => 'User has no tasks.'],401);
    }

}