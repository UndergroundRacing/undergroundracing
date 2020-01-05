<?php
namespace App\Http\Controllers\Api;
use App\Repositories\AuthRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
class AuthController extends Controller
{
    /**
     * @var AuthRepository
     */
    private $authRepository;

    public function __construct(AuthRepositoryInterface $authRepository){

        $this->authRepository = $authRepository;
    }

    public function register(Request $request) {
        return $this->authRepository->register($request);
    }

    public function AdminRegister(Request $request) {
        return $this->authRepository->AdminRegister($request);
    }

    public function AdminLogin(){
        return $this->authRepository->AdminLogin();
    }

    public function login(){
        return $this->authRepository->login();
    }

    public function logout(Request $request){
        return $this->authRepository->logout($request);
    }

    public function getUser() {
        return $this->authRepository->getUser();
    }

    public function ChangePassword(Request $request){
        return $this->authRepository->ChangePassword($request);
    }

}