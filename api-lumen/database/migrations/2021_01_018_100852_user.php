<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class User extends Migration{

    public function up(){
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email');
            $table->string('password');
            $table->string('level');
            $table->string('api_token');
            $table->integer('status');
            $table->string('relasi');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('user');
    }
}
