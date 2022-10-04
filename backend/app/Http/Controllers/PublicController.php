<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PublicController extends Controller {
    function getCountriesAndCities() {
        $info = json_decode(file_get_contents(public_path("country.cities.list.json") ));
        return response()->json($info);
    }

    function getCountries() {
        $info = json_decode(file_get_contents(public_path("country.names.json") ));
        return response()->json($info);
    }

    function checkEmail(Request $req) {
        $userEmail = User::where('email', $req->email)->count();
        if($userEmail === 0) {
            return json_encode(['available' => true]);
        }
        return json_encode(['available' => false]);

    }
}
