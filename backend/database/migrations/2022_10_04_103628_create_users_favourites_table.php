<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('users_favorites', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->references('id')->on('users');
            $table->foreignId('favours_user_id')->constrained()->references('id')->on('users');
        });
    }

    public function down() {
        Schema::dropIfExists('users_favorites');
    }
};
