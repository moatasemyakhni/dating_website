<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function register() {
        // validation
        $validator = validator()->make(request()->all(), [
            'gender_id' => 'numeric|required',
            'full_name' => "string|required",
            "email" => "email|required",
            "password" => "string|min:6|max:999",
            "age" => "numeric|required|min:18",
            "location" => "string|required",
            "bio" => "nullable",
            "profile_picture" => "string|nullable",
            "interested" => "required",
        ]);

        if($validator->fails()) {
            return response()->json([
                "message" => 'Register failed',
            ]);
        }
        $photo = request()->get('profile_picture');
        if(is_null($photo)) {
            $photo = storage_path('/app/images/default.png');
        }else {
            $data = explode(',', $photo);// to get the ext
            $ext = explode(';', explode('/', $data[0])[1])[0];
            $user = "user" . request()-> get('full_name') . "_" . time(); //unique it
            $path = storage_path('/app/images/');
            $completeUrl = $path . $user . "." . $ext;
            //Actually saving the photo in the previous path
            file_put_contents($completeUrl, file_get_contents($photo));
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

        if ($token = JWTAuth::attempt(['email' => request()->get('email'), 'password' => request()->get('password')])) {
            $tok = $this->respondWithToken($token);
        }

        return response()->json([
            'message' => 'User Created',
            'user' => $user,
            'token' => $tok,
        ]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
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

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        // $this->guard()->JWTAuth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        // return $this->respondWithToken($this->guard()->refresh());
        return $this->respondWithToken($this->guard()->JWTAuth::refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl'),
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
