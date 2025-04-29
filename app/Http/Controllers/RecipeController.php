<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\RecipeIngredient;
use App\Models\RecipeStep;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RecipeController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the recipes.
     */
    public function index(Request $request)
    {
        $query = Recipe::with(['user', 'categories'])
            ->where('status', 'approved');

        // Handle search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Handle category filter
        if ($request->has('category')) {
            $query->whereHas('categories', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $recipes = $query->latest()->paginate(12);

        $categories = Category::where('is_active', true)->get();

        return Inertia::render('recipe/list', [
            'recipes' => $recipes,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category'])
        ]);
    }

    /**
     * Display recipes filtered by ingredients.
     */
    public function byIngredients(Request $request)
    {
        $ingredients = Ingredient::where('is_active', true)
            ->orderBy('name')
            ->get();

        $selectedIngredients = $request->has('ingredients')
            ? explode(',', $request->ingredients)
            : [];

        $recipes = collect();

        if (!empty($selectedIngredients)) {
            $recipes = Recipe::with(['user', 'categories', 'ingredients.ingredient'])
                ->where('status', 'approved')
                ->whereHas('ingredients', function($query) use ($selectedIngredients) {
                    $query->whereIn('ingredient_id', $selectedIngredients);
                })
                ->latest()
                ->paginate(12);
        }

        return Inertia::render('recipe/ingredients', [
            'ingredients' => $ingredients,
            'selectedIngredients' => $selectedIngredients,
            'recipes' => $recipes
        ]);
    }

    /**
     * Display the specified recipe.
     */
    public function show($id)
    {
        $recipe = Recipe::findOrFail($id)
            ->where('status', 'approved')
            ->with([
                'user',
                'categories',
                'ingredients.ingredient',
                'steps' => function($query) {
                    $query->orderBy('order');
                }
            ])
            ->firstOrFail();

        // Increment view count or handle later with analytics

        // Get related recipes from same categories
        $relatedRecipes = Recipe::whereHas('categories', function($query) use ($recipe) {
                $query->whereIn('categories.id', $recipe->categories->pluck('id'));
            })
            ->where('id', '!=', $recipe->id)
            ->where('status', 'approved')
            ->with(['user', 'categories'])
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return Inertia::render('recipe/read', [
            'recipe' => $recipe,
            'relatedRecipes' => $relatedRecipes
        ]);
    }

    /**
     * Show the form for creating a new recipe.
     */
    public function create()
    {
        $ingredients = Ingredient::where('is_active', true)
            ->orderBy('name')
            ->get();

        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('dash/add-recipe', [
            'ingredients' => $ingredients,
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created recipe in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'required',
            'cooking_time' => 'nullable|integer',
            'servings' => 'nullable|integer',
            'difficulty' => 'required|in:mudah,sedang,sulit',
            'image' => 'nullable|image|max:2048',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity' => 'required|numeric|min:0',
            'ingredients.*.unit' => 'required|string|max:50',
            'steps' => 'required|array|min:1',
            'steps.*.description' => 'required|string',
            'steps.*.image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Upload recipe image if provided
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('recipes', 'public');
        }

        // Create recipe
        $recipe = Recipe::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . Str::random(6),
            'description' => $request->description,
            'image_path' => $imagePath,
            'cooking_time' => $request->cooking_time,
            'servings' => $request->servings,
            'difficulty' => $request->difficulty,
            'status' => Auth::user()->is_admin ? 'approved' : 'pending',
        ]);

        // Attach categories
        $recipe->categories()->attach($request->category_ids);

        // Add ingredients
        foreach ($request->ingredients as $ingredient) {
            RecipeIngredient::create([
                'recipe_id' => $recipe->id,
                'ingredient_id' => $ingredient['ingredient_id'],
                'quantity' => $ingredient['quantity'],
                'unit' => $ingredient['unit'],
                'notes' => $ingredient['notes'] ?? null,
            ]);
        }

        // Add steps
        foreach ($request->steps as $index => $step) {
            $stepImagePath = null;
            if (isset($step['image']) && $step['image']) {
                $stepImagePath = $step['image']->store('recipe-steps', 'public');
            }

            RecipeStep::create([
                'recipe_id' => $recipe->id,
                'order' => $index + 1,
                'description' => $step['description'],
                'image_path' => $stepImagePath,
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'Resep berhasil ditambahkan dan menunggu persetujuan.');
    }

    /**
     * Show the form for editing the specified recipe.
     */
    public function edit($id)
    {
        $recipe = Recipe::findOrFail($id)
            ->where('user_id', Auth::id())
            ->with(['categories', 'ingredients.ingredient', 'steps'])
            ->firstOrFail();

        $ingredients = Ingredient::where('is_active', true)
            ->orderBy('name')
            ->get();

        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('dash/edit-recipe', [
            'recipe' => $recipe,
            'ingredients' => $ingredients,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified recipe in storage.
     */
    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'required',
            'cooking_time' => 'nullable|integer',
            'servings' => 'nullable|integer',
            'difficulty' => 'required|in:mudah,sedang,sulit',
            'image' => 'nullable|image|max:2048',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity' => 'required|numeric|min:0',
            'ingredients.*.unit' => 'required|string|max:50',
            'steps' => 'required|array|min:1',
            'steps.*.description' => 'required|string',
            'steps.*.image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Upload recipe image if provided
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($recipe->image_path) {
                Storage::disk('public')->delete($recipe->image_path);
            }
            $imagePath = $request->file('image')->store('recipes', 'public');
            $recipe->image_path = $imagePath;
        }

        // Update recipe
        $recipe->update([
            'title' => $request->title,
            'description' => $request->description,
            'cooking_time' => $request->cooking_time,
            'servings' => $request->servings,
            'difficulty' => $request->difficulty,
            'status' => Auth::user()->is_admin ? 'approved' : 'pending',
        ]);

        // Update categories
        $recipe->categories()->sync($request->category_ids);

        // Update ingredients - delete all and recreate
        $recipe->ingredients()->delete();
        foreach ($request->ingredients as $ingredient) {
            RecipeIngredient::create([
                'recipe_id' => $recipe->id,
                'ingredient_id' => $ingredient['ingredient_id'],
                'quantity' => $ingredient['quantity'],
                'unit' => $ingredient['unit'],
                'notes' => $ingredient['notes'] ?? null,
            ]);
        }

        // Update steps - delete all and recreate
        // Delete old step images first
        foreach ($recipe->steps as $step) {
            if ($step->image_path) {
                Storage::disk('public')->delete($step->image_path);
            }
        }
        $recipe->steps()->delete();

        foreach ($request->steps as $index => $step) {
            $stepImagePath = null;
            if (isset($step['image']) && $step['image']) {
                $stepImagePath = $step['image']->store('recipe-steps', 'public');
            }

            RecipeStep::create([
                'recipe_id' => $recipe->id,
                'order' => $index + 1,
                'description' => $step['description'],
                'image_path' => $stepImagePath,
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'Resep berhasil diperbarui.');
    }

    /**
     * Remove the specified recipe from storage.
     */
    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Delete recipe image
        if ($recipe->image_path) {
            Storage::disk('public')->delete($recipe->image_path);
        }

        // Delete step images
        foreach ($recipe->steps as $step) {
            if ($step->image_path) {
                Storage::disk('public')->delete($step->image_path);
            }
        }

        $recipe->delete();

        return redirect()->route('dashboard')->with('success', 'Resep berhasil dihapus.');
    }

    /**
     * User liked recipes.
     */
    public function liked()
    {
        $likedRecipes = Auth::user()->likes()
            ->with(['user', 'categories'])
            ->paginate(12);

        return Inertia::render('dash/like', [
            'recipes' => $likedRecipes
        ]);
    }

    /**
     * Toggle like for a recipe.
     */
    public function toggleLike($id)
    {
        $recipe = Recipe::findOrFail($id);

        if (Auth::user()->likes()->where('recipe_id', $id)->exists()) {
            Auth::user()->likes()->detach($id);
            $message = 'Resep dihapus dari daftar suka.';
        } else {
            Auth::user()->likes()->attach($id);
            $message = 'Resep ditambahkan ke daftar suka.';
        }

        return back()->with('success', $message);
    }

    public function getLikedRecipes(Request $request)
    {
        $recipes = Recipe::whereHas('likes', function($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })
        ->with(['user:id,name,profile_photo_path'])
        ->withCount('likes')
        ->latest()
        ->get();

        return response()->json([
            'recipes' => $recipes
        ]);
    }

    public function getUserRecipes(Request $request)
    {
        $recipes = Recipe::where('user_id', $request->user()->id)
            ->with(['user:id,name,profile_photo_path'])
            ->withCount('likes')
            ->latest()
            ->get();

        return response()->json([
            'recipes' => $recipes
        ]);
    }
}
