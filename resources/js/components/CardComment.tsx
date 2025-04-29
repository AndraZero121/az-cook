import { Link } from "@inertiajs/react";
import { useState } from "react";
import { timeAgo } from "@/lib/utils";
import { Trash2, Reply, Send } from "lucide-react";
import Tooltip from "./Tooltip";

interface CommentProps {
  data: {
    id: number;
    username: string;
    icon: string;
    comment: string;
    date: number;
    recipe?: {
      id: number;
      title: string;
      image: string;
    };
    reply?: string;
  };
  hiddentool?: boolean;
}

export default function CardComment({ data, hiddentool }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState(data.reply || '');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus komentar ini?')) return;

    try {
      const response = await fetch(`/api/comments/${data.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Failed to delete comment');

      // Refresh the page or update UI as needed
      window.location.reload();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Gagal menghapus komentar');
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/comments/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reply: replyText
        })
      });

      if (!response.ok) throw new Error('Failed to reply to comment');

      setIsReplying(false);
      // Refresh the page or update UI as needed
      window.location.reload();
    } catch (error) {
      console.error('Error replying to comment:', error);
      alert('Gagal membalas komentar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      {data.recipe && (
        <Link href={`/recipe/${data.recipe.id}`} className="block">
          <div className="h-32 overflow-hidden">
            <img 
              src={data.recipe.image} 
              alt={data.recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="font-semibold line-clamp-1">{data.recipe.title}</h3>
          </div>
        </Link>
      )}
      
      <div className="p-4">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={data.icon} 
              alt={data.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{data.username}</p>
              <span className="text-sm text-gray-500">{timeAgo(new Date(data.date))}</span>
            </div>
            <p className="mt-1 text-gray-600">{data.comment}</p>

            {data.reply && (
              <div className="mt-3 pl-4 border-l-2 border-blue-200">
                <p className="text-sm font-semibold">Balasan:</p>
                <p className="mt-1 text-sm text-gray-600">{data.reply}</p>
              </div>
            )}

            {!hiddentool && (
              <div className="mt-3 flex items-center space-x-2">
                <Tooltip content="Balas">
                  <button 
                    onClick={() => setIsReplying(!isReplying)}
                    className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
                  >
                    <Reply size={18}/>
                  </button>
                </Tooltip>
                <Tooltip content="Hapus">
                  <button 
                    onClick={handleDelete}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18}/>
                  </button>
                </Tooltip>
              </div>
            )}

            {isReplying && (
              <div className="mt-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-blue-500"
                  placeholder="Tulis balasan..."
                  rows={3}
                />
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => setIsReplying(false)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleReply}
                    disabled={loading || !replyText.trim()}
                    className="px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center disabled:opacity-50"
                  >
                    {loading ? (
                      'Membalas...'
                    ) : (
                      <>
                        <Send size={14} className="mr-1"/>
                        Balas
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
