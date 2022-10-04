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
        $users = User::all()
                    ->where('id', '!=', $userID);
        
        // $users = User::whereHas('userFavorites', function($query) {
        //     $userID = Auth::user()->id;
        //     $query->where('user_id', "!=", $userID);
        // })->get();
        // $users = User::whereDoesntHave('userFavorites', function($query) use ($userID) {
        //     $query->where([
        //         ['user_id', $userID],
        //         ['favours_user_id', '!=', $userID],
        //     ]);
        // })->get();
        return $users;
    }

    function addToInterest(Request $req) {
        $user = Auth::user()->id;
        $users = User::find($user);
        $favours = $req->get('favour_user_id');
        $users->userFavorites()->attach($favours);
        return response()->json(['add' => true]);
    }

    function displayInterest(Request $req) {
        $uid = Auth::user()->id;
        $user = User::find($uid);
        $arr = [];
        foreach($user->userFavorites()->pluck('user_id', 'favours_user_id') as $key => $val) {
            $arr[$key] = $val;
        }
        //$count = $interestInWho->count();
        if(sizeof($arr) == 0) {
            return response()->json(['count' => 0]);
        }
        $users = [];
        foreach($arr as $key => $val) {
            $user = User::find($key);
            $users[] = $user;
        }
        return response()->json($users);

    }
}
