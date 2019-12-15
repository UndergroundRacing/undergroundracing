<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTurbosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('turbos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('level');
            $table->double('ac_time');
            $table->bigInteger('part_id')->unsigned();
            $table->foreign('part_id')->references('id')->on('parts');
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
        Schema::dropIfExists('turbos');
    }
}
