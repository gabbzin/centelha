<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FamilyController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('gestao-sistema', function () {
        return Inertia::render('gestao-sistema');
    })->name('gestao-sistema');
});

Route::middleware(['auth'])->group(function () {
    Route::get('beneficios', function () {
        return Inertia::render('beneficios');
    })->name('beneficios');

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('family', [FamilyController::class, 'index'])->name('family');
Route::get('family/details/{id}', [FamilyController::class, 'show'])->name('family.info');
Route::get('family/register', function () {
    return Inertia::render('family/form/register');
})->name('family.register');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
