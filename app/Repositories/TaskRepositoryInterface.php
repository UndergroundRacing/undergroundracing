<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface TaskRepositoryInterface
{
    public function AddTask(Request $request);

    public function GetRewards(Request $request);

    public function GetTaskByUserId($user_id);
}