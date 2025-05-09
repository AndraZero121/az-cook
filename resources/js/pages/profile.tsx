import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

interface UserData {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  profile_photo_path: string | null;
}

interface Props {
  auth: {
    user: UserData;
  };
}

export default function Profile({ auth }: Props) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { data, setData, patch, processing, errors, reset } = useForm({
    name: auth.user.name,
    email: auth.user.email,
    bio: auth.user.bio || '',
    photo: null as File | null,
    password: '',
    password_confirmation: '',
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setData('photo', file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Pastikan name dan email tidak kosong
    if (!data.name || !data.email) {
      if (!data.name) setData('name', auth.user.name);
      if (!data.email) setData('email', auth.user.email);
      return;
    }

    patch('/profile', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        if (data.password) {
          setData('password', '');
          setData('password_confirmation', '');
        }
      },
    });
  };

  const currentPhoto = photoPreview || (auth.user.profile_photo_path
    ? `/storage/${auth.user.profile_photo_path}`
    : '/default-avatar.png');

  return (
    <MainLayout>
      <Head title="Pengaturan Profil" />

      <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Pengaturan Profil</h1>
          <p className="text-gray-600">Kelola informasi profil dan kata sandi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto Profil
            </label>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={currentPhoto}
                  alt={auth.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <label className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-3 text-sm leading-4 font-medium hover:bg-gray-50">
                  Ubah Foto
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </label>
                {errors.photo && <p className="mt-1 text-red-500 text-xs">{errors.photo}</p>}
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                rows={3}
                value={data.bio}
                onChange={(e) => setData('bio', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.bio && <p className="mt-1 text-red-500 text-xs">{errors.bio}</p>}
            </div>
          </div>

          {/* Password Change */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Ubah Kata Sandi</h3>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && <p className="mt-1 text-red-500 text-xs">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
