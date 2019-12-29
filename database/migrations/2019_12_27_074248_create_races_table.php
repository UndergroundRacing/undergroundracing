<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('races', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('prize');
            $table->Integer('experience');
            $table->bigInteger('first_racer')->unsigned();
            $table->bigInteger('second_racer')->unsigned();
            $table->bigInteger('winner_id')->unsigned();
            $table->foreign('first_racer')->references('id')->on('users');
            $table->foreign('second_racer')->references('id')->on('users');
            $table->foreign('winner_id')->references('id')->on('users');
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
        Schema::dropIfExists('races');
    }
}
