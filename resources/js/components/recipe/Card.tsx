import { Heart } from "lucide-react";
import { Link } from "@inertiajs/react";
import { BookmarkButton } from "@/components";

interface Props {
  data: {
    id: number;
    image: string;
    title: string;
    description: string;
    likes: number;
    isBookmarked?: boolean;
    date: number;
    author: {
      name: string;
      avatar: string;
    };
    categories?: {
      id: number;
      name: string;
      slug: string;
    }[];
  };
}

export function CardRecipe({ data }: Props) {
  return (
    <div className="group h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-blue-100 hover:shadow-lg">
      {/* Recipe Image */}
      <Link href={`/recipe/${data.id}`} className="block aspect-video w-full overflow-hidden">
        <img
          src={data.image || '/recipe-placeholder.jpg'}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/recipe/${data.id}`}>
          <h3 className="mb-2 line-clamp-1 font-semibold hover:text-blue-600">
            {data.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {data.description}
        </p>

        {/* Author */}
        <div className="mb-3 flex items-center gap-2">
          <img
            src={data.author.avatar || '/default-avatar.png'}
            alt={data.author.name}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-sm text-gray-700">{data.author.name}</span>
        </div>

        {/* Categories */}
        {data.categories && data.categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {data.categories.map(category => (
              <Link
                key={category.id}
                href={`/recipe?category=${category.slug}`}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1 text-gray-500">
            <Heart size={16} />
            <span className="text-sm">{data.likes}</span>
          </div>

          <div className="flex items-center gap-4">
            <BookmarkButton
              recipeId={data.id}
              isBookmarked={data.isBookmarked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
