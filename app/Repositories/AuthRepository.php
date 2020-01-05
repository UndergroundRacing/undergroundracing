<?php
namespace App\Repositories;
use App\Engine;
use App\Garage_Engine;
use App\Garage_Vechile;
use App\User;
use App\Garage;
use App\Vechile;
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
        $created_user = $user->createUser($request);
        $garage = new Garage();
        $vechile = new Vechile();
        $created_garage = $garage->createGarage($created_user->id);
        $garage_vechile = new Garage_Vechile();
        $garage_vechile_wrap = [
          'garage_id' => $created_garage->id,
          'vechile_id' =>$vechile->GetDefaultVechile()
        ];
        $created_garage_vechile =$garage_vechile->addVechileToGarage($garage_vechile_wrap);
        $garage_engin = new Garage_Engine();
        $engine = new Engine();
        $request_engine = [
          'garage_id' => $created_garage->id,
          'engine_id' => $engine->GetDefaultEngine()
        ];
        $created_engine = $garage_engin->AddEngineToGarage($request_engine);
        $request_add_engine_to_vechile =[
            'user_id' => $created_user->id,
            'garage_vechile_id' => $created_garage_vechile->id,
            'garage_engine_id' => $created_engine->id
            ];
        $garage->ChangeCarInUse($created_user->id,$created_garage_vechile->id);
        $garage_vechile->AddEngineForVechile($request_add_engine_to_vechile);
        $success['token'] = $created_user->createToken('AppName')->accessToken;
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

    public function AdminLogin()
    {
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            if($user->role === 2){
                $success['token'] =  $user->createToken('AppName')->accessToken;
                return response()->json(['success' => $success], $this->successStatus);
            }
            else{
                return response()->json(['error'=>'You are not admin user!'], 401);
            }
        } else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }

    public function AdminRegister(Request $request){
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
        $created_user = $user->createAdminUser($request);
        $success['token'] = $created_user->createToken('AppName')->accessToken;
        return response()->json(['success' => $success], $this->successStatus);
        return $created_user;
    }

    public function ChangePassword(Request $request){
        $validator = Validator::make($request->all(),
            [
                'email' => 'required|email',
                'password' => 'required',
                'n_password' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $user->password =bcrypt($request['n_password']);
            $user->save();
            $success['token'] = $user->createToken('AppName')->accessToken;
            return response()->json(['success' => $success], $this->successStatus);
        }
        else{
            return response()->json(['error' => 'Email or old password is incorect'], $this->successStatus);
        }
    }
}