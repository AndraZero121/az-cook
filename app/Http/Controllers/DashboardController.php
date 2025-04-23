<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function index()
    {
        $myRecipes = Recipe::where('user_id', Auth::id())
            ->withCount(['comments', 'likes'])
            ->latest()
            ->limit(5)
            ->get();
            
        $pendingRecipes = Recipe::where('user_id', Auth::id())
            ->where('status', 'pending')
            ->count();
            
        $approvedRecipes = Recipe::where('user_id', Auth::id())
            ->where('status', 'approved')
            ->count();
            
        $rejectedRecipes = Recipe::where('user_id', Auth::id())
            ->where('status', 'rejected')
            ->count();
            
        $totalLikes = Recipe::where('user_id', Auth::id())
            ->withCount('likes')
            ->get()
            ->sum('likes_count');
            
        $bookmarkCount = Auth::user()->bookmarks()->count();
        $likesCount = Auth::user()->likes()->count();

        return Inertia::render('dash/home', [
            'myRecipes' => $myRecipes,
            'stats' => [
                'pendingRecipes' => $pendingRecipes,
                'approvedRecipes' => $approvedRecipes,
                'rejectedRecipes' => $rejectedRecipes,
                'totalLikes' => $totalLikes,
                'bookmarks' => $bookmarkCount,
                'likes' => $likesCount,
            ]
        ]);
    }

    /**
     * Display all user's recipes.
     */
    public function recipes(Request $request)
    {
        $query = Recipe::where('user_id', Auth::id());

        if ($request->has('status') && in_array($request->status, ['pending', 'approved', 'rejected'])) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        $recipes = $query->withCount(['comments', 'likes'])
            ->latest()
            ->paginate(10);

        return Inertia::render('dash/recipes', [
            'recipes' => $recipes,
            'filters' => $request->only(['status', 'search'])
        ]);
    }
}