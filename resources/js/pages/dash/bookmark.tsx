import { Head, Link } from "@inertiajs/react";
import { Recipe } from "@/types";
import { CardRecipe } from "@/components/recipe/Card";
import { Bookmark } from "lucide-react";

interface Props {
  recipes: {
    data: Recipe[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    current_page: number;
    last_page: number;
  };
}

export default function BookmarkPage({ recipes }: Props) {
  return (
    <>
      <Head title="Bookmark" />
      <div className="max-w-7xl m-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Resep Tersimpan</h1>
        </div>

        {recipes.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.data.map((recipe) => (
                <CardRecipe
                  key={recipe.id}
                  data={{
                    id: recipe.id,
                    image: recipe.image_path,
                    title: recipe.title,
                    description: recipe.description,
                    likes: recipe._count?.likes ?? 0,
                    isBookmarked: true,
                    date: new Date(recipe.created_at).getTime(),
                    author: {
                      name: recipe.user.name,
                      avatar: recipe.user.profile_photo_path || '',
                    },
                    categories: recipe.categories,
                  }}
                />
              ))}
            </div>

            {recipes.last_page > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {recipes.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url || '#'}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      link.active
                        ? 'border-blue-600 text-blue-600'
                        : 'border-gray-300 hover:border-blue-600 hover:text-blue-600'
                    } ${
                      !link.url
                        ? 'opacity-50 pointer-events-none'
                        : 'hover:scale-105 active:scale-95'
                    }`}
                    preserveScroll
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Belum ada resep tersimpan</h2>
            <p className="text-gray-500 mb-6">
              Simpan resep favoritmu untuk dilihat nanti
            </p>
            <Link
              href="/recipe"
              className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Jelajahi Resep
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
