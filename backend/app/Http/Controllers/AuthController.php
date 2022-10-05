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
            $photo = "http://localhost/9-sefactory/dating_web/dating_website/backend/storage/app/images/default.png";
        }else {
            $data = explode(',', $photo);// to get the ext
            $ext = explode(';', explode('/', $data[0])[1])[0];
            $user = "user" . request()-> get('full_name') . "_" . time(); //unique it
            //$path = ;
            // to avoid local absolute path problem.
            $path = "http://localhost/9-sefactory/dating_web/dating_website/backend/storage/app/images/";
            $completeUrl = $path . $user . "." . $ext;
            $completeUrl2 = storage_path('/app/images/') . $user . "." . $ext;
            //Actually saving the photo in the previous path
            file_put_contents($completeUrl2, file_get_contents($photo));
            $photo = $completeUrl;
        }
        $bio = request()-> get('bio');
        if(is_null($bio) || $bio == "" || !$bio) {
            $bio = "Match User";
        }
        $user = User::create([
            'gender_id' => request()->get('gender_id'),
            'full_name' => request()-> get('full_name'),
            'email' => request()-> get('email'),
            'password' => bcrypt(request()-> get('password')),
            'age' => request()-> get('age'),
            'location' => request()-> get('location'),
            'bio' => $bio,
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

    public function update(Request $req) {
        $validator = validator()->make(request()->all(), [
            'gender_id' => 'numeric|required',
            'full_name' => "string|required",
            "age" => "numeric|required|min:18",
            "bio" => "nullable",
            "profile_picture" => "nullable",
            "interested" => "required",
        ]);

        if($validator->fails()) {
            return response()->json([
                "message" => 'Register failed',
            ]);
        }
        $uid = Auth::user()->id;
        $user = User::find($uid);
        $photo = $req->get('profile_picture');
        if(is_null($photo) || !$photo || $photo == 'null') {
            // do nothing
            ;
        }else {
            $data = explode(',', $photo);// to get the ext
            $ext = explode(';', explode('/', $data[0])[1])[0];
            $userLabel = "user" . $req-> get('full_name') . "_" . time(); //unique it
            //$path = ;
            // to avoid local absolute path problem.
            $path = "http://localhost/9-sefactory/dating_web/dating_website/backend/storage/app/images/";
            $completeUrl = $path . $userLabel . "." . $ext;
            $completeUrl2 = storage_path('/app/images/') . $userLabel . "." . $ext;
            //Actually saving the photo in the previous path
            file_put_contents($completeUrl2, file_get_contents($photo));
            $photo = $completeUrl;
            $user->profile_picture = $photo;
        }
        $bio = $req->get('bio');
        if(is_null($bio) || $bio == "" || !$bio || $bio="Match User") {
            $bio = "Match User";
        }
       
        $user->gender_id = $req->get('gender_id');
        $user->full_name = $req-> get('full_name');
        $user->age = $req-> get('age');
        $user->bio = $bio;
        // delete old values before insert in pivot table
        $user->genders()->detach();
        foreach(str_split($req->get('interested')) as $value) {
            $user->genders()->attach(intval($value));
        }

        $user->update();
        return response()->json([
            'message' => 'User Created',
            'user' => $user,
        ]);
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
}
