<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface ClubRepositoryInterface
{
    public function AddClub(Request $request);

    public function AddUserToClub(Request $request);

    public function LeaveClub(Request $request);

    public function DestroyClub(Request $request);

    public function RegisterToTournament(Request $request);

    public function InviteToClub(Request $request);

    public function GetClub($user_id);

    public function GetUserClubInvitations($user_id);
}