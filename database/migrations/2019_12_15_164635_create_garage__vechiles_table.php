<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGarageVechilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('garage__vechiles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('specification');
            $table->string('parts');
            $table->bigInteger('garage_id')->unsigned();
            $table->bigInteger('vechile_id')->unsigned();
            $table->foreign('garage_id')->references('id')->on('garages');
            $table->foreign('vechile_id')->references('id')->on('vechiles');
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
        Schema::dropIfExists('garage__vechiles');
    }
}
