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
        $msg_sender =  Message::where(['sender_id' => $request['sender_id']])->where(['receiver_id' => $request['receiver_id']])->get();
        $msg_receiver =  Message::where(['sender_id' => $request['receiver_id']])->where(['receiver_id' => $request['sender_id']])->get();
        $return  = [

        ];
        $i = 0;
        foreach($msg_sender as $msg){
            $return[$i] = $msg;
            $i++;
        }
        foreach($msg_receiver as $msg){
            $return[$i] = $msg;
            $i++;
        }

        return $return;
    }

    public function GetUserMessagesContacts($user_id){
        $messages_sender = Message::where(['sender_id' =>$user_id])->get();
        $messages_receiver = Message::where(['receiver_id'=> $user_id])->get();
        $returnData = [];
        $i = 0;
        $ids=[];
        $user= new User();
        foreach($messages_sender as $message){
            if(!in_array($message["sender_id"],$ids) && $message["sender_id"] != $user_id){
                $ids[$i] = $message["sender_id"];
                $user_ob = $user->GetUser($message["sender_id"]);
                $returnData[$i] = [
                    "id" => $message["sender_id"],
                    "user_name" => $user_ob->username
                ];
                $i++;
            }
            if(!in_array($message["receiver_id"],$ids) && $message["receiver_id"] != $user_id){
                $ids[$i] = $message["receiver_id"];
                $user_ob = $user->GetUser($message["sender_id"]);
                $returnData[$i] = [
                    "id" => $message["receiver_id"],
                    "user_name" => $user_ob->username
                ];
                $i++;
            }
        }

        foreach($messages_receiver as $message){
            if(!in_array($message["sender_id"],$ids) && $message["sender_id"] != $user_id){
                $ids[$i] = $message["sender_id"];
                $user_ob = $user->GetUser($message["sender_id"]);
                $returnData[$i] = [
                    "id" => $message["sender_id"],
                    "user_name" => $user_ob->username
                ];
                $i++;
            }
            if(!in_array($message["receiver_id"],$ids)&& $message["receiver_id"] != $user_id){
                $ids[$i] = $message["receiver_id"];
                $user_ob = $user->GetUser($message["sender_id"]);
                $returnData[$i] = [
                    "id" => $message["receiver_id"],
                    "user_name" => $user_ob->username
                ];
                $i++;
            }
        }
        return $returnData;
    }
}