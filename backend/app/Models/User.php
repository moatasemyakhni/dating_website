<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    public function genders() {
        return $this->belongsToMany(Gender::class);
    }

    public function userFavorites() {
        return $this->belongsToMany(User::class, 'users_favorites', 'user_id', 'favours_user_id');
    }

    public function blockedList() {
        return $this->belongsToMany(User::class, 'users_blocks', 'blocker_id', 'blocked_id');
    }

    public function messages() {
        return $this->hasMany(Message::class, 'sender_id');
    }


    protected $fillable = [
        'gender_id',
        'full_name',
        'email',
        'password',
        'age',
        'location',
        'bio',
        'profile_picture',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
