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

        $sender_msgs = $this->GetOneCatMessages($msg_sender);
        $receiver_msgs = $this->GetOneCatMessages($msg_receiver);
        $return_array = $this->mergeAndSortArrays($sender_msgs,$receiver_msgs);
        $array = collect($return_array)->sortByDesc('created_at')->take(9)->reverse();
        return $array;
    }

    public function GetOneCatMessages($msg_sender){
        $return = [];
        $user = new User();
        $i = 0;
        foreach($msg_sender as $msg){
            $user_ob = $user->GetUser($msg["sender_id"]);
            $msg["sender_username"] = $user_ob->username;
            $return[$i] = $msg;
            $i++;
        }
        return $return;
    }

    public function GetUserMessagesContacts($user_id){
        $messages_sender = Message::where(['sender_id' =>$user_id])->get();
        $messages_receiver = Message::where(['receiver_id'=> $user_id])->get();
        $sender_array = $this->GetSenders($messages_sender);
        $receiver_array = $this->GetSenders($messages_receiver);

        return $this->mergeAndSortArrays($sender_array,$receiver_array);
    }

    public function GetSenders($messages_sender){
        $i = 0;
        $ids=[];
        $user= new User();
        $returnData = [];
        foreach($messages_sender as $message){
            $sender= false;
            $user_id = '';
            $received = false;
            if(!in_array($message["sender_id"],$ids) && $message["sender_id"] != $user_id){
                $sender = true;
                $user_id = $message["sender_id"];
            }
            if(!in_array($message["receiver_id"],$ids) && $message["receiver_id"] != $user_id){
                $received = true;
                $user_id =$message["receiver_id"];
            }

            if($sender  && $received ){
                $ids[$i] = $user_id;
                $user_ob = $user->GetUser($user_id);
                $returnData[$i] = [
                    "id" => $user_id,
                    "user_name" => $user_ob->username
                ];
                $i++;
            }
        }
        return $returnData;
    }

    public function mergeAndSortArrays($firstArray,$secondArray){
        $array_to_return = [];
        $i = 0;
        foreach($firstArray as $msg){
            $array_to_return[$i] = $msg;
            $i++;
        }

        foreach($secondArray as $msg){
            $array_to_return[$i] = $msg;
            $i++;
        }

        return $array_to_return;
    }
}