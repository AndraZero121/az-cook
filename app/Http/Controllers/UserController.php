<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getProfile(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'name' => $user->name,
            'profile_photo_path' => $user->profile_photo_path,
            'bio' => $user->bio
        ]);
    }
}
