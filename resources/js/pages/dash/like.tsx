import { Head } from "@inertiajs/react";
import DashLayout from "@/layouts/DashLayout";
import CardRecipe from "@/components/CardRecipe";
import { useState, useEffect } from "react";

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

export default function LikedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/liked-recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes);
        setLoading(false);
      });
  }, []);

  return (
    <DashLayout>
      <Head title="Resep Yang Disukai"/>
      
      <div className="w-full max-w-7xl mx-auto py-8">
        <div className="px-6">
          <h1 className="text-3xl font-bold">Resep Yang Disukai</h1>

          <div className="mt-8">
            {loading ? (
              <div className="text-center py-8">Loading recipes...</div>
            ) : recipes.length > 0 ? (
              <div className="flex flex-wrap -mx-2">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="w-full px-2 mb-4 md:w-1/2 lg:w-1/3">
                    <CardRecipe 
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
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Anda belum menyukai resep apapun.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
