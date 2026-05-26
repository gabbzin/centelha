<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('family', function () {
    return Inertia::render('family/family');
})->name('family');

Route::get('family/{id}', function ($id) {
    return Inertia::render('family/[id]/family-info', ['id' => $id]);
})->name('family.info');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
