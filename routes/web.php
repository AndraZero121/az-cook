<?php

use App\Http\Controllers\{
    RecipeController,
    BookmarkController,
    CommentController,
    DashboardController,
    AdminController,
    IngredientController,
    CategoryController,
    ProfileController
};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    $featuredRecipes = \App\Models\Recipe::with(['user', 'categories'])
        ->where('status', 'approved')
        ->latest()
        ->take(6)
        ->get();

    $latestRecipes = \App\Models\Recipe::with(['user', 'categories'])
        ->where('status', 'approved')
        ->latest()
        ->take(8)
        ->get();

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

// Guest Routes
Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('login');
    })->name('login');

    Route::get('register', function () {
        return Inertia::render('register');
    })->name('register');
});

// Public Recipe Routes
Route::get('/recipe', [RecipeController::class, 'index'])->name('recipe.index');
Route::get('/recipe/{id}', [RecipeController::class, 'show'])->name('recipe.show');
Route::get('/recipe/ingredients', [RecipeController::class, 'byIngredients'])->name('recipe.ingredients');

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard & Profile
    Route::get('/dash', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Recipe Management
    Route::get('/dash/recipes', [DashboardController::class, 'recipes'])->name('user.recipes');
    Route::get('/dash/add', [RecipeController::class, 'create'])->name('recipe.create');
    Route::post('/dash/recipes', [RecipeController::class, 'store'])->name('recipe.store');
    Route::get('/dash/recipes/{id}/edit', [RecipeController::class, 'edit'])->name('recipe.edit');
    Route::patch('/dash/recipes/{id}', [RecipeController::class, 'update'])->name('recipe.update');
    Route::delete('/dash/recipes/{id}', [RecipeController::class, 'destroy'])->name('recipe.destroy');

    // Recipe Interactions
    Route::post('/recipes/{id}/like', [RecipeController::class, 'toggleLike'])->name('recipe.like');
    Route::get('/dash/like', [RecipeController::class, 'liked'])->name('recipe.liked');

    // Bookmarks
    Route::get('/bookmark', [BookmarkController::class, 'index'])->name('bookmark.index');
    Route::post('/recipes/{id}/bookmark', [BookmarkController::class, 'toggle'])->name('bookmark.toggle');

    // Comments
    Route::get('/dash/comment', [CommentController::class, 'index'])->name('comment.index');
    Route::post('/recipes/{recipe}/comments', [CommentController::class, 'store'])->name('comment.store');
    Route::patch('/comments/{comment}', [CommentController::class, 'update'])->name('comment.update');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');

    // User Management
    Route::get('/users', [AdminController::class, 'users'])->name('users.index');
    Route::patch('/users/{user}/toggle', [AdminController::class, 'toggleUserStatus'])->name('users.toggle');

    // Recipe Management
    Route::get('/recipes/pending', [AdminController::class, 'pendingRecipes'])->name('recipes.pending');
    Route::get('/recipes/{id}/review', [AdminController::class, 'showRecipeForApproval'])->name('recipes.review');
    Route::patch('/recipes/{id}/approve', [AdminController::class, 'approveRecipe'])->name('recipes.approve');
    Route::patch('/recipes/{id}/reject', [AdminController::class, 'rejectRecipe'])->name('recipes.reject');

    // Category & Ingredient Management
    Route::resource('categories', CategoryController::class);
    Route::patch('/categories/{category}/toggle', [CategoryController::class, 'toggleStatus'])->name('categories.toggle');
    Route::resource('ingredients', IngredientController::class);
    Route::patch('/ingredients/{ingredient}/toggle', [IngredientController::class, 'toggleStatus'])->name('ingredients.toggle');
});

// User Profile Management
Route::middleware('auth')->prefix('user')->group(function () {
    Route::get('/profile', [App\Http\Controllers\User\ProfileController::class, 'edit'])->name('user.profile.edit');
    Route::post('/profile', [App\Http\Controllers\User\ProfileController::class, 'update'])->name('user.profile.update');
});

require __DIR__.'/auth.php';
