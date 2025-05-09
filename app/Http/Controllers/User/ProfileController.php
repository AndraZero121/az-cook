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
        return Inertia::render('profile', [
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
                'file',
                'image',
                'mimes:jpeg,png,jpg,gif',
                'max:5120', // 5MB in kilobytes
            ],
        ];

        if ($request->filled('password')) {
            $rules['password'] = ['required', 'string', 'min:8', 'confirmed'];
            $rules['password_confirmation'] = ['required'];
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('photo')) {
            try {
                $file = $request->file('photo');

                // Delete old photo if exists
                if ($user->profile_photo_path) {
                    Storage::disk('public')->delete($user->profile_photo_path);
                }

                // Generate unique filename
                $filename = 'profile-' . uniqid() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('profile-photos', $filename, 'public');

                if (!$path) {
                    throw new \Exception('Failed to upload image');
                }

                $user->profile_photo_path = $path;
            } catch (\Exception $e) {
                return redirect()->back()->withErrors(['photo' => 'Gagal mengunggah foto. Silakan coba lagi.']);
            }
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

    public function destroy(Request $request)
    {
        $user = User::find(Auth::id());

        // Delete profile photo if exists
        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        // Delete user account
        $user->delete();

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
