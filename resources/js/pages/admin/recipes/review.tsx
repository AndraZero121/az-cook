import { Head, Link, useForm } from "@inertiajs/react";
import { CheckCircle, XCircle, Clock, ChevronLeft } from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";

interface User {
  id: number;
  name: string;
  profile_photo_path: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Ingredient {
  id: number;
  quantity: number;
  unit: string;
  notes?: string;
  ingredient: {
    id: number;
    name: string;
  };
}

interface Step {
  id: number;
  order: number;
  description: string;
  image_path: string | null;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  image_path: string;
  cooking_time?: number;
  servings?: number;
  difficulty: 'mudah' | 'sedang' | 'sulit';
  created_at: string;
  user: User;
  categories: Category[];
  ingredients: Ingredient[];
  steps: Step[];
}

interface Props {
  recipe: Recipe;
}

export default function RecipeReview({ recipe }: Props) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const { post, processing, data, setData } = useForm({
    rejection_reason: ''
  });

  const handleApprove = () => {
    if (confirm('Apakah Anda yakin ingin menyetujui resep ini?')) {
      post(`/admin/recipes/${recipe.id}/approve`);
    }
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rejectionReason.trim()) {
      alert('Alasan penolakan harus diisi');
      return;
    }

    setData('rejection_reason', rejectionReason);
    post(`/admin/recipes/${recipe.id}/reject`);
  };

  return (
    <AdminLayout>
      <Head title={`Review: ${recipe.title}`} />

      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/admin/recipes/pending"
            className="inline-flex items-center text-blue-600 hover:text-blue-900"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Kembali ke daftar resep menunggu
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Detail Resep</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Review sebelum menyetujui atau menolak
              </p>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                <Clock className="h-4 w-4 mr-1" />
                Menunggu
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Judul</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{recipe.title}</dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Oleh</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={recipe.user.profile_photo_path || '/default-avatar.png'}
                        alt={recipe.user.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{recipe.user.name}</div>
                    </div>
                  </div>
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tanggal dibuat</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(recipe.created_at).toLocaleDateString()}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Deskripsi</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{recipe.description}</dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Kategori</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {recipe.categories.map(category => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Info Tambahan</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex space-x-6">
                    {recipe.cooking_time && (
                      <div>
                        <p className="font-medium">Waktu Memasak</p>
                        <p>{recipe.cooking_time} menit</p>
                      </div>
                    )}
                    {recipe.servings && (
                      <div>
                        <p className="font-medium">Porsi</p>
                        <p>{recipe.servings} orang</p>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">Tingkat Kesulitan</p>
                      <p className="capitalize">{recipe.difficulty}</p>
                    </div>
                  </div>
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gambar</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="w-full max-w-md aspect-video rounded-lg overflow-hidden">
                    <img
                      src={recipe.image_path}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bahan-bahan</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="divide-y divide-gray-200">
                    {recipe.ingredients.map(ingredient => (
                      <li key={ingredient.id} className="py-2 flex">
                        <span className="w-24">{ingredient.quantity} {ingredient.unit}</span>
                        <span>{ingredient.ingredient.name}</span>
                        {ingredient.notes && (
                          <span className="ml-2 text-gray-500">({ingredient.notes})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Langkah-langkah</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="space-y-6">
                    {recipe.steps.map(step => (
                      <div key={step.id} className="flex">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                          {step.order}
                        </div>
                        <div className="ml-4">
                          <p>{step.description}</p>
                          {step.image_path && (
                            <div className="mt-2 w-full max-w-md aspect-video rounded-lg overflow-hidden">
                              <img
                                src={step.image_path}
                                alt={`Step ${step.order}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </dd>
              </div>
            </dl>
          </div>

          <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {showRejectForm ? (
              <form onSubmit={handleReject} className="flex-1">
                <div className="mb-4">
                  <label htmlFor="rejection_reason" className="block text-sm font-medium text-gray-700">
                    Alasan Penolakan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="rejection_reason"
                    name="rejection_reason"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Tuliskan alasan penolakan resep ini..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    {processing ? 'Memproses...' : 'Tolak Resep'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRejectForm(false)}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : (
              <>
                <button
                  onClick={handleApprove}
                  disabled={processing}
                  className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <CheckCircle className="-ml-1 mr-2 h-5 w-5" />
                  {processing ? 'Memproses...' : 'Setujui Resep'}
                </button>
                <button
                  onClick={() => setShowRejectForm(true)}
                  disabled={processing}
                  className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <XCircle className="-ml-1 mr-2 h-5 w-5" />
                  Tolak Resep
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
