<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    /**
     * Display a listing of user bookmarks.
     */
    public function index()
    {
        $bookmarks = Auth::user()->bookmarks()
            ->with(['user', 'categories'])
            ->paginate(12);

        return Inertia::render('dash/bookmark', [
            'recipes' => $bookmarks
        ]);
    }

    /**
     * Toggle bookmark for a recipe.
     */
    public function toggle($id)
    {
        $recipe = Recipe::findOrFail($id);

        if (Auth::user()->bookmarks()->where('recipe_id', $id)->exists()) {
            Auth::user()->bookmarks()->detach($id);
            $message = 'Resep dihapus dari bookmark.';
        } else {
            Auth::user()->bookmarks()->attach($id);
            $message = 'Resep ditambahkan ke bookmark.';
        }

        return back()->with('success', $message);
    }
}
