<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated and is an admin
        if (!Auth::check() || !Auth::user()->is_admin || !Auth::user()->is_active) {
            // Redirect with flash message for Inertia
            return redirect()->route('home')->with('flash', [
                'type' => 'error',
                'message' => 'Unauthorized access. Admin privileges required.'
            ]);
        }

        // If this is the root admin URL, redirect to admin dashboard
        if ($request->is('admin')) {
            return Inertia::location(route('admin.dashboard'));
        }

        // Proceed with the request
        return $next($request);
    }
}
