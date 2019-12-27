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


Route::prefix('v1')->group(function () {
    Route::post('login', 'Api\AuthController@login');
    Route::post('adminLogin', 'Api\AuthController@AdminLogin');
    Route::post('register', 'Api\AuthController@register');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('getUser', 'Api\AuthController@getUser');
        Route::post('logout', 'Api\AuthController@logout');
        Route::post('addVechile', 'Api\GarageController@AddVechile');
        Route::post('addPart', 'Api\GarageController@AddPart');
        Route::post('addEngine', 'Api\GarageController@AddEngine');
        Route::post('addWheels', 'Api\GarageController@AddWheels');
        Route::post('addNos', 'Api\GarageController@AddNos');
        Route::post('addTurbo', 'Api\GarageController@AddTurbo');
        Route::post('addStop', 'Api\GarageController@AddStop');
        Route::post('addVechileToGarage', 'Api\GarageController@AddVechileToGarage');
        Route::post('addEngineToGarage', 'Api\GarageController@AddEngineToGarage');
        Route::post('addNosToGarage', 'Api\GarageController@AddNosToGarage');
        Route::post('addStopToGarage', 'Api\GarageController@AddStopToGarage');
        Route::post('addTurboToGarage', 'Api\GarageController@AddTurboToGarage');
        Route::post('changeCarInUse', 'Api\GarageController@ChangeCarInUse');
        Route::get('getAllVechiles/{user_id}','Api\GarageController@GetAllCars');
        Route::post('addEngineToVechile', 'Api\GarageController@AddEngineToVechile');
        Route::post('addWheelsToGarage', 'Api\GarageController@AddWheelsToGarage');
        Route::post('addWheelsToVechile', 'Api\GarageController@AddWheelsToVechile');
        Route::post('addNosToVechile', 'Api\GarageController@AddNosToVechile');
        Route::post('addStopToVechile', 'Api\GarageController@AddStopToVechile');
        Route::post('addTurboToVechile', 'Api\GarageController@AddTurboToVechile');
        Route::post('removeEngineFromVechile', 'Api\GarageController@RemoveEngineFromVechile');
        Route::post('removeWheelsFromVechile', 'Api\GarageController@RemoveWheelsFromVechile');
        Route::post('removeStopsFromVechile', 'Api\GarageController@RemoveStopsFromVechile');
        Route::post('removeTurboFromVechile', 'Api\GarageController@RemoveTurboFromVechile');
        Route::post('removeNosFromVechile', 'Api\GarageController@RemoveNosFromVechile');
        Route::get('getUserAbilities/{user_id}','Api\UserController@GetUserAbilities');
        Route::post('updateUserAbilities','Api\UserController@UpdateUserAbilities');
        Route::post('addPartToMarket','Api\MarketController@AddPartToMarket');
        Route::post('addMarket','Api\MarketController@AddMarket');
        Route::post('buyPartFromMarket','Api\MarketController@BuyPartFromMarket');
        Route::post('cancelSellingPart','Api\MarketController@CancelSellingPart');
        Route::post('createClub','Api\ClubController@CreateClub');
        Route::post('addUserToClub','Api\ClubController@AddUserToClub');
        Route::post('leaveClub','Api\ClubController@LeaveClub');
        Route::post('destroyClub','Api\ClubController@DestroyClub');
        Route::post('sendMessage','Api\MessagesController@SendMessage');
        Route::post('getMessages','Api\MessagesController@GetMessages');
        Route::post('doRaceAction','Api\RacesController@DoRaceAction');
        Route::get('searchOpponent/{user_id}','Api\RacesController@SearchOpponent');
    });
});