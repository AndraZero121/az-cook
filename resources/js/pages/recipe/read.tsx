import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import CardRecipe from "@/components/CardRecipe";
import { useState } from "react";

interface RecipeDetail {
  id: number;
  title: string;
  description: string;
  image_path: string;
  cooking_time?: number;
  servings?: number;
  difficulty: 'mudah' | 'sedang' | 'sulit';
  created_at: string;
  user: {
    id: number;
    name: string;
    profile_photo_path: string | null;
  };
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  ingredients: {
    id: number;
    quantity: number;
    unit: string;
    notes?: string;
    ingredient: {
      id: number;
      name: string;
    };
  }[];
  steps: {
    id: number;
    order: number;
    description: string;
    image_path: string | null;
  }[];
  _count: {
    likes: number;
    comments: number;
  };
  is_liked?: boolean;
  is_bookmarked?: boolean;
}

interface Props {
  recipe: RecipeDetail;
  relatedRecipes: any[];
}

export default function RecipeReadPage({ recipe, relatedRecipes }: Props) {
  const [isLiked, setIsLiked] = useState(recipe.is_liked);
  const [likesCount, setLikesCount] = useState(recipe._count.likes);

  const handleLike = () => {
    fetch(`/api/recipes/${recipe.id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(() => {
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    });
  };

  return <>
    <Head title={recipe.title}/>
    <div className="w-full max-w-7xl m-auto mb-10">
      <Link className="flex items-center px-4.5 mt-4" href="/recipe">
        <ChevronLeft size={18} className="mr-2"/>
        <span>Kembali Ke Daftar Resep</span>
      </Link>

      <div className="mt-6 px-6">
        <div className="flex items-start justify-between">
          <div className="w-[calc(100%-200px)]">
            <h1 className="text-4xl font-bold">{recipe.title}</h1>
            <div className="mt-2 flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={recipe.user.profile_photo_path || '/default-avatar.png'}
                  alt={recipe.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-2">{recipe.user.name}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleLike} className="flex items-center">
              <Heart
                size={24}
                className={isLiked ? "fill-red-500 stroke-red-500" : ""}
              />
              <span className="ml-1">{likesCount}</span>
            </button>
            <button className="flex items-center">
              <MessageCircle size={24} />
              <span className="ml-1">{recipe._count.comments}</span>
            </button>
            <button>
              <Share2 size={24} />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <img
              src={recipe.image_path}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
          <p className="text-gray-600">{recipe.description}</p>
        </div>

        <div className="mt-8">
          <div className="flex items-center space-x-6">
            {recipe.cooking_time && (
              <div>
                <p className="font-bold">Waktu Memasak</p>
                <p className="text-gray-600">{recipe.cooking_time} menit</p>
              </div>
            )}
            {recipe.servings && (
              <div>
                <p className="font-bold">Porsi</p>
                <p className="text-gray-600">{recipe.servings} orang</p>
              </div>
            )}
            <div>
              <p className="font-bold">Tingkat Kesulitan</p>
              <p className="text-gray-600 capitalize">{recipe.difficulty}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Bahan-bahan</h2>
          <div className="space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex items-center">
                <span className="w-24">{ingredient.quantity} {ingredient.unit}</span>
                <span>{ingredient.ingredient.name}</span>
                {ingredient.notes && (
                  <span className="ml-2 text-gray-500">({ingredient.notes})</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Langkah-langkah</h2>
          <div className="space-y-6">
            {recipe.steps.map((step) => (
              <div key={step.id} className="flex">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                  {step.order}
                </div>
                <div className="ml-4">
                  <p>{step.description}</p>
                  {step.image_path && (
                    <div className="mt-2 w-full max-w-xl aspect-video rounded-lg overflow-hidden">
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
        </div>

        {relatedRecipes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Resep Terkait</h2>
            <div className="flex w-full flex-wrap -mx-2">
              {relatedRecipes.map((recipe) => (
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
          </div>
        )}
      </div>
    </div>
  </>;
}
