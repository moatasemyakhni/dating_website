<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingContr;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicController;

Route::group(['prefix' => 'auth'], function () {

    Route::post('register', [AuthController::class, 'register']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('edit', [AuthController::class, 'update']);

    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    Route::post('interests', [LandingContr::class, 'addToInterest']);
    Route::post('block', [LandingContr::class, 'insertBlock']);

    Route::get('user_interest_list', [LandingContr::class, 'displayInterest']);
    Route::get('users', [LandingContr::class, 'getUsers']);
    Route::get('get_blocked', [LandingContr::class, 'getBlock']);
    Route::post('remove_block', [LandingContr::class], 'removeBlock');
});

    


Route::get('get_countries_and_cities', [PublicController::class, 'getCountriesAndCities']);
Route::get('get_countries', [PublicController::class, 'getCountries']);
Route::post('check_email', [PublicController::class, 'checkEmail']);




