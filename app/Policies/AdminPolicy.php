<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class AdminPolicy
{
    /**
     * Determine whether the user can access admin panel.
     */
    public function accessAdmin(User $user): bool
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can manage users.
     */
    public function manageUsers(User $user): bool
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can approve recipes.
     */
    public function approveRecipes(User $user): bool
    {
        return $user->is_admin;
    }
}
