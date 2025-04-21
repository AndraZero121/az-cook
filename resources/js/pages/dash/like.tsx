import CardRecipe from '@/components/CardRecipe';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeftIcon } from 'lucide-react';

const likeRecipe = [
  {
    image: 'https://www.masakapahariini.com/wp-content/uploads/2020/12/spaghetti-carbonara-500x300.jpg',
    star: 4,
    title: 'Spaghetti Carbonara',
    description: 'A creamy, cheesy, and comforting Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    date: new Date().getTime() - 1000 * 60 * 4,
    creator: {
      icon: 'https://randomuser.me/api/portraits/women/44.jpg',
      username: 'chef_amelia',
    },
    slug: 'spaghetti-carbonara',
  },
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    star: 5,
    title: 'Sushi Platter',
    description: 'A beautiful assortment of fresh sushi rolls, sashimi, and nigiri perfect for seafood lovers.',
    date: new Date().getTime() - 1000 * 60 * 9,
    creator: {
      icon: 'https://randomuser.me/api/portraits/men/21.jpg',
      username: 'sushimaster_ken',
    },
    slug: 'sushi-platter',
  },
  {
    image: 'https://sixhungryfeet.com/wp-content/uploads/2021/01/Vegan-Buddha-Bowl-with-Tofu-2.jpg',
    star: 4,
    title: 'Vegan Buddha Bowl',
    description: 'A healthy and colorful bowl filled with quinoa, roasted veggies, hummus, and fresh greens.',
    date: new Date().getTime() - 1000 * 60 * 24,
    bookmark: true,
    creator: {
      icon: 'https://randomuser.me/api/portraits/women/68.jpg',
      username: 'green_goddess',
    },
    slug: 'vegan-buddha-bowl',
  },
]

export default function LikeManagePage() {
  return <>
    <Head title='Manage Comment'/>
    <div className='max-w-7xl m-auto'>
      <Link className='flex items-center px-4.5' href='/dash'>
        <ChevronLeftIcon size={18} className='mr-2'/>
        <span>Kembali Ke Halaman Utama</span>
      </Link>
      <div className="mt-5 flex w-full flex-wrap px-4">
        {likeRecipe.map((b, c) => (
          <div key={c} className="mb-3.5 flex w-full px-2 md:w-[calc(100%/2)] lg:w-[calc(100%/3)]">
            <CardRecipe data={b} />
          </div>
        ))}
      </div>
    </div>
  </>
}