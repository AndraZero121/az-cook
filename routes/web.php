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

// Public Recipe Routes - Order matters!
Route::prefix('recipe')->name('recipe.')->group(function () {
    Route::get('/ingredients', [RecipeController::class, 'byIngredients'])->name('ingredients');
    Route::get('/{id}', [RecipeController::class, 'show'])->name('show')->where('id', '[0-9]+');
    Route::get('/', [RecipeController::class, 'index'])->name('index');
});

// Guest Routes
Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('login');
    })->name('login');

    Route::get('register', function () {
        return Inertia::render('register');
    })->name('register');

    // Add POST routes for authentication
    Route::post('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store'])
        ->name('login.store');

    Route::post('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store'])
        ->name('register.store');
});

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard & Profile
    Route::get('/dash', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dash/recipes', [DashboardController::class, 'recipes'])->name('dash.recipes');
    Route::get('/dash/bookmarks', [BookmarkController::class, 'index'])->name('dash.bookmarks');
    Route::get('/dash/likes', [RecipeController::class, 'liked'])->name('dash.likes');
    Route::get('/dash/comments', [CommentController::class, 'index'])->name('dash.comments');

    // User Profile
    Route::get('/user/profile', [\App\Http\Controllers\User\ProfileController::class, 'edit'])->name('user.profile.edit');
    Route::post('/user/profile', [\App\Http\Controllers\User\ProfileController::class, 'update'])->name('user.profile.update');

    // Recipe Management
    Route::get('/dash/add', [RecipeController::class, 'create'])->name('recipe.create');
    Route::post('/recipe', [RecipeController::class, 'store'])->name('recipe.store');
    Route::get('/dash/recipe/{id}/edit', [RecipeController::class, 'edit'])->name('recipe.edit');
    Route::put('/recipe/{id}', [RecipeController::class, 'update'])->name('recipe.update');
    Route::delete('/recipe/{id}', [RecipeController::class, 'destroy'])->name('recipe.destroy');

    // Profile Settings
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Bookmarks & Comments
    Route::get('/bookmark', [BookmarkController::class, 'index'])->name('bookmark.index');
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
    Route::get('/users/{id}/edit', [AdminController::class, 'editUser'])->name('users.edit');
    Route::patch('/users/{id}', [AdminController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('users.destroy');

    // Recipe Management
    Route::get('/recipes', [AdminController::class, 'recipes'])->name('recipes.index');
    Route::get('/recipes/pending', [AdminController::class, 'pendingRecipes'])->name('recipes.pending');
    Route::get('/recipes/{id}', [AdminController::class, 'showRecipeForApproval'])->name('recipes.show');
    Route::patch('/recipes/{id}/approve', [AdminController::class, 'approveRecipe'])->name('recipes.approve');
    Route::patch('/recipes/{id}/reject', [AdminController::class, 'rejectRecipe'])->name('recipes.reject');

    // Ingredient Management
    Route::resource('ingredients', IngredientController::class);

    // Category Management
    Route::resource('categories', CategoryController::class);
});
