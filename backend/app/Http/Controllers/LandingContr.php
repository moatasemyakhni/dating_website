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
        $favArr = [];
        $displayInterest = $this->displayInterest();
        foreach($displayInterest->original as $key => $val) {
            $favArr[] = $val->id;
        }
        $blockedArr = [];
        $displayBlocked = $this->getBlock();
        foreach($displayBlocked->original as $key => $val) {
            $blockedArr[] = $val->id;
        }
        // all users are displayed except fav and blocked users
        $users = User::all()
                    ->where('id', '!=', $userID)
                    ->whereNotIn('id', $favArr)
                    ->whereNotIn('id', $blockedArr);
        return $users;
    }

    function addToInterest(Request $req) {
        $user = Auth::user()->id;
        $users = User::find($user);
        $favours = $req->get('favour_user_id');
        $users->userFavorites()->attach($favours);
        return response()->json(['add' => true]);
    }

    function displayInterest() {
        $uid = Auth::user()->id;
        $user = User::find($uid);
        $arr = [];
        foreach($user->userFavorites()->pluck('user_id', 'favours_user_id') as $key => $val) {
            $arr[$key] = $val;
        }
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

    function insertBlock(Request $req) {
        $uid = Auth::user()->id;
        $user = User::find($uid);
        $blockedID = $req->get('blocked_id');
        $user->blockedList()->attach($blockedID);
        // delete from favorites
        $user->userFavorites()->detach($blockedID);
        return response()->json(['blocked' => true]);
    }

    function getBlock() {
        $uid = Auth::user()->id;
        $user = User::find($uid);
        $arr = [];
        foreach($user->blockedList()->pluck('blocker_id', 'blocked_id') as $key => $val) {
            $arr[$key] = $val;
        }
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

    function removeBlock(Request $req) {
        $uid = Auth::user()->id;
        $user = User::find($uid);
        $blockedID = $req->get('blocked_id');
        $user->blockedList()->detach($blockedID);
        return response()->json(['unblocked' => true]);
    }
}
