<?php

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Recipe related APIs
    Route::post('/recipes/{id}/like', [RecipeController::class, 'toggleLike']);
    Route::post('/recipes/{id}/bookmark', [BookmarkController::class, 'toggle']);
    Route::delete('/recipes/{id}/bookmark', [BookmarkController::class, 'destroy']);

    // Comments
    Route::post('/recipes/{recipe}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);

    // Get user recipes
    Route::get('/user/liked-recipes', [RecipeController::class, 'getLikedRecipes']);
    Route::get('/user/recipes', [RecipeController::class, 'getUserRecipes']);
});

// Public recipe APIs
Route::post('/recipes/search-by-ingredients', [RecipeController::class, 'searchByIngredients']);

Route::get('/recipes', function (Request $request) {
    $query = \App\Models\Recipe::query()
        ->with(['user:id,name', 'categories:id,name,slug'])
        ->where('status', 'approved');

    if ($request->has('search')) {
        $query->where('title', 'like', '%' . $request->search . '%');
    }

    if ($request->has('category')) {
        $query->whereHas('categories', function($q) use ($request) {
            $q->where('slug', $request->category);
        });
    }

    return $query->latest()->paginate(12);
});

// Public APIs for search functionalities
Route::get('/ingredients', function () {
    return \App\Models\Ingredient::where('is_active', true)
        ->orderBy('name')
        ->get(['id', 'name']);
});

Route::get('/categories', function () {
    return \App\Models\Category::where('is_active', true)
        ->orderBy('name')
        ->get(['id', 'name', 'slug']);
});
