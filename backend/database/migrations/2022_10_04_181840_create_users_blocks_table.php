<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('users_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blocked_id')->constrained()->references('id')->on('users');
            $table->foreignId('blocked_id')->constrained()->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('users_blocks');
    }
};
