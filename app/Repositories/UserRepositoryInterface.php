<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface UserRepositoryInterface
{
    /**
     * @param $userId
     * @return mixed
     */
    public function GetUserAbilities($userId);

    /**
     * @param Request $request - user id and action id
     * 1 - add acceleration
     * 2 - add shifting
     * 3 - add reaction
     * 4 - add mobility
     * @return mixed
     */
    public function UpdateUserAbility(Request $request);
}