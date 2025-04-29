import CardRecipe from '@/components/CardRecipe';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

interface Category {
  id: number;
  name: string;
  slug: string;
  image_path?: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  image_path: string;
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
  categories: Category[];
  filters: {
    search?: string;
    category?: string;
  };
}

export default function RecipePage({ recipes, categories, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

  // Update URL with filters
  const updateFilters = debounce((newSearch?: string, newCategory?: string) => {
    const query: Record<string, string> = {};
    if (newSearch) query.search = newSearch;
    if (newCategory) query.category = newCategory;

    router.get('/recipe', query, {
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  }, 300);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(search, selectedCategory);
  };

  const handleCategoryClick = (slug: string) => {
    const newCategory = selectedCategory === slug ? '' : slug;
    setSelectedCategory(newCategory);
    updateFilters(search, newCategory);
  };

  return <>
    <Head title="Ingin Mencari Resep Makanan?!" />
    <div className="w-full max-w-7xl m-auto h-[240px] flex justify-center items-center flex-col px-6 border-b border-gray-100">
      <div className="mb-5">
        <h1 className="font-bold text-2xl text-center">Ingin Mencari Resep Makanan?!</h1>
      </div>
      <form onSubmit={handleSearch} className="w-full max-w-3xl flex items-center bg-gray-50 rounded-md overflow-hidden border border-gray-200 shadow-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[calc(100%-50px)] outline-none px-4 p-2"
          placeholder="Cari resep disini..."
        />
        <button type="submit" aria-label="Search!" className="flex items-center justify-center w-[50px] cursor-pointer">
          <Search size={20} />
        </button>
      </form>
    </div>

    <div className="w-full max-w-7xl mx-auto py-6">
      {/* Categories */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Kategori</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe List */}
      {recipes.data.length > 0 ? (
        <>
          <div className="flex w-full flex-wrap px-4">
            {recipes.data.map((recipe) => (
              <div key={recipe.id} className="mb-3.5 flex w-full px-2 md:w-[calc(100%/2)] lg:w-[calc(100%/3)]">
                <CardRecipe
                  data={{
                    image: recipe.image_path,
                    star: recipe._count?.likes || 0,
                    title: recipe.title,
                    description: recipe.description,
                    date: new Date(recipe.created_at).getTime(),
                    creator: {
                      icon: recipe.user.profile_photo_path || '/default-avatar.png',
                      username: recipe.user.name,
                    },
                    slug: recipe.id.toString(),
                    bookmark: recipe.is_bookmarked
                  }}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {recipes.last_page > 1 && (
            <div className="w-full flex justify-center gap-2 py-6">
              {recipes.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.url || '#'}
                  className={`px-4 py-2 rounded-md border ${
                    link.active
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
        <div className="w-full text-center py-12">
          <p className="text-gray-500 mb-4">Tidak ada resep yang ditemukan.</p>
          {(search || selectedCategory) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
                router.get('/recipe', {}, { preserveState: true });
              }}
              className="text-blue-600 hover:underline"
            >
              Hapus filter
            </button>
          )}
        </div>
      )}
    </div>
  </>;
}
