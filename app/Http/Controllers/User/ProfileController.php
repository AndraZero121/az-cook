<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\User;

class ProfileController extends Controller
{
    public function edit()
    {
        return Inertia::render('user/profile', [
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function update(Request $request)
    {
        $user = User::find(Auth::id());
        
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'bio' => ['nullable', 'string', 'max:500'],
            'photo' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif',
                'max:10240', // 10MB in kilobytes
            ],
        ];

        // Add password validation if password is being updated
        if ($request->filled('password')) {
            $rules['password'] = ['required', 'string', 'min:8', 'confirmed'];
        }

        $validated = $request->validate($rules);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            
            // Additional validation for file size
            if ($file->getSize() > 10 * 1024 * 1024) { // 10MB in bytes
                return redirect()->back()->withErrors(['photo' => 'Ukuran foto tidak boleh lebih dari 10MB']);
            }

            // Delete old photo if exists
            if ($user->profile_photo_path) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }

            $path = $file->store('profile-photos', 'public');
            $user->profile_photo_path = $path;
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->bio = $validated['bio'] ?? null;

        if (isset($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->back()->with('success', 'Profil berhasil diperbarui.');
    }
}