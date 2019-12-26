<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'sender_id', 'receiver_id', 'message'
    ];

    public function SendMessage($request)
    {
        $input = [
            'sender_id' => $request['sender_id'],
            'receiver_id' => $request['receiver_id'],
            'message' => $request['message']
        ];

        return Message::create($input);
    }

    public function GetMessages($request)
    {
        return Message::where(['sender_id' => $request['sender_id']])->where(['receiver_id' => $request['receiver_id']])->get();
    }
}