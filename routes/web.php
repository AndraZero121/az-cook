<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('welcome');
})->name('home');
Route::get('/recipe', function () {
  return Inertia::render('recipe');
})->name('recipe');
Route::get('/recipe/{slug}', function ($slug) {
  return Inertia::render('recipe-read', [
    'recipeSlug' => $slug,
  ]);
});

// ERROR 404 PAGE
Route::fallback(function () {
  return Inertia::render('_404')->toResponse(request())->setStatusCode(404);
});

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', function () {
    return Inertia::render('dashboard');
  })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
