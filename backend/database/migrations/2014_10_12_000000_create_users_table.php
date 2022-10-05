<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('users', function (Blueprint $table) {
            $table->id('id');
            $table->string('full_name', 45);
            $table->string('email', 255)->unique();
            $table->string('password');
            $table->integer('age');
            $table->string('location', 255);
            $table->string('bio', 255)->nullable();
            $table->string('profile_picture', 255);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('users');
    }
};
