<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Configuration\AccessRoleController;
use App\Http\Controllers\Configuration\AccessUserController;
use App\Http\Controllers\Configuration\MenuController;
use App\Http\Controllers\Configuration\PermissionController;
use App\Http\Controllers\Configuration\RoleController;
use App\Http\Controllers\Configuration\UserController;
use App\Http\Controllers\Master\EmployeeController;
use App\Http\Controllers\Referencies\DepartmentController;
use App\Http\Controllers\Referencies\PositionsController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('configuration')->name('configuration.')->group(function () {
        Route::resource('menu', MenuController::class);
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);
        Route::resource('access-role', AccessRoleController::class)->except(['create', 'store', 'delete'])->parameters(['access-role' => 'role']);
        Route::resource('access-user', AccessUserController::class)->except(['create', 'store', 'delete'])->parameters(['access-user' => 'user']);
        Route::resource('users', UserController::class);
    });

    Route::prefix('referencies')->name('referencies.')->group(function () {
        Route::resource('positions', PositionsController::class);
        Route::resource('departments', DepartmentController::class);
    });

    Route::prefix('master')->name('master.')->group(function () {
        Route::resource('employees', EmployeeController::class);
    });

    Route::resource('attendances', AttendanceController::class);
});

require __DIR__ . '/settings.php';
