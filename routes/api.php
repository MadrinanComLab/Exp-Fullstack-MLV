<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;

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

// THIS IS THE DEFAULT FROM LARAVEL
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// THIS IS THE MODIFIED ONE WHEN WE CREATED LOGOUT FUNCTION IN AuthController.php
// THIS IS CREATED INSTEAD OF COPY PASTING THE DEFAULT ONE FOR OTHER REQUEST
Route::middleware('auth:sanctum')->group(function() {
    Route::get("/user", function(Request $request){
        return $request->user();
    });
    Route::post("/logout", [AuthController::class, "logout"]);

    // WE USE Route::resource() BECAUSE WE HAVE THE CRUD OPERATION IN SurveyController::class
    Route::resource("/survey", \App\Http\Controllers\SurveyController::class);
});

Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
