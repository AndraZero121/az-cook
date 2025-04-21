<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::get('/', function () {
  return Inertia::render('welcome');
})->name('home');
// List & Search
Route::get('/recipe', function () {
  return Inertia::render('recipe/list');
})->name('recipe');
// List Recipe By Ingredients
Route::get('/recipe/ingredients', function () {
  return Inertia::render('recipe/ingredients');
})->name('recipe-by-ingredients');
// Read Recipe
Route::get('/recipe/{slug}', function ($slug) {
  return Inertia::render('recipe/read', [
    'recipeSlug' => $slug,
  ]);
})->name('search-recipe');

// --- UNABLE TO PRODUCTION, ONLY PREVIEW FRONTEND
// Bookmark
Route::get('/login', function () {
  return Inertia::render('login');
})->name('login');
Route::get('/register', function () {
  return Inertia::render('register');
})->name('register');
Route::get('/bookmark', function () {
  return Inertia::render('bookmark');
})->name('bookmark');
// Dashboard Home
Route::get('/dash', function () {
  return Inertia::render('dash/home');
})->name('dashboard');
// Like Recipe
Route::get('/dash/like', function () {
  return Inertia::render('dash/like');
})->name('list-like');
// Add Recipe
Route::get('/dash/add', function () {
  return Inertia::render('dash/add-recipe');
})->name('add-recipe');
// Edit & Remove Recipe
Route::get('/dash/{slug}/edit', function () {
  return Inertia::render('dash/edit-recipe');
})->name('edit-recipe');
// Management Comment
Route::get('/dash/comment', function () {
  return Inertia::render('dash/comment');
})->name('manage-comment');

Route::middleware(['auth', 'verified'])->group(function () {
  // Route::get('/bookmark', function () {
  //   return Inertia::render('dash/bookmark');
  // })->name('bookmark');
  // Route::get('/dash', function () {
  //   return Inertia::render('dash/home');
  // })->name('dashboard');
  // Route::get('/dash/like', function () {
  //   return Inertia::render('dash/like');
  // })->name('list-like');
  // Route::get('/dash/add', function () {
  //   return Inertia::render('dash/add');
  // })->name('add-recipe');
  // Route::get('/dash/{slug}/edit', function () {
  //   return Inertia::render('dash/edit');
  // })->name('edit-recipe');
  // Route::get('/dash/comment', function () {
  //   return Inertia::render('dash/comment');
  // })->name('manage-comment');
});

// -- DON'T USE IN PRODUCTION
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
