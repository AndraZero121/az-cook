import { Head, Link, useForm } from "@inertiajs/react";
import { Clock, CheckCircle, XCircle, Search } from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";

interface User {
  id: number;
  name: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  image_path: string;
  created_at: string;
  user: User;
}

interface Filters {
  search?: string;
}

interface Props {
  recipes: {
    data: Recipe[];
    links: {
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      last_page: number;
      from: number;
      to: number;
      total: number;
    };
  };
  filters: Filters;
}

export default function PendingRecipes({ recipes, filters }: Props) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const { get } = useForm({ search: searchQuery });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    get('/admin/recipes/pending', {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleReject = (recipeId: number) => {
    const reason = prompt('Alasan penolakan:');
    if (reason !== null) {
      window.location.href = `/admin/recipes/${recipeId}/reject?rejection_reason=${encodeURIComponent(reason)}`;
    }
  };

  return (
    <AdminLayout>
      <Head title="Resep Menunggu" />

      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Resep Menunggu Persetujuan</h1>
          <div className="mt-4 sm:mt-0">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="search"
                  className="block w-full rounded-md border-gray-300 py-2 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Cari resep..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="ml-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cari
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Resep
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Pengguna
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Tanggal
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Aksi</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {recipes.data.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-10 text-center text-gray-500">
                          Tidak ada resep yang menunggu persetujuan
                        </td>
                      </tr>
                    ) : (
                      recipes.data.map((recipe) => (
                        <tr key={recipe.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src={recipe.image_path} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{recipe.title}</div>
                                <div className="text-gray-500 truncate max-w-xs">{recipe.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">{recipe.user.name}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(recipe.created_at).toLocaleDateString()}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex space-x-2 justify-end">
                              <Link
                                href={`/admin/recipes/${recipe.id}`}
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                <Clock className="-ml-0.5 mr-2 h-4 w-4" />
                                Detail
                              </Link>
                              <Link
                                href={`/admin/recipes/${recipe.id}/approve`}
                                method="patch"
                                as="button"
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                              >
                                <CheckCircle className="-ml-0.5 mr-2 h-4 w-4" />
                                Setujui
                              </Link>
                              <button
                                onClick={() => handleReject(recipe.id)}
                                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              >
                                <XCircle className="-ml-0.5 mr-2 h-4 w-4" />
                                Tolak
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {recipes.data.length > 0 && (
          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-1 justify-between sm:hidden">
              {recipes.links.prev ? (
                <Link
                  href={recipes.links.prev}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Sebelumnya
                </Link>
              ) : (
                <button
                  disabled
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
                >
                  Sebelumnya
                </button>
              )}
              {recipes.links.next ? (
                <Link
                  href={recipes.links.next}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Berikutnya
                </Link>
              ) : (
                <button
                  disabled
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
                >
                  Berikutnya
                </button>
              )}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Menampilkan <span className="font-medium">{recipes.meta.from}</span> sampai{' '}
                  <span className="font-medium">{recipes.meta.to}</span> dari{' '}
                  <span className="font-medium">{recipes.meta.total}</span> resep
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  {/* Previous page */}
                  {recipes.links.prev ? (
                    <Link
                      href={recipes.links.prev}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Sebelumnya</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="relative inline-flex items-center rounded-l-md bg-gray-100 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 cursor-not-allowed"
                    >
                      <span className="sr-only">Sebelumnya</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}

                  {/* Page numbers */}
                  {Array.from({ length: recipes.meta.last_page }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/admin/recipes/pending?page=${page}${filters.search ? `&search=${filters.search}` : ''}`}
                      className={classNames(
                        page === recipes.meta.current_page
                          ? 'relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                          : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                        'focus:z-20'
                      )}
                    >
                      {page}
                    </Link>
                  ))}

                  {/* Next page */}
                  {recipes.links.next ? (
                    <Link
                      href={recipes.links.next}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Berikutnya</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="relative inline-flex items-center rounded-r-md bg-gray-100 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 cursor-not-allowed"
                    >
                      <span className="sr-only">Berikutnya</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

// Utility function
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
