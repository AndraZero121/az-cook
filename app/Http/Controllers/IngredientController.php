<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class IngredientController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the ingredients.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Ingredient::class);

        $query = Ingredient::query();

        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        if ($request->has('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        $ingredients = $query->orderBy('name')->paginate(15);

        return Inertia::render('admin/ingredients/index', [
            'ingredients' => $ingredients,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new ingredient.
     */
    public function create()
    {
        $this->authorize('create', Ingredient::class);

        return Inertia::render('admin/ingredients/create');
    }

    /**
     * Store a newly created ingredient in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Ingredient::class);

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255|unique:ingredients',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('ingredients', 'public');
        }

        Ingredient::create([
            'name' => $request->name,
            'description' => $request->description,
            'image_path' => $imagePath,
            'is_active' => $request->is_active ?? true
        ]);

        return redirect()->route('admin.ingredients.index')->with('success', 'Bahan makanan berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified ingredient.
     */
    public function edit(Ingredient $ingredient)
    {
        $this->authorize('update', $ingredient);

        return Inertia::render('admin/ingredients/edit', [
            'ingredient' => $ingredient
        ]);
    }

    /**
     * Update the specified ingredient in storage.
     */
    public function update(Request $request, Ingredient $ingredient)
    {
        $this->authorize('update', $ingredient);

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255|unique:ingredients,name,' . $ingredient->id,
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        if ($request->hasFile('image')) {
            if ($ingredient->image_path) {
                Storage::disk('public')->delete($ingredient->image_path);
            }
            $imagePath = $request->file('image')->store('ingredients', 'public');
            $ingredient->image_path = $imagePath;
        }

        $ingredient->update([
            'name' => $request->name,
            'description' => $request->description,
            'is_active' => $request->is_active ?? $ingredient->is_active
        ]);

        return redirect()->route('admin.ingredients.index')->with('success', 'Bahan makanan berhasil diperbarui.');
    }

    /**
     * Toggle the active status of the ingredient.
     */
    public function toggleStatus(Ingredient $ingredient)
    {
        $this->authorize('update', $ingredient);

        $ingredient->update([
            'is_active' => !$ingredient->is_active
        ]);

        return back()->with('success', 'Status bahan makanan berhasil diubah.');
    }

    /**
     * Remove the specified ingredient from storage.
     */
    public function destroy(Ingredient $ingredient)
    {
        $this->authorize('delete', $ingredient);

        // Check if ingredient is used in any recipes
        if ($ingredient->recipeIngredients()->count() > 0) {
            return back()->with('error', 'Bahan makanan tidak dapat dihapus karena digunakan dalam resep.');
        }

        if ($ingredient->image_path) {
            Storage::disk('public')->delete($ingredient->image_path);
        }

        $ingredient->delete();

        return redirect()->route('admin.ingredients.index')->with('success', 'Bahan makanan berhasil dihapus.');
    }
}