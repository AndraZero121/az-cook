<?php

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Recipe related APIs
Route::middleware('auth:sanctum')->group(function () {
    // Like recipe
    Route::post('/recipes/{id}/like', [RecipeController::class, 'toggleLike']);

    // Bookmark recipe
    Route::post('/recipes/{id}/bookmark', [BookmarkController::class, 'toggle']);

    // Comment on recipe
    Route::post('/recipes/{recipe}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
    Route::get('/user/liked-recipes', [App\Http\Controllers\RecipeController::class, 'getLikedRecipes']);

    // User dashboard routes
    Route::get('/user/recipes', [RecipeController::class, 'getUserRecipes']);
    Route::get('/user/unanswered-comments', [CommentController::class, 'getUnansweredComments']);
    Route::get('/user/profile', [UserController::class, 'getProfile']);
});

// Public recipes API (for search, filtering, etc)
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

// Get ingredients for search
Route::get('/ingredients', function () {
    return \App\Models\Ingredient::where('is_active', true)
        ->orderBy('name')
        ->get(['id', 'name']);
});

// Get categories
Route::get('/categories', function () {
    return \App\Models\Category::where('is_active', true)
        ->orderBy('name')
        ->get(['id', 'name', 'slug']);
});
