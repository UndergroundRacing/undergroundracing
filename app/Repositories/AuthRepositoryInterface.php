<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface AuthRepositoryInterface
{
    public function login();

    public function register(Request $request);

    public function logout(Request $request);

    public function getUser();

    public function AdminLogin();

    public function AdminRegister(Request $request);

    public function ChangePassword(Request $request);
}