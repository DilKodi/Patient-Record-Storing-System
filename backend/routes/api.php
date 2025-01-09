<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\PatientController;

use Pusher\Pusher;


//test pusher
Route::get('/test-pusher', function () {
    try {
        $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true,
            ]
        );

        $response = $pusher->trigger('doctors', 'test-event', ['message' => 'Hello Pusher!']);
        Log::info('Pusher response:', ['response' => $response]);

        return response()->json(['success' => $response]);
    } catch (\Exception $e) {
        Log::error('Pusher error:', ['error' => $e->getMessage()]);
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Public routes
//User Registration
Route::post('signup', [AuthController::class,'signup']);

//User Login
Route::post('login', [AuthController::class,'login']);


// Protected routes
Route::middleware(['auth:sanctum'])->group(function(){

    // Logout
    Route::post('logout', [AuthController::class, 'logout']);
    
    // Patient management routes
    //Add Patient(ok)
    Route::post('add-patient', [PatientController::class, 'addPatient']);

    //Update Patient
    Route::put('update-patient/{id}', [PatientController::class, 'updatePatient']);

    //Delete Patient
    Route::delete('delete-patient/{id}', [PatientController::class, 'deletePatient']);

    //Get all Patients
    Route::get('patients', [PatientController::class, 'getPatients']);

    //Get single Patient
    Route::get('patient/{id}', [PatientController::class, 'getPatient']);
});

