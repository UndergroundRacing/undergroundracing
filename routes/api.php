<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('v1')->group(function(){
    Route::post('login', 'Api\AuthController@login');
    Route::post('register', 'Api\AuthController@register');
    Route::group(['middleware' => 'auth:api'], function(){
        Route::post('getUser', 'Api\AuthController@getUser');
        Route::post('logout','Api\AuthController@logout');
        Route::post('addVechile','Api\GarageController@AddVechile');
        Route::post('addPart','Api\GarageController@AddPart');
        Route::post('addEngine','Api\GarageController@AddEngine');
        Route::post('addWheels','Api\GarageController@AddWheels');
        Route::post('addNos','Api\GarageController@AddNos');
        Route::post('addTurbo','Api\GarageController@AddTurbo');
        Route::post('addStop','Api\GarageController@AddStop');
        Route::post('addVechileToGarage','Api\GarageController@AddVechileToGarage');
        Route::post('addEngineToGarage','Api\GarageController@AddEngineToGarage');
        Route::post('addNosToGarage','Api\GarageController@AddNosToGarage');
        Route::post('addStopToGarage','Api\GarageController@AddStopToGarage');
        Route::post('addTurboToGarage','Api\GarageController@AddTurboToGarage');
    });
});