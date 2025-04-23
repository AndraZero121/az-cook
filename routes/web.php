<?php

use App\Http\Controllers\{
    RecipeController,
    BookmarkController,
    CommentController,
    DashboardController,
    AdminController,
    IngredientController,
    CategoryController
};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Home
Route::get('/', function () {
    // Get featured recipes
    $featuredRecipes = \App\Models\Recipe::with(['user', 'categories'])
        ->where('status', 'approved')
        ->where('is_featured', true)
        ->latest()
        ->take(6)
        ->get();

    // Get latest recipes
    $latestRecipes = \App\Models\Recipe::with(['user', 'categories'])
        ->where('status', 'approved')
        ->latest()
        ->take(8)
        ->get();

    // Get popular categories
    $popularCategories = \App\Models\Category::withCount(['recipes' => function($query) {
        $query->where('status', 'approved');
    }])
    ->where('is_active', true)
    ->orderByDesc('recipes_count')
    ->take(6)
    ->get();

    return Inertia::render('welcome', [
        'featuredRecipes' => $featuredRecipes,
        'latestRecipes' => $latestRecipes,
        'popularCategories' => $popularCategories
    ]);
})->name('home');

// Public Recipe Routes
Route::get('/recipe', [RecipeController::class, 'index'])->name('recipe');
Route::get('/recipe/{slug}', [RecipeController::class, 'show'])->name('search-recipe');

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dash', [DashboardController::class, 'index'])->name('dashboard');

    // User Recipes
    Route::get('/dash/recipes', [DashboardController::class, 'recipes'])->name('user.recipes');
    Route::get('/dash/like', [RecipeController::class, 'liked'])->name('list-like');
    Route::get('/dash/add', [RecipeController::class, 'create'])->name('add-recipe');
    Route::post('/dash/recipes', [RecipeController::class, 'store'])->name('recipes.store');
    Route::get('/dash/{slug}/edit', [RecipeController::class, 'edit'])->name('edit-recipe');
    Route::put('/dash/recipes/{slug}', [RecipeController::class, 'update'])->name('recipes.update');
    Route::delete('/dash/recipes/{slug}', [RecipeController::class, 'destroy'])->name('recipes.destroy');

    // Bookmarks
    Route::get('/bookmark', [BookmarkController::class, 'index'])->name('bookmark');
    Route::post('/recipes/{id}/bookmark', [BookmarkController::class, 'toggle'])->name('recipes.toggle-bookmark');

    // Comments
    Route::get('/dash/comment', [CommentController::class, 'index'])->name('manage-comment');
});

// Admin Routes
Route::middleware(['can:accessAdmin,App\Models\User'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    Route::resource('users', AdminController::class)->only(['index', 'update']);
    Route::patch('/users/{user}/toggle-status', [AdminController::class, 'toggleUserStatus'])->name('users.toggle-status');
    Route::resource('recipes', AdminController::class)->only(['index', 'show', 'update']);
    Route::patch('/recipes/{id}/approve', [AdminController::class, 'approveRecipe'])->name('recipes.approve');
    Route::patch('/recipes/{id}/reject', [AdminController::class, 'rejectRecipe'])->name('recipes.reject');
    Route::resource('ingredients', IngredientController::class);
    Route::resource('categories', CategoryController::class);
});

// Authentication Routes
Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('auth/register');
})->name('register');

// Include additional routes
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';