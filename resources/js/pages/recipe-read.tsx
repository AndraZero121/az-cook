import { useEffect, useState } from "react"
import { Bookmark, NotebookPenIcon, SendIcon, StarIcon } from "lucide-react"
import CardRecipe from "@/components/CardRecipe";

const sampleDataContent = {
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
  cooking_note: "Untuk hasil terbaik, gunakan telur suhu ruang dan angkat pasta saat masih sedikit keras (al dente). Jangan sampai telur menggumpal karena panas berlebih.",
  ingredients: [
    {
      label: "200 gram spaghetti",
      checked: true
    },
    {
      label: "100 gram pancetta (atau bacon), potong dadu kecil",
      checked: true
    },
    {
      label: "2 butir telur",
      checked: true
    },
    {
      label: "50 gram keju parmesan, parut",
      checked: true
    },
    {
      label: "2 siung bawang putih, cincang halus",
    },
    {
      label: "1 sendok makan minyak zaitun",
    },
    {
      label: "Garam secukupnya",
    },
    {
      label: "Lada hitam secukupnya",
    },
  ],
  instructions: [
    {
      index: 0,
      image: null,
      note: "Rebus spaghetti dalam air mendidih yang sudah diberi garam hingga al dente. Tiriskan dan sisihkan (simpan sedikit air rebusan pasta)."
    },
    {
      index: 1,
      image: null,
      note: "Panaskan minyak zaitun dalam wajan, tumis pancetta dan bawang putih hingga harum dan pancetta menjadi renyah. Angkat dari api."
    },
    {
      index: 2,
      image: null,
      note: "Dalam mangkuk, kocok telur dan keju parmesan hingga tercampur rata. Tambahkan sedikit lada hitam."
    },
    {
      index: 3,
      image: null,
      note: "Campurkan pasta panas ke dalam wajan pancetta (tidak dalam kondisi menyala). Aduk cepat lalu tuang campuran telur dan keju ke dalamnya sambil terus diaduk agar telur tidak menggumpal."
    },
    {
      index: 4,
      image: null,
      note: "Jika terlalu kental, tambahkan sedikit air rebusan pasta untuk mengencerkan saus. Sajikan segera dengan taburan parmesan dan lada hitam."
    }
  ],
  relate_recipes: [
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
}

type Creator = {
  icon: string;
  username: string;
};
type Recipe = {
  image: string;
  star: number;
  title: string;
  description: string;
  date: number;
  creator: Creator;
  slug: string;
  bookmark?: boolean;
};
type Instruction = {
  index: number;
  image: string | null;
  note: string;
};
type Ingredients = {
  label: String,
  checked?: Boolean
};
type SampleDataContent = {
  image: string;
  star: number;
  title: string;
  description: string;
  date: number;
  creator: Creator;
  slug: string;
  relate_recipes: Recipe[];
  cooking_note: string;
  ingredients: Ingredients[];
  instructions: Instruction[];
  bookmark: Boolean
};
type DataViewManager = {
  data: SampleDataContent | null,
  loading: Boolean
}

export default function RecipeReading() {
  const [dataView, setDataView] = useState<DataViewManager>({ data: null, loading: true })
  const [rateingView, setRateingView] = useState<Number>(1)

  useEffect(() => {
    setTimeout(() => {
      setDataView({ data: sampleDataContent, loading: false })
    }, 1000)
  }, [])

  return <>
    <div className="max-w-7xl m-auto px-6 mt-3">
      {dataView.loading? <div className="w-full flex items-center">
        <div className="w-[20%] h-[26px] rounded-xl bg-gray-200 animate-pulse mt-2 mr-2"></div>
        <div className="w-[70%] h-[26px] rounded-xl bg-gray-200 animate-pulse mt-2"></div>
      </div>:<h1 className="text-4xl font-bold">{String(dataView.data?.title)}</h1>}
      <div className="w-full flex items-center py-4.5 pt-5.5 justify-between">
        <div className="flex items-center">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
            {!dataView.loading&&<img
              src={String(dataView.data?.creator.icon||"")}
              alt={String(dataView.data?.creator.username||"")}
              className="w-full h-full object-cover"
            />}
          </div>
          {dataView.loading? <b className="w-[60px] h-[15px] rounded-xl bg-gray-200 animate-pulse ml-2.5"></b>:<b className="ml-2.5 font-bold text-sm">{String(dataView.data?.creator.username||"")}</b>}
        </div>
        <button type="button" className="flex items-center cursor-pointer">
          <span className="font-bold text-sm mr-2" style={{ color: dataView?.data?.bookmark?"#0066ff":"#000000" }}>Bookmark</span>
          <Bookmark size={19} color={dataView?.data?.bookmark? "#0066ff":"#000000"}/>
        </button>
      </div>
    </div>
    <div className="w-full max-w-7xl m-auto border-t border-gray-100 pt-5.5 flex flex-wrap px-6">
      <div className="w-full md:w-[calc(100%-250px)] lg:w-[calc(100%-290px)] md:pr-3.5  pb-4">
        <div className="w-full max-h-[420px] overflow-hidden rounded-lg flex items-center justify-center bg-gray-200">
          {!dataView.loading&&<img
            width="100%"
            className="w-full h-full object-cover"
            alt={String(dataView.data?.title||"")}
            src={String(dataView.data?.image||"")}
          />}
          {dataView.loading&&<div className="h-[420px]"></div>}
        </div>
        {dataView.loading? <div className="w-full flex items-center my-5">
          <div className="w-[20%] h-[16px] rounded-xl bg-gray-200 animate-pulse mt-2 mr-2"></div>
          <div className="w-[70%] h-[16px] rounded-xl bg-gray-200 animate-pulse mt-2"></div>
        </div>:<p className="my-5">{String(dataView.data?.description||"")}</p>}
        <h2 className="block w-full font-bold text-xl mt-4 mb-2.5">Bahan - bahan</h2>
        {dataView.loading&&<>
          {[...Array(12)].map((_, i) => (
            <div className="flex items-center mb-3.5">
              <div className="w-[26px] h-[26px] bg-gray-200 rounded-sm"></div>
              <div className="w-[calc(100%-90px)] max-w-[200px] h-[16px] rounded-xl bg-gray-200 animate-pulse ml-2"></div>
            </div>
          ))}
        </>}
        {dataView.data?.ingredients.map((ing,i) => (
          <div className="flex items-center mb-2 cursor-pointer" key={i}>
            <input
              id={`ingredients-${i}`}
              type="checkbox"
              onChange={() => {
                // SCRIPT CHANGE CHECKED INGREDIENTS
              }}
              defaultChecked={Boolean(ing.checked||false)}
              className="peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor={`ingredients-${i}`}
              className="ms-2 font-medium text-black focus:underline peer-checked:line-through peer-checked:text-gray-600 cursor-pointer"
            >{String(ing.label||"")}</label>
          </div>
        ))}
        {dataView.data?.cooking_note&&<div className="w-full bg-gray-100 px-5 p-4 rounded-lg flex mt-2.5 md:hidden">
          <div className="w-[35px] pt-1">
            <NotebookPenIcon size={20}/>
          </div>
          <div className="w-[calc(100%-35px)]">
            <h3 className="font-bold">Catatan Memasak</h3>
            <p className="text-sm mt-1">{String(dataView.data?.cooking_note)}</p>
          </div>
        </div>}
        <h2 className="block w-full font-bold text-xl mt-4 mb-2.5">Intruksi Memasak</h2>
        <div>
          {(dataView?.data?.instructions||[...Array(6)]).map((a, i) => (
            <div className="w-full flex mb-4">
              <div className="w-[29px]">
                <div className="w-[27px] h-[27px] rounded-md bg-blue-500 flex justify-center items-center text-white shadow-md text-sm">{String(Number(i)+1)}</div>
              </div>
              <div className="w-[calc(100%-29px)] px-2">
                {dataView.loading&&<div className="flex flex-wrap items-center">
                  <div className="w-[20%] h-[19px] rounded-xl bg-gray-200 animate-pulse ml-2"></div>
                  <div className="w-[70%] h-[19px] rounded-xl bg-gray-200 animate-pulse ml-2"></div>
                  <div className="w-[40%] h-[19px] rounded-xl bg-gray-200 animate-pulse ml-2 mt-2"></div>
                  <div className="w-[90%] h-[19px] rounded-xl bg-gray-200 animate-pulse ml-2 mt-2"></div>
                </div>}
                <p>{String(a?.note||"")}</p>
              </div>
            </div>
          ))}
        </div>
        <h2 className="block w-full font-bold text-xl mt-4 mb-2.5">Komentar</h2>
        <div className="w-full">
          <textarea
            name="comment"
            aria-label="Comment"
            placeholder="Komentar Kamu..."
            className="px-4 p-3 rounded-md border border-gray-200 w-full outline-blue-600"
          />
          <button type="submit" className="px-3.5 p-2 flex items-center rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100 active:scale-95 duration-150">
            <span className="mr-2">Komentar</span>
            <SendIcon size={18}/>
          </button>
        </div>
        <h2 className="block w-full font-bold text-xl mt-4 mb-2.5">Penilaian</h2>
        <div className="w-full">
          <div className="w-full flex mb-1.5">
            {[...Array(5)].map((_,i) => (
              <button type="button" className="w-[30px] h-[30px] flex items-center justify-start cursor-pointer" aria-label="Star Rateing" key={i} onClick={() => {
                setRateingView(Number(i)+1)
              }}>
                <StarIcon size={18} color={(Number(i) < Number(rateingView||0))?"#fcb103":"#000000"} type="solid"/>
              </button>
            ))}
          </div>
          <textarea
            name="rateing"
            aria-label="rateing"
            placeholder="Penilaian tentang resep ini..."
            className="px-4 p-3 rounded-md border border-gray-200 w-full outline-blue-600"
          />
          <button type="submit" className="px-3.5 p-2 flex items-center rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100 active:scale-95 duration-150">
            <span className="mr-2">Post</span>
            <SendIcon size={18}/>
          </button>
        </div>
      </div>
      <div className="w-full md:w-[250px] lg:w-[290px] mb-5">
        {/* NOTE RECIPE ON DEKSTOP LOCATION */}
        {dataView.data?.cooking_note&&<>
          <div className="w-full bg-gray-100 px-5 p-4 rounded-lg flex max-md:hidden mb-4">
            <div className="w-[35px] pt-1">
              <NotebookPenIcon size={20}/>
            </div>
            <div className="w-[calc(100%-35px)]">
              <h3 className="font-bold">Catatan Memasak</h3>
              <p className="text-sm mt-1">{String(dataView.data?.cooking_note)}</p>
            </div>
          </div>
          <div className="border-b border-gray-200 mb-5.5"></div>
        </>}
        <h2 className="text-xl font-bold mb-2.5">Relate Recipes</h2>
        {(dataView.data?.relate_recipes||[...Array(4)]).map((a, i) => (
          <div className="mb-3" key={i}>
            <CardRecipe data={a} key={i} loading={dataView.loading}/>
          </div>
        ))}
      </div>
    </div>
  </>
}