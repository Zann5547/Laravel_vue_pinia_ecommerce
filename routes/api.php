<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('user', [AuthController::class, 'getUser']);
    Route::apiResource('product', ProductController::class);

    Route::post('logout', [AuthController::class,'logout']);
});

Route::post('login', [AuthController::class,'login']);
