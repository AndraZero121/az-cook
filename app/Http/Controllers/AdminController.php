<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AdminController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display the admin dashboard home page.
     */
    public function index()
    {
        $this->authorize('accessAdmin', Auth::user());

        $totalUsers = User::count();
        $totalRecipes = Recipe::count();
        $pendingRecipes = Recipe::where('status', 'pending')->count();
        $approvedRecipes = Recipe::where('status', 'approved')->count();

        $recentUsers = User::latest()->take(5)->get();
        $recentRecipes = Recipe::with('user')->latest()->take(5)->get();

        return Inertia::render('admin/index', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalRecipes' => $totalRecipes,
                'pendingRecipes' => $pendingRecipes,
                'approvedRecipes' => $approvedRecipes,
            ],
            'recentUsers' => $recentUsers,
            'recentRecipes' => $recentRecipes
        ]);
    }

    /**
     * Display a listing of the users.
     */
    public function users(Request $request)
    {
        $this->authorize('manageUsers', Auth::user());

        $query = User::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        $users = $query->orderBy('name')->paginate(15);

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    /**
     * Toggle user active status.
     */
    public function toggleUserStatus(User $user)
    {
        $this->authorize('manageUsers', Auth::user());

        // Prevent admin from deactivating themselves
        if ($user->id === Auth::id()) {
            return back()->with('error', 'Tidak dapat mengubah status akun Anda sendiri.');
        }

        $user->update([
            'is_active' => !$user->is_active
        ]);

        $status = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return back()->with('success', "Pengguna berhasil {$status}.");
    }

    /**
     * Display a listing of recipes pending approval.
     */
    public function pendingRecipes(Request $request)
    {
        $this->authorize('approveRecipes', Auth::user());

        $query = Recipe::with('user')
            ->where('status', 'pending');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhereHas('user', function($u) use ($search) {
                      $u->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $recipes = $query->latest()->paginate(15);

        return Inertia::render('admin/recipes/pending', [
            'recipes' => $recipes,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show a recipe for approval review.
     */
    public function showRecipeForApproval($id)
    {
        $this->authorize('approveRecipes', Auth::user());

        $recipe = Recipe::with([
            'user',
            'categories',
            'ingredients.ingredient',
            'steps' => function($query) {
                $query->orderBy('order');
            }
        ])->findOrFail($id);

        return Inertia::render('admin/recipes/review', [
            'recipe' => $recipe
        ]);
    }

    /**
     * Approve a recipe.
     */
    public function approveRecipe($id)
    {
        $this->authorize('approveRecipes', Auth::user());

        $recipe = Recipe::findOrFail($id);
        $recipe->update([
            'status' => 'approved'
        ]);

        return redirect()->route('admin.recipes.pending')->with('success', 'Resep berhasil disetujui.');
    }

    /**
     * Reject a recipe.
     */
    public function rejectRecipe(Request $request, $id)
    {
        $this->authorize('approveRecipes', Auth::user());

        $request->validate([
            'rejection_reason' => 'required|string|max:500'
        ]);

        $recipe = Recipe::findOrFail($id);
        $recipe->update([
            'status' => 'rejected',
            'rejection_reason' => $request->rejection_reason
        ]);

        return redirect()->route('admin.recipes.pending')->with('success', 'Resep berhasil ditolak.');
    }
}
