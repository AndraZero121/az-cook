import { Head, Link } from "@inertiajs/react";
import { Users, BookOpen, Clock, CheckCircle } from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";

interface Stats {
  totalUsers: number;
  totalRecipes: number;
  pendingRecipes: number;
  approvedRecipes: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface Recipe {
  id: number;
  title: string;
  status: string;
  created_at: string;
  user: {
    id: number;
    name: string;
  };
}

interface Props {
  stats: Stats;
  recentUsers: User[];
  recentRecipes: Recipe[];
}

export default function AdminDashboard({ stats, recentUsers, recentRecipes }: Props) {
  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />

      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Admin</h1>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Stats Cards */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Pengguna</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">{stats.totalUsers}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/admin/users" className="font-medium text-blue-600 hover:text-blue-900">Lihat semua</Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Resep</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">{stats.totalRecipes}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/admin/recipes" className="font-medium text-blue-600 hover:text-blue-900">Lihat semua</Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Resep Menunggu</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">{stats.pendingRecipes}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/admin/recipes/pending" className="font-medium text-blue-600 hover:text-blue-900">Lihat semua</Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Resep Disetujui</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">{stats.approvedRecipes}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/admin/recipes" className="font-medium text-blue-600 hover:text-blue-900">Lihat semua</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Users */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Pengguna Terbaru</h2>
              <Link href="/admin/users" className="text-sm font-medium text-blue-600 hover:text-blue-900">
                Lihat semua
              </Link>
            </div>
            <div className="border-t border-gray-200 divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <div key={user.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">{user.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Recipes */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Resep Terbaru</h2>
              <Link href="/admin/recipes" className="text-sm font-medium text-blue-600 hover:text-blue-900">
                Lihat semua
              </Link>
            </div>
            <div className="border-t border-gray-200 divide-y divide-gray-200">
              {recentRecipes.map((recipe) => (
                <div key={recipe.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">{recipe.title}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        recipe.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : recipe.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {recipe.status === 'approved' ? 'Disetujui' : recipe.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Oleh: {recipe.user.name}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        {new Date(recipe.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
