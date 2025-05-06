import { Link } from "@inertiajs/react";
import { Bookmark, Star } from "lucide-react";
import { useState } from "react";
import { timeAgo } from "@/lib/utils";

interface CardRecipeProps {
  data: {
    image: string;
    star: number;
    title: string;
    description: string;
    date: number;
    creator: {
      icon: string | null;
      username: string;
    };
    slug: string;
    bookmark?: boolean;
  };
}

export default function CardRecipe({ data }: CardRecipeProps) {
  const [isBookmarked, setIsBookmarked] = useState(data.bookmark);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    try {
      const response = await fetch(`/api/recipes/${data.slug}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (!response.ok) throw new Error('Failed to toggle bookmark');
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      href={route('recipe.show', { id: data.slug })}
      className="block w-full h-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md duration-200"
      preserveScroll
    >
      <div className="w-full aspect-video relative overflow-hidden">
        <img
          src={imageError ? '/images/default-recipe.jpg' : (data.image || '/images/default-recipe.jpg')}
          alt={data.title}
          className="w-full h-full object-cover transition-opacity duration-200"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400"/>
            <span className="ml-1 text-sm">{data.star}</span>
          </div>
          <button
            onClick={handleBookmark}
            className={"bg-white/90 backdrop-blur-sm p-1.5 rounded-md hover:bg-white transition-all " +
              (isLoading ? "opacity-50 cursor-not-allowed" : "")}
            type="button"
            disabled={isLoading}
          >
            <Bookmark
              size={16}
              className={isBookmarked ? "fill-blue-500 stroke-blue-500" : ""}
            />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-1">{data.title}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{data.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                src={data.creator.icon || '/images/default-avatar.png'}
                alt={data.creator.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/default-avatar.png';
                }}
              />
            </div>
            <span className="ml-2 text-sm">{data.creator.username}</span>
          </div>
          <span className="text-sm text-gray-500">{timeAgo(new Date(data.date))}</span>
        </div>
      </div>
    </Link>
  );
}
