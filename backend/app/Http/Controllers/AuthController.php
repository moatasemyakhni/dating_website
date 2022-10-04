<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller {

    // I wrote it in the api.php but it did not work
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register() {
        $validator = validator()->make(request()->all(), [
            'gender_id' => 'numeric|required',
            'full_name' => "string|required",
            "email" => "email|required",
            "password" => "string|min:6|max:999",
            "age" => "numeric|required|min:18",
            "location" => "string|required",
            "bio" => "nullable",
            "profile_picture" => "nullable",
            "interested" => "required",
        ]);

        if($validator->fails()) {
            return response()->json([
                "message" => 'Register failed',
            ]);
        }
        $photo = request()->get('profile_picture');
        if(is_null($photo) || !$photo || $photo == 'null') {
            $photo = storage_path('/app/images/default.png');
        }else {
            $data = explode(',', $photo);// to get the ext
            $ext = explode(';', explode('/', $data[0])[1])[0];
            $user = "user" . request()-> get('full_name') . "_" . time(); //unique it
            $path = storage_path('/app/images/');
            $completeUrl = $path . $user . "." . $ext;
            //Actually saving the photo in the previous path
            file_put_contents($completeUrl, file_get_contents($photo));
            $photo = $completeUrl;
        }
        $user = User::create([
            'gender_id' => request()->get('gender_id'),
            'full_name' => request()-> get('full_name'),
            'email' => request()-> get('email'),
            'password' => bcrypt(request()-> get('password')),
            'age' => request()-> get('age'),
            'location' => request()-> get('location'),
            'bio' => request()-> get('bio'),
            'profile_picture' => $photo,
        ]);

        foreach(str_split(request()->get('interested')) as $value) {
            $user->genders()->attach(intval($value));
        }

        if ($token = JWTAuth::attempt(['email' => request()->get('email'), 'password' => request()->get('password')])) {
            $tok = $this->respondWithToken($token);
        }

        return response()->json([
            'message' => 'User Created',
            'user' => $user,
            'token' => $tok,
        ]);
    }

    public function login(Request $request) {
        $this->validate($request, [
            'email' => "string|required",
            'password' => "string|required",
        ]);
        $credentials = $request->only('email', 'password');
        if ($token = JWTAuth::attempt($credentials)) {
            return $this->respondWithToken($token);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function me(Request $req) {
        return response()->json(auth()->user());
    }

    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh() {
        return $this->respondWithToken($this->guard()->JWTAuth::refresh());
    }

    protected function respondWithToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl'),
            'error' => 'none',
        ]);
    }

    public function guard() {
        return Auth::guard();
    }

    function getUsers(Request $req) {
        // $user = Auth::user();
        // $users = User::all('location');
        // $usersArr = [];
        // foreach($users as $user) {
        //     $usersArr[] = $user;
        // }
        // return $usersArr[0]->location;
        $users = Auth::user();
        dd($users);
        $user = User::all();
        return $user;
    }
}
