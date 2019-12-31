<?php
namespace App\Http\Controllers\Api;
use App\Repositories\MessagesRepositoryInterface;
use App\Repositories\TaskRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Validator;
class TaskController extends Controller
{
    private $taskRepository;

    public function __construct(TaskRepositoryInterface $taskRepository){
        $this->taskRepository = $taskRepository;
    }

    public function AddTask(Request $request){
        return $this->taskRepository->AddTask($request);
    }
    public function GetRewards(Request $request){
        return $this->taskRepository->GetRewards($request);
    }

    public function GetTaskByUserId($user_id){
        return $this->taskRepository->GetTaskByUserId($user_id);
    }

}