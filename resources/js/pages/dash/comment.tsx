import { Head } from "@inertiajs/react";
import CardComment from "@/components/CardComment";
import DashLayout from "@/layouts/DashLayout";
import { useState, useEffect } from "react";

interface Comment {
  id: number;
  username: string;
  icon: string;
  comment: string;
  date: number;
  recipe: {
    id: number;
    title: string;
    image: string;
  };
}

export default function CommentManagement() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unanswered'>('all');

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/comments?filter=${filter}`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashLayout>
      <Head title="Manajemen Komentar"/>
      
      <div className="w-full max-w-7xl mx-auto py-8">
        <div className="px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Manajemen Komentar</h1>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unanswered')}
              className="rounded-lg border border-gray-200 px-4 py-2"
            >
              <option value="all">Semua Komentar</option>
              <option value="unanswered">Belum Dijawab</option>
            </select>
          </div>

          <div className="mt-8 space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading comments...</div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <CardComment 
                  key={comment.id} 
                  data={comment}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {filter === 'all' 
                  ? 'Belum ada komentar pada resep Anda.'
                  : 'Tidak ada komentar yang belum dijawab.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashLayout>
  );
}