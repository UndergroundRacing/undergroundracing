<?php
namespace App\Http\Controllers\Api;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends Controller
{
    private $userRepository;

    public function __construct(UserRepositoryInterface $repository)
    {
        $this->userRepository = $repository;
    }

    /**
     * @param $userId
     * @return mixed
     */
    public function GetUserAbilities($userId){
        return $this->userRepository->GetUserAbilities($userId);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function UpdateUserAbilities(Request $request){
        return $this->userRepository->UpdateUserAbility($request);
    }
}