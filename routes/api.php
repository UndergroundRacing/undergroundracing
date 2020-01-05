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
    Route::post('changePassword', 'Api\AuthController@ChangePassword');
    Route::post('adminRegister', 'Api\AuthController@AdminRegister');
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
        Route::get('getClubByUserId/{user_id}','Api\ClubController@GetClubByUserId');
        Route::post('addUserToClub','Api\ClubController@AddUserToClub');
        Route::post('leaveClub','Api\ClubController@LeaveClub');
        Route::post('destroyClub','Api\ClubController@DestroyClub');
        Route::get('getClubInvitations/{user_id}','Api\ClubController@GetUserClubInvitations');
        Route::post('sendMessage','Api\MessagesController@SendMessage');
        Route::post('getMessages','Api\MessagesController@GetMessages');
        Route::get('getMessagesContacts/{user_id}','Api\MessagesController@GetUserContacts');
        Route::post('doRaceAction','Api\RacesController@DoRaceAction');
        Route::get('searchOpponent/{user_id}','Api\RacesController@SearchOpponent');
        Route::get('getLastRace/{user_id}','Api\RacesController@GetLastRace');
        Route::post('registerToTournament','Api\TournamentController@RegisterToTournament');
        Route::post('registerClubToTournament','Api\ClubController@RegisterClubToTournament');
        Route::get('checkIfUserRegisteredToTournament/{user_id}','Api\TournamentController@CheckIfUserIsRegistered');
        Route::post('getPartSpecificationById','Api\GarageController@GetPartSpecificationById');
        Route::get('getAllParts','Api\GarageController@GetAllParts');
        Route::get('getAllPartsByType/{part_type}','Api\GarageController@GetAllPartsByType');
        Route::post('getPartSpecificationInGarage','Api\GarageController@GetPartSpecificationInGarage');
        Route::post('getAllPartsInGarage','Api\GarageController@GetAllPartsInGarage');
        Route::get('getCarInUseId/{user_id}','Api\GarageController@GetCarInUseByUserId');
        Route::get('getCarAllSpecifications/{vech_id}','Api\GarageController@GetCarAllSpecifications');
        Route::post('buyFromSystemMarket','Api\MarketController@BuyFromSystemMarket');
        Route::post('addTask','Api\TaskController@AddTask');
        Route::post('getTaskReward','Api\TaskController@GetRewards');
        Route::post('inviteUserToClub','Api\ClubController@InviteToClub');
        Route::get('getTaskByUserId/{id}','Api\TaskController@GetTaskByUserId');
        Route::get('getUserReport/{id}','Api\ReportController@GetReportByUserId');
        Route::get('getTops','Api\TopController@GetTops');
    });
});