<?php

use App\Http\Controllers\Configuration\MenuController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('configuration')->name('configuration.')->group(function () {
        Route::resource('menu', MenuController::class)->except(['create', 'show', 'edit']);
    });
});

require __DIR__ . '/settings.php';
