<?php
namespace App\Repositories;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class AuthRepository implements AuthRepositoryInterface
{
    public $successStatus = 200;

    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('AppName')->accessToken;
            return response()->json(['success' => $success], $this->successStatus);
         } else{
            return response()->json(['error'=>'Unauthorised'], 401);
         }
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(),
            [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'c_password' => 'required|same:password',
                'username' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $user = new User();
        $success['token'] = $user->createUser($request);
        return response()->json(['success'=>$success], $this->successStatus);
    }

    public function logout(Request $request){
        $request->user()->token()->revoke();
        return response()->json(['success' => 'User logged out']);
    }

    public function getUser() {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }
}