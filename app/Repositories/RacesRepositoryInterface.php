<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface RacesRepositoryInterface
{
    public function DoRaceAction(Request $request);

    public function SearchOponent($id);

    public function GetLastRace($user_id);
}