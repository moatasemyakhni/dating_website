<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            //$table->integer('gender_id');
            //$table->foreign('gender_id')->references('gender_id')->on('genders');
            $table->string('full_name', 45);
            $table->string('email', 255)->unique();
            $table->string('password');
            $table->integer('age');
            $table->string('location', 255);
            $table->string('bio', 255);
            $table->string('profile_picture', 255);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
