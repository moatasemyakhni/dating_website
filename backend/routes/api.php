<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingContr;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicController;

Route::group(['prefix' => 'auth'], function () {

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
    Route::get('users', [LandingContr::class, 'getUsers']);
    
});

    


Route::get('get_countries_and_cities', [PublicController::class, 'getCountriesAndCities']);
Route::get('get_countries', [PublicController::class, 'getCountries']);
Route::post('check_email', [PublicController::class, 'checkEmail']);




