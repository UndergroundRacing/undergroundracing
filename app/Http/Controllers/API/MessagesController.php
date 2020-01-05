<?php
namespace App\Http\Controllers\Api;
use App\Repositories\MessagesRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
class MessagesController extends Controller
{
    private $messageRepository;

    public function __construct(MessagesRepositoryInterface $msgRepository){
        $this->messageRepository = $msgRepository;
    }

    public function SendMessage(Request $request){
        return $this->messageRepository->SendMessage($request);
    }

    public function GetMessages(Request $request){
        return $this->messageRepository->GetMessages($request);
    }

    public function GetUserContacts($user_id){
        return $this->messageRepository->GetUserContacts($user_id);
    }
}