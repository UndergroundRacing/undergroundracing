<?php
namespace App\Http\Controllers\Api;
use App\Repositories\AuthRepositoryInterface;
use App\Repositories\ClubRepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
class ClubController extends Controller
{
    private $clubRepository;

    public function __construct(ClubRepositoryInterface $clubRepository){
        $this->clubRepository = $clubRepository;
    }

    public function CreateClub(Request $request){
       return $this->clubRepository->AddClub($request);
    }

    public function AddUserToClub(Request $request){
        return $this->clubRepository->AddUserToClub($request);
    }

    public function LeaveClub(Request $request){
        return $this->clubRepository->LeaveClub($request);
    }

    public function DestroyClub(Request $request){
        return $this->clubRepository->DestroyClub($request);
    }

    public function RegisterClubToTournament(Request $request){
        return $this->clubRepository->RegisterToTournament($request);
    }

    public function InviteToClub(Request $request){
        return $this->clubRepository->InviteToClub($request);
    }

    public function GetClubByUserId($user_id){
        return $this->clubRepository->GetClub($user_id);
    }

    public function GetUserClubInvitations($user_id){
        return $this->clubRepository->GetUserClubInvitations($user_id);
    }
}