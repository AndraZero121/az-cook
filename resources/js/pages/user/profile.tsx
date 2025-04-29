import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { PenIcon, User, Mail, Key, Save } from "lucide-react";

interface Props {
  auth: {
    user: {
      name: string;
      email: string;
      profile_photo_path: string | null;
      bio: string;
    };
  };
  errors: {
    name?: string;
    email?: string;
    password?: string;
    bio?: string;
  };
}

export default function Profile({ auth, errors }: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data, setData, post, processing } = useForm({
    name: auth.user.name,
    email: auth.user.email,
    bio: auth.user.bio || "",
    password: "",
    password_confirmation: "",
    photo: null as File | null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setData('photo', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/user/profile', {
      preserveScroll: true,
      onSuccess: () => {
        // Reset password fields
        setData('password', '');
        setData('password_confirmation', '');
      },
    });
  };

  return (
    <>
      <Head title="Edit Profil"/>
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Pengaturan Profil</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={previewUrl || auth.user.profile_photo_path || '/default-avatar.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50 border border-gray-200"
              >
                <PenIcon size={16}/>
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div>
              <h3 className="font-medium mb-1">Foto Profil</h3>
              <p className="text-sm text-gray-500">
                PNG, JPG atau GIF (Maks. 2MB)
              </p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">Nama</span>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className={"w-full px-4 py-2 border rounded-md outline-none " + 
                      (errors.name ? "border-red-500" : "border-gray-300")}
                  />
                  <User size={18} className="absolute right-3 top-2.5 text-gray-400"/>
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </label>
            </div>

            <div>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">Email</span>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className={"w-full px-4 py-2 border rounded-md outline-none " + 
                      (errors.email ? "border-red-500" : "border-gray-300")}
                  />
                  <Mail size={18} className="absolute right-3 top-2.5 text-gray-400"/>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </label>
            </div>

            <div>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">Bio</span>
                <textarea
                  value={data.bio}
                  onChange={e => setData('bio', e.target.value)}
                  className={"w-full px-4 py-2 border rounded-md outline-none mt-1 " + 
                    (errors.bio ? "border-red-500" : "border-gray-300")}
                  rows={4}
                  placeholder="Ceritakan tentang dirimu..."
                />
              </label>
            </div>

            <div>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">Password Baru</span>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    className={"w-full px-4 py-2 border rounded-md outline-none " + 
                      (errors.password ? "border-red-500" : "border-gray-300")}
                    placeholder="Kosongkan jika tidak ingin mengubah password"
                  />
                  <Key size={18} className="absolute right-3 top-2.5 text-gray-400"/>
                </div>
              </label>
            </div>

            <div>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">Konfirmasi Password Baru</span>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                    placeholder="Kosongkan jika tidak ingin mengubah password"
                  />
                  <Key size={18} className="absolute right-3 top-2.5 text-gray-400"/>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className={"px-6 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 " +
                (processing ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-600")}
            >
              <Save size={18}/>
              {processing ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}