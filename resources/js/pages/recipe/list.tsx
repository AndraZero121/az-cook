import CardRecipe from '@/components/CardRecipe';
import { Head, Link } from '@inertiajs/react';
import { Search, ChevronRight } from 'lucide-react';

// DUMMNY DATA CONTENT
const sampleDataContent = [
  {
    label: 'Most Search',
    viewmore: '/recipe',
    list: [
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
    ],
  },
];

export default function RecipePage() {
  return <>
    <Head title="Ingin Mencari Resep Makanan?!"/>
    <div className="w-full max-w-7xl m-auto h-[240px] flex justify-center items-center flex-col px-6 border-b border-gray-100">
      <div className="mb-5">
        <h1 className="font-bold text-2xl text-center">Ingin Mencari Resep Makanan?!</h1>
      </div>
      <form className="w-full max-w-3xl flex items-center bg-gray-50 rounded-md overflow-hidden border border-gray-200 shadow-md">
        <input
          type="text"
          name="search_results"
          className="w-[calc(100%-50px)] outline-none px-4 p-2"
          placeholder="Cari resep disini..."
        />
        <button type="submit" aria-label="Search!" className="flex items-center justify-center w-[50px] cursor-pointer">
          <Search size={20}/>
        </button>
      </form>
    </div>
    <div className="w-full pt-4">
      {sampleDataContent.map((a, i) => (
        <div className="m-auto my-5 w-full max-w-7xl" key={i}>
          <div className="flex justify-between px-6">
            <h2 className="text-3xl font-bold">{a.label}</h2>
          </div>
          <div className="mt-5 flex w-full flex-wrap px-4">
            {a.list.map((b, c) => (
              <div key={c} className="mb-3.5 flex w-full px-2 md:w-[calc(100%/2)] lg:w-[calc(100%/3)]">
                <CardRecipe data={b} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
}