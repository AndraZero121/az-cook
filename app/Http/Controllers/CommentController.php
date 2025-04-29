<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Recipe;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the user's comments.
     */
    public function index()
    {
        $comments = Auth::user()->comments()
            ->with('recipe')
            ->latest()
            ->paginate(15);

        return Inertia::render('dash/comment', [
            'comments' => $comments
        ]);
    }

    /**
     * Store a newly created comment in storage.
     */
    public function store(Request $request, Recipe $recipe)
    {
        $request->validate([
            'content' => 'required|string|max:500'
        ]);

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'recipe_id' => $recipe->id,
            'content' => $request->content
        ]);

        return back()->with('success', 'Komentar berhasil ditambahkan.');
    }

    /**
     * Update the specified comment in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $request->validate([
            'content' => 'required|string|max:500'
        ]);

        $comment->update([
            'content' => $request->content
        ]);

        return back()->with('success', 'Komentar berhasil diperbarui.');
    }

    /**
     * Remove the specified comment from storage.
     */
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);

        $comment->delete();

        return back()->with('success', 'Komentar berhasil dihapus.');
    }

    public function getUnansweredComments(Request $request)
    {
        $comments = Comment::whereHas('recipe', function($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })
        ->whereNull('parent_id')
        ->whereDoesntHave('replies')
        ->with(['user:id,name,profile_photo_path'])
        ->latest()
        ->get()
        ->map(function($comment) {
            return [
                'id' => $comment->id,
                'username' => $comment->user->name,
                'icon' => $comment->user->profile_photo_path,
                'comment' => $comment->content
            ];
        });

        return response()->json([
            'comments' => $comments
        ]);
    }
}
