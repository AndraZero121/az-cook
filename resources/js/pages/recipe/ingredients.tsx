import { Head } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import CardRecipe from "@/components/CardRecipe";
import { useState } from "react";
import { Search, Loader2, X } from "lucide-react";

interface Ingredient {
  id: number;
  name: string;
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

interface Props {
  ingredients: Ingredient[];
}

export default function RecipeByIngredients({ ingredients }: Props) {
  const [searchInput, setSearchInput] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [searchResults, setSearchResults] = useState<{
    data: { list: Recipe[] };
    loading: boolean;
  }>({ data: { list: [] }, loading: false });

  const filteredIngredients = ingredients.filter(ing =>
    ing.name.toLowerCase().includes(searchInput.toLowerCase()) &&
    !selectedIngredients.some(selected => selected.id === ing.id)
  );

  const handleSelectIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setSearchInput('');
  };

  const handleRemoveIngredient = (ingredientId: number) => {
    setSelectedIngredients(selectedIngredients.filter(ing => ing.id !== ingredientId));
  };

  const searchRecipes = async () => {
    if (selectedIngredients.length === 0) {
      setSearchResults({ data: { list: [] }, loading: false });
      return;
    }

    setSearchResults(prev => ({ ...prev, loading: true }));

    try {
      const response = await fetch('/api/recipes/search-by-ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: selectedIngredients.map(ing => ing.id)
        })
      });

      if (!response.ok) throw new Error('Failed to fetch recipes');

      const data = await response.json();
      setSearchResults({ data: { list: data.recipes }, loading: false });
    } catch (error) {
      console.error('Error searching recipes:', error);
      setSearchResults({ data: { list: [] }, loading: false });
    }
  };

  return (
    <MainLayout>
      <Head title="Cari Resep Dari Bahan - Bahan?!"/>

      <div className="w-full max-w-7xl mx-auto h-[240px] flex justify-center items-center flex-col px-6 border-b border-gray-100">
        <div className="mb-5">
          <h1 className="font-bold text-2xl text-center">Cari Resep Dari Bahan - Bahan?!</h1>
        </div>

        <div className="w-full max-w-3xl bg-gray-50 rounded-md overflow-hidden border border-gray-200 shadow-md">
          <div className="flex items-center px-4 py-2 overflow-x-auto">
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 shrink-0"
              >
                <span>{ingredient.name}</span>
                <button
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                  className="ml-2 hover:text-blue-900"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 outline-none bg-transparent min-w-[200px] placeholder-gray-400"
              placeholder={selectedIngredients.length === 0 ? "Ketik nama bahan..." : "Tambah bahan lain..."}
            />
          </div>
          {searchInput && filteredIngredients.length > 0 && (
            <div className="border-t border-gray-200 max-h-[200px] overflow-y-auto">
              {filteredIngredients.map((ingredient) => (
                <button
                  key={ingredient.id}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleSelectIngredient(ingredient)}
                >
                  {ingredient.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={searchRecipes}
          disabled={selectedIngredients.length === 0 || searchResults.loading}
          className={"mt-4 px-6 py-2 rounded-md text-white transition-colors " +
            (selectedIngredients.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600")}
        >
          <span className="flex items-center">
            {searchResults.loading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2"/>
                Mencari...
              </>
            ) : (
              <>
                <Search size={18} className="mr-2"/>
                Cari Resep
              </>
            )}
          </span>
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto py-8">
        <div className="px-6">
          {searchResults.data.list.length > 0 ? (
            <div className="flex flex-wrap -mx-2">
              {searchResults.data.list.map((recipe) => (
                <div key={recipe.id} className="w-full px-2 mb-4 md:w-1/2 lg:w-1/3">
                  <CardRecipe
                    data={{
                      image: recipe.image_path || '/default-recipe.jpg', // Tambahkan fallback image
                      star: recipe._count?.likes || 0,
                      title: recipe.title,
                      description: recipe.description,
                      date: new Date(recipe.created_at).getTime(),
                      creator: {
                        icon: recipe.user.profile_photo_path || '/default-avatar.png', // Tambahkan fallback avatar
                        username: recipe.user.name
                      },
                      slug: recipe.id.toString(),
                      bookmark: recipe.is_bookmarked
                    }}
                  />
                </div>
              ))}
            </div>
          ) : selectedIngredients.length > 0 && !searchResults.loading ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ditemukan resep dengan bahan-bahan tersebut.
            </div>
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
}
