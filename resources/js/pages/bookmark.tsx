import { Head } from "@inertiajs/react";
import CardRecipe from '@/components/CardRecipe';

const sampleDataContent = [
  {
    image: 'https://www.masakapahariini.com/wp-content/uploads/2020/12/spaghetti-carbonara-500x300.jpg',
    star: 4,
    title: 'Spaghetti Carbonara',
    description: 'A creamy, cheesy, and comforting Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    date: new Date().getTime() - 1000 * 60 * 4,
    bookmark: true,
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
    bookmark: true,
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

export default function BookmarkPage() {
  return <>
    <Head title="Bookmark"/>
    <div className="max-w-7xl m-auto px-6 mt-3">
      <div className="flex justify-between px-6">
        <h2 className="text-3xl font-bold">Bookmark</h2>
      </div>
      <div className="mt-5 flex w-full flex-wrap px-4">
        {[...sampleDataContent,...sampleDataContent,...sampleDataContent].map((b, c) => (
          <div key={c} className="mb-3.5 flex w-full px-2 md:w-[calc(100%/2)] lg:w-[calc(100%/3)]">
            <CardRecipe data={b} />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center py-6">
        <button className="p-2 px-4 rounded-md border border-gray-300 cursor-pointer hover:scale-105 hover:border-blue-600 hover:text-blue-600 active:scale-95 duration-150 select-none">
          <span className="text-sm font-bold">Memuat lainnya</span>
        </button>
      </div>
    </div>
  </>
}