<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface MessagesRepositoryInterface
{
    public function SendMessage(Request $request);

    public function GetMessages(Request $request);

    public function RemoveMessages(Request $request);

    public function GetUserContacts($user_id);
}