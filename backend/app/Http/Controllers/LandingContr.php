<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LandingContr extends Controller {
    function getUsers(Request $req) {
        // $user = Auth::user();
        // $users = User::all('location');
        // $usersArr = [];
        // foreach($users as $user) {
        //     $usersArr[] = $user;
        // }
        // return $usersArr[0]->location;
        $user = User::all();
        return $user;
    }
}
