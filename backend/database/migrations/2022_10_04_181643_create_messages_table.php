<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up() {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained()->references('id')->on('users');
            $table->foreignId('receiver_id')->constrained()->references('id')->on('users');
            $table->string('content');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('messages');
    }
};
