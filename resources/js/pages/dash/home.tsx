import { Head, Link } from "@inertiajs/react";
import { PenIcon, ArrowRight, ChevronRight, PlusIcon, BookOpen, Heart, MessageSquare } from 'lucide-react';
import CardRecipe from "@/components/CardRecipe";
import CardComment from "@/components/CardComment";
import { useEffect, useState } from "react";
import DashLayout from "@/layouts/DashLayout";

interface Stats {
  pendingRecipes: number;
  approvedRecipes: number;
  rejectedRecipes: number;
  totalLikes: number;
  bookmarks: number;
  likes: number;
}

interface Recipe {
  id: number;
  image_path: string;
  title: string;
  description: string;
  created_at: string;
  user: {
    name: string;
    profile_photo_path: string | null;
  };
  _count?: {
    likes: number;
  };
  is_bookmarked?: boolean;
}

interface User {
  name: string;
  profile_photo_path: string | null;
  bio: string;
}

export default function HomeDashboard({ auth, stats, myRecipes }: { auth: any, stats: Stats, myRecipes: Recipe[] }) {
  const [activeTab, setActiveTab] = useState('recipes');

  const statsItems = [
    {
      label: "Total Resep",
      value: stats.approvedRecipes + stats.pendingRecipes,
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      label: "Total Like",
      value: stats.totalLikes,
      icon: Heart,
      color: "text-red-500"
    },
    {
      label: "Komentar",
      value: stats.bookmarks,
      icon: MessageSquare,
      color: "text-green-500"
    }
  ];

  return (
    <DashLayout title="Dashboard">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            <img
              src={auth.user.profile_photo_path || '/default-avatar.png'}
              alt={auth.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-2xl font-bold">{auth.user.name}</h1>
              <Link
                href="/profile"
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <PenIcon size={16}/>
                Edit Profil
              </Link>
            </div>
            <p className="text-gray-600 mb-4">{auth.user.bio || 'Belum ada bio'}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statsItems.map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 flex items-center gap-4">
                  <div className={`p-3 rounded-full ${item.color} bg-opacity-10`}>
                    <item.icon className={item.color} size={24}/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="text-xl font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('recipes')}
              className={`pb-4 font-medium ${
                activeTab === 'recipes'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Resep Saya
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`pb-4 font-medium ${
                activeTab === 'draft'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Draft
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {activeTab === 'recipes' ? 'Resep Saya' : 'Draft Resep'}
            </h2>
            <Link
              href="/dash/add"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
            >
              <PlusIcon size={16}/>
              Buat Resep Baru
            </Link>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRecipes.map((recipe) => (
              <CardRecipe
                key={recipe.id}
                data={{
                  image: recipe.image_path,
                  star: recipe._count?.likes || 0,
                  title: recipe.title,
                  description: recipe.description,
                  date: new Date(recipe.created_at).getTime(),
                  creator: {
                    icon: recipe.user.profile_photo_path || '/default-avatar.png',
                    username: recipe.user.name
                  },
                  slug: recipe.id.toString(),
                  bookmark: recipe.is_bookmarked
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
