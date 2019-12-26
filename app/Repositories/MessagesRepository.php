<?php

namespace App\Repositories;

use App\Message;
use App\User;
use Illuminate\Http\Request;
use Validator;

class MessagesRepository implements MessagesRepositoryInterface
{
    public $successStatus = 200;
    private $user;
    private $messages;

    public function __construct()
    {
        $this->user = new User();
        $this->messages = new Message();
    }

    public function SendMessage(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'sender_id' => 'required',
                'receiver_id' => 'required',
                'message' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        return response()->json(['success' => $this->messages->SendMessage($request)],$this->successStatus);
    }

    public function GetMessages($request)
    {
        $validator = Validator::make($request->all(),
            [
                'sender_id' => 'required',
                'receiver_id' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        return response()->json(['success' => $this->messages->GetMessages($request)],$this->successStatus);
    }

    public function RemoveMessages(Request $request)
    {
        // TODO: Implement RemoveMessages() method.
    }
}