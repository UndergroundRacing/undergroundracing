<?php
namespace App\Repositories;
use App\User;
use Illuminate\Http\Request;
use Validator;

class UserRepository implements UserRepositoryInterface
{
    public $successStatus = 200;
    private $user;

    public function __construct()
    {
        $this->user = new User();
    }

    /**
     * @param $userId
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function GetUserAbilities($userId)
    {
        if($userId == null){
            return response()->json(['error' => 'user id is required'],404);
        }
        return response()->json(['success' => $this->user->getAbilities($userId)],$this->successStatus);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function UpdateUserAbility(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'userId' => 'required',
                'action' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        return response()->json(['success' => $this->user->updateAbilities($request)],$this->successStatus);
    }

}