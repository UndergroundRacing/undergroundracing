<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGarageTurbosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('garage__turbos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('garage_id')->unsigned();
            $table->bigInteger('turbo_id')->unsigned();
            $table->foreign('garage_id')->references('id')->on('garages');
            $table->foreign('turbo_id')->references('id')->on('turbos');
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
        Schema::dropIfExists('garage__turbos');
    }
}
