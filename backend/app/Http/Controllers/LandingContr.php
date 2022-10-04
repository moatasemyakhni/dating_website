<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LandingContr extends Controller {

    public function __construct() {
        $this->middleware('auth:api');
    }

    function getUsers(Request $req) {
        $userID = Auth::user()->id;
        $users = User::all()->where('id', '!=', $userID);
        return $users;
    }

    function addToInterest(Request $req) {
        
    }
}
