<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGarageWheelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('garage__wheels', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('in_use');
            $table->bigInteger('garage_id')->unsigned();
            $table->bigInteger('wheels_id')->unsigned();
            $table->foreign('garage_id')->references('id')->on('garages');
            $table->foreign('wheels_id')->references('id')->on('wheels');
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
        Schema::dropIfExists('garage__wheels');
    }
}
