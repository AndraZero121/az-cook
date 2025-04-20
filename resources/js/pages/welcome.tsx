import CardRecipe from '@/components/CardRecipe';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

function WaveDecoration({ ...props }) {
  return (
    <svg id="visual" viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" version="1.1" {...props}>
      <g transform="translate(228.17353594252566 214.47984431155425)">
        <path
          d="M105.6 -165.6C142.6 -161.6 182.1 -144.8 206 -115.1C229.8 -85.3 237.9 -42.7 238.9 0.6C239.9 43.8 233.8 87.7 218.9 132.8C203.9 177.9 180.1 224.3 142.1 235C104.2 245.8 52.1 220.9 9.1 205.1C-33.8 189.3 -67.7 182.5 -101.7 169.5C-135.8 156.5 -170.1 137.3 -185.7 108C-201.3 78.7 -198.1 39.3 -175.3 13.2C-152.6 -13 -110.1 -26 -89.6 -46.8C-69.1 -67.6 -70.6 -96.2 -59.3 -115C-48 -133.8 -24 -142.9 5.2 -151.9C34.3 -160.8 68.7 -169.6 105.6 -165.6"
          fill="#4b53da"
        ></path>
      </g>
    </svg>
  );
}

// DUMMNY DATA CONTENT
const sampleDataContent = [
  {
    label: 'Trending Recipe',
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
        creator: {
          icon: 'https://randomuser.me/api/portraits/men/21.jpg',
          username: 'sushimaster_ken',
        },
        slug: 'sushi-platter',
      },
    ],
  },
  {
    label: 'New Recipe',
    viewmore: '/recipe?shortList=new',
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
    ],
  },
];

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;
  return (
    <>
      <div className="-z-10 m-auto flex w-full max-w-7xl items-start justify-end overflow-hidden">
        <div className="absolute top-0 -z-10 mt-[-190px] rotate-180">
          <WaveDecoration />
        </div>
      </div>
      <div className="m-auto flex w-full max-w-7xl flex-wrap items-center px-6 max-md:mb-[30px] max-md:flex-col-reverse md:h-[490px]">
        <div className="w-full md:w-[calc(100%-400px)] md:pr-5 lg:w-[calc(100%-550px)]">
          <h1 className="text-4xl font-bold">
            Flavorful <span className="text-blue-500">Packet</span>
          </h1>
          <p className="mt-4.5 line-clamp-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices augue sapien, quis pharetra enim tincidunt vitae. Nulla commodo
            lectus sed ipsum finibus, vitae eleifend quam mollis. Suspendisse dictum velit est, sed malesuada eros tincidunt non. Pellentesque vel
            mollis arcu. Integer eu dignissim eros, et auctor dui. Nullam ut nibh sed mauris sollicitudin maximus sed a nisi. Nullam semper blandit
            egestas. Vestibulum aliquam nulla eu aliquam ullamcorper. Ut odio lorem, porta ac eros in, facilisis suscipit lacus. Nam fermentum sem
            velit, eu tristique nibh pretium ac. Aliquam accumsan luctus sapien, sit amet gravida massa suscipit at.
          </p>
          <button className="mt-4 cursor-pointer rounded-3xl bg-blue-500 p-2.5 px-6 text-white shadow-md duration-150 hover:bg-blue-600 active:scale-95">
            <span className="font-bold">Lihat Resepnya</span>
          </button>
        </div>
        <div className="mt-[30px] mb-[10px] flex w-full justify-center md:h-[490px] md:w-[400px] lg:w-[550px]">
          <img
            width="400px"
            className="h-full w-full max-w-[400px] object-contain xl:max-w-[550px]"
            src="https://upsidefoods.com/_next/image?url=https%3A%2F%2Fcms.upsidefoods.com%2Fwp-content%2Fuploads%2F2023%2F01%2FFood_Flavor-Packed.png&w=828&q=75"
            alt="Source: https://upsidefoods.com/food"
          />
        </div>
      </div>
      <div className="w-full">
        {sampleDataContent.map((a, i) => (
          <div className="m-auto my-5 w-full max-w-7xl">
            <div className="flex justify-between px-6">
              <h2 className="text-3xl font-bold">{a.label}</h2>
              {a.viewmore && (
                <Link href={a.viewmore} className="flex items-center">
                  <span className="mr-2 font-bold">Lihat lainnya</span>
                  <ChevronRight size={18} />
                </Link>
              )}
            </div>
            <div className="mt-5 flex w-full flex-wrap px-4">
              {[...a.list].slice(0, 6).map((b, c) => (
                <div key={c} className="mb-3.5 flex w-full px-2 md:w-[calc(100%/2)] lg:w-[calc(100%/3)]">
                  <CardRecipe data={b} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
