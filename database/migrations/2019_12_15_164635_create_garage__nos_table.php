<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGarageNosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('garage__nos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('in_use');
            $table->bigInteger('garage_id')->unsigned();
            $table->bigInteger('nos_id')->unsigned();
            $table->foreign('garage_id')->references('id')->on('garages');
            $table->foreign('nos_id')->references('id')->on('nos');
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
        Schema::dropIfExists('garage__nos');
    }
}
