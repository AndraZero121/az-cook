import { Head, Link, usePage } from "@inertiajs/react";
import { ChevronLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import CardRecipe from "@/components/CardRecipe";
import { useState, Suspense } from "react";
import { RecipeCardSkeleton } from "@/components/Skeleton";
import MainLayout from "@/layouts/MainLayout";

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user: {
    name: string;
    profile_photo_path: string | null;
  };
}

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
  comments?: Comment[];
}

interface Props {
  recipe: RecipeDetail;
  relatedRecipes: any[];
}

export default function RecipeReadPage({ recipe, relatedRecipes }: Props) {
  const { auth } = usePage().props as any;
  const [isLiked, setIsLiked] = useState(recipe.is_liked ?? false);
  const [likesCount, setLikesCount] = useState(recipe._count?.likes ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');

  const handleLike = async () => {
    if (!auth.user) {
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/recipes/${recipe.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': document.cookie.match('XSRF-TOKEN=(.*?);')?.[1] || ''
        },
        credentials: 'include'
      });

      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to like recipe');
      }

      // Update UI without page reload
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (err) {
      console.error('Error liking recipe:', err);
      setError('Failed to like recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) {
      window.location.href = '/login';
      return;
    }

    if (!comment.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/recipes/${recipe.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': document.cookie.match('XSRF-TOKEN=(.*?);')?.[1] || ''
        },
        body: JSON.stringify({ content: comment }),
        credentials: 'include'
      });

      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (!response.ok) throw new Error('Failed to post comment');

      // Clear comment and reload comments
      setComment('');
      window.location.reload();
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Head title={recipe.title}/>
      <div className="w-full max-w-7xl m-auto mb-10">
        <Link className="flex items-center px-4.5 mt-4" href="/recipe">
          <ChevronLeft size={18} className="mr-2"/>
          <span>Kembali Ke Daftar Resep</span>
        </Link>

        <div className="mt-6 px-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              {error}
            </div>
          )}

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
              <button
                onClick={handleLike}
                disabled={isLoading}
                className={"flex items-center transition-colors " + (isLoading ? "opacity-50 cursor-not-allowed" : "")}
              >
                <Heart
                  size={24}
                  className={isLiked ? "fill-red-500 stroke-red-500" : ""}
                />
                <span className="ml-1">{likesCount}</span>
              </button>
              <button className="flex items-center">
                <MessageCircle size={24} />
                <span className="ml-1">{recipe._count?.comments ?? 0}</span>
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
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Komentar ({recipe._count?.comments ?? 0})</h2>

            {auth.user ? (
              <form onSubmit={handleComment} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-4 min-h-[100px] resize-none focus:border-blue-500 outline-none"
                  placeholder="Tulis komentar..."
                />
                <button
                  type="submit"
                  className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Kirim
                </button>
              </form>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600">
                  <Link href="/login" className="text-blue-500 hover:underline">Masuk</Link>
                  {" "}untuk memberikan komentar
                </p>
              </div>
            )}

            <div className="space-y-6">
              {recipe.comments?.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={comment.user.profile_photo_path || '/images/default-avatar.png'}
                      alt={comment.user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/default-avatar.png';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{comment.user.name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {relatedRecipes?.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Resep Terkait</h2>
              <div className="flex w-full flex-wrap -mx-2">
                <Suspense fallback={<RecipeCardSkeleton />}>
                  {relatedRecipes.map((recipe) => (
                    <div key={recipe.id} className="w-full px-2 mb-4 md:w-1/2 lg:w-1/3">
                      <CardRecipe
                        data={{
                          image: recipe.image_path,
                          star: recipe._count?.likes ?? 0,
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
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
