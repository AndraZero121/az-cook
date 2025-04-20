import CardComment from '@/components/CardComment';
import CardRecipe from '@/components/CardRecipe';
import { Head, Link } from '@inertiajs/react';
import { Search, ChevronRight, ArrowRight, PlusIcon, PenIcon } from 'lucide-react';

// DUMMNY DATA CONTENT
const listCommentDummy = [
  {
    username: "Konota",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Artikel ini sangat membantu, terima kasih!",
    id: 1
  },
  {
    username: "Rahmi",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Saya suka penjelasannya, mudah dipahami.",
    id: 2
  },
  {
    username: "rina_takasih",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Bisa tolong dijelaskan lebih detail bagian terakhir?",
    id: 3
  },
  {
    username: "ridho_pratama",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Kerja bagus. Lanjutkan.",
    id: 4
  },
  {
    username: "niku",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Terima kasih banyak, sangat informatif.",
    id: 5
  }
]
const sampleDataContent = [
  {
    label: "Resepmu",
    rgtbtn: {
      label: "Buat baru",
      path: "/dash/add"
    },
    list: [
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
    ]
  },
  {
    label: "Menyukai Resep",
    rgtbtn: {
      label: "Lainnya",
      path: "/dash/like",
      normalicon: true,
    },
    list: [
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
    ]
  },
  {
    label: 'Last Visit',
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

export default function HomeDashboard() {
  return <>
    <Head title="Beranda Akun"/>
    <div className="w-full max-w-7xl m-auto">
      <div className='w-full px-6 border-b border-gray-200 pb-4'>
        <div className='w-full flex items-center'>
          <div className='w-[95px] h-[95px] flex items-center justify-center'>
            <div className='w-[90px] h-[90px] rounded-full overflow-hidden'>
              <img
                src='https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740'
                alt='Image Icon'
              />
            </div>
          </div>
          <div className='w-[calc(100%-95px)] pl-2'>
            <h2 className='font-bold text-2xl flex items-center'>
              Your Name! 
              <button className='border border-gray-200 p-2 px-3 flex items-center rounded-md ml-3 cursor-pointer'>
                <PenIcon size={15}/>
                <span className='text-sm font-normal ml-2 max-md:hidden'>Edit Profile</span>
              </button>
            </h2>
            <p className='mt-1.5'>I'm a food chef</p>
          </div>
        </div>
      </div>
      <div className="m-auto my-5 w-full max-w-7xl">
        <div className="flex justify-between px-6">
          <h2 className="text-xl md:text-3xl font-bold">Komentar belum dijawab</h2>
        </div>
        <div className="mt-5 flex w-full snap-x snap-mandatory overflow-x-auto px-4">
          {listCommentDummy.map((data, i) => (
            <div key={i} className="mb-3.5 flex w-full px-2 md:w-[calc(100%/2)] lg:w-[calc(100%/3)] snap-center shrink-0">
              <CardComment data={data} hiddentool={true}/>
            </div>
          ))}
        </div>
        <div className='w-full px-6 flex justify-end mt-2'>
          <Link className='flex items-center cursor-pointer border-gray-200 border px-3 p-1.5 rounded-md' href='/dash/comment'>
            <span className='mr-2'>Buka Management Komentar</span>
            <ArrowRight size={18}/>
          </Link>
        </div>
      </div>
    </div>
    <div className="w-full pt-4">
      {sampleDataContent.map((a, i) => (
        <div className="m-auto my-5 w-full max-w-7xl" key={i}>
          <div className="flex justify-between px-6">
            <h2 className="text-xl md:text-3xl font-bold">{a.label}</h2>
            {a.rgtbtn && (
              <Link href={a.rgtbtn.path} className="flex items-center">
                <span className="mr-2 font-bold">{a.rgtbtn.label}</span>
                {a.rgtbtn.normalicon?<ChevronRight size={18}/>:<PlusIcon size={18}/>}
              </Link>
            )}
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