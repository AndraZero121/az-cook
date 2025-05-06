import { useState } from 'react';
import { Bookmark as BookmarkIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface Props {
  recipeId: number;
  isBookmarked?: boolean;
  className?: string;
  showText?: boolean;
}

export default function BookmarkButton({
  recipeId,
  isBookmarked: initialIsBookmarked = false,
  className = '',
  showText = false
}: Props) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleBookmark = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`/api/recipes/${recipeId}/bookmark`);
      setIsBookmarked(response.data.status);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Gagal mengubah status bookmark');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={isLoading}
      className={`flex items-center gap-2 rounded-lg transition-all duration-200 ${
        isBookmarked
          ? 'text-blue-600 hover:text-blue-700'
          : 'text-gray-500 hover:text-gray-700'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <BookmarkIcon
        size={20}
        className={isBookmarked ? 'fill-current' : ''}
      />
      {showText && (
        <span className="text-sm font-medium">
          {isBookmarked ? 'Tersimpan' : 'Simpan'}
        </span>
      )}
    </button>
  );
}
