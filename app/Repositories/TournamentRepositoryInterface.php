<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface TournamentRepositoryInterface
{
    public function RegisterToTournament(Request $request);
}