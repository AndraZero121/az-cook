import { Head, Link } from "@inertiajs/react";
import CardRecipe from '@/components/CardRecipe';

interface Recipe {
  id: number;
  title: string;
  image_path: string;
  description: string;
  user: {
    name: string;
    profile_photo_path: string;
  };
  created_at: string;
  _count: {
    likes: number;
  };
}

interface Props {
  recipes: {
    data: Recipe[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
}

export default function BookmarkPage({ recipes }: Props) {
  return <>
    <Head title="Bookmark" />
    <div className="max-w-7xl m-auto px-6 mt-3">
      <div className="flex justify-between px-6">
        <h2 className="text-3xl font-bold">Bookmark</h2>
      </div>

      {recipes.data.length > 0 ? (
        <>
          <div className="mt-5 flex w-full flex-wrap px-4">
            {recipes.data.map((recipe) => (
              <div key={recipe.id} className="mb-3.5 flex w-full px-2 md:w-[calc(100%/2)] lg:w-[calc(100%/3)]">
                <CardRecipe data={{
                  image: recipe.image_path,
                  star: recipe._count.likes,
                  title: recipe.title,
                  description: recipe.description,
                  date: new Date(recipe.created_at).getTime(),
                  bookmark: true,
                  creator: {
                    icon: recipe.user.profile_photo_path || '/default-avatar.png',
                    username: recipe.user.name,
                  },
                  slug: recipe.id.toString(),
                }} />
              </div>
            ))}
          </div>

          {recipes.last_page > 1 && (
            <div className="w-full flex justify-center gap-2 py-6">
              {recipes.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.url || '#'}
                  className={`px-4 py-2 rounded-md border ${link.active
                      ? 'border-blue-600 text-blue-600'
                      : 'border-gray-300 hover:border-blue-600 hover:text-blue-600'
                    } ${!link.url ? 'opacity-50 pointer-events-none' : 'hover:scale-105 active:scale-95'} duration-150`}
                  preserveScroll
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="w-full py-8 text-center">
          <p className="text-gray-500">Belum ada resep yang di-bookmark.</p>
          <Link
            href="/recipe"
            className="inline-block mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            Jelajahi Resep
          </Link>
        </div>
      )}
    </div>
  </>
}