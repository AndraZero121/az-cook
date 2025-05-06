<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BookmarkController extends Controller
{
    /**
     * Display a listing of user bookmarks.
     */
    public function index()
    {
        $bookmarks = Auth::user()->bookmarks()
            ->with(['user', 'categories'])
            ->withCount('likes')
            ->latest()
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
        try {
            $recipe = Recipe::findOrFail($id);
            $isBookmarked = Auth::user()->bookmarks()->where('recipe_id', $id)->exists();

            if ($isBookmarked) {
                Auth::user()->bookmarks()->detach($id);
                $message = 'Resep dihapus dari bookmark.';
                $status = false;
            } else {
                Auth::user()->bookmarks()->attach($id);
                $message = 'Resep ditambahkan ke bookmark.';
                $status = true;
            }

            if (request()->expectsJson()) {
                return response()->json([
                    'message' => $message,
                    'status' => $status,
                    'bookmarked' => $status
                ]);
            }

            return back()->with('success', $message);
        } catch (ModelNotFoundException $e) {
            if (request()->expectsJson()) {
                return response()->json([
                    'message' => 'Resep tidak ditemukan.',
                    'status' => 'error'
                ], 404);
            }

            return back()->with('error', 'Resep tidak ditemukan.');
        }
    }

    /**
     * Remove a bookmark.
     */
    public function destroy($id)
    {
        try {
            $recipe = Recipe::findOrFail($id);
            Auth::user()->bookmarks()->detach($id);

            if (request()->expectsJson()) {
                return response()->json([
                    'message' => 'Resep dihapus dari bookmark.',
                    'status' => false
                ]);
            }

            return back()->with('success', 'Resep dihapus dari bookmark.');
        } catch (ModelNotFoundException $e) {
            if (request()->expectsJson()) {
                return response()->json([
                    'message' => 'Bookmark tidak ditemukan.',
                    'status' => 'error'
                ], 404);
            }

            return back()->with('error', 'Bookmark tidak ditemukan.');
        }
    }
}
