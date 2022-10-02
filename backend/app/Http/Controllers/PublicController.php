<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PublicController extends Controller
{
    //
    function getCountriesAndCities() {
        $info = json_decode(file_get_contents(public_path() . "country.cities.list.json"));
        return response()->json($info);
    }
}
