import { useEffect, useState } from "react"
import { Bookmark, Search } from "lucide-react"
import { Head, Link } from '@inertiajs/react'
import CardRecipe from "@/components/CardRecipe"
import { useAutoAnimate } from '@formkit/auto-animate/react'

// DUMMY DATA CONTENT
const sampleDataContent = [
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
    ingredients: ['spaghetti', 'egg', 'onion', 'oil-zaitun', 'salt']
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
    ingredients: ['raw-fish', 'shrimp', 'sushi-rice', 'nori', 'cucumber', 'avocado']
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
    ingredients: ['chickpeas', 'black-beans', 'cashew', 'sesame', 'carrot', 'avocado', 'cucumber']
  },
]

const bahanMakanan = [
  { value: "spaghetti", label: "Spaghetti" },
  { value: "egg", label: "Telur" },
  { value: "onion", label: "Bawang" },
  { value: "oil-zaitun", label: "Minyak zaitun" },
  { value: "salt", label: "Garam" },
  { value: "shrimp", label: "Udang" },
  { value: "raw-fish", label: "Ikan Mentah" },
  { value: "sushi-rice", label: "Nasi Sushi" },
  { value: "nori", label: "Nori" },
  { value: "cucumber", label: "Mentimun" },
  { value: "avocado", label: "Alpukat" },
  { value: "carrot", label: "Wortel" },
  { value: "chickpeas", label: "Buncis" },
  { value: "black-beans", label: "Kacang Hitam" },
  { value: "cashew", label: "Kacang Mete" },
  { value: "sesame", label: "Biji Wijen" },
]

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
  instructions: Instruction[];
  bookmark: boolean,
  ingredients: string[],
};
type ListManangeCard = {
  list: SampleDataContent[]
}
type ListIngredientFood = {
  label: string,
  value?: string
}
type StructIngredientFood = {
  list: ListIngredientFood[]
}
type DataViewManager = {
  data?: StructIngredientFood | ListManangeCard | null,
  loading: boolean
}
type FilterSearch = {
  state?: boolean,
  list?: ListIngredientFood[]|[]
}

export default function IngredientsPage() {
  const [listSelection, setSelection] = useState<string[]>([])
  const [openSelection, setOpenSelection] = useState<boolean>(false)
  const [dataIngre, setDataIngre] = useState<DataViewManager>({ data: { list: [] }, loading: true })
  const [dataResult, setDataResult] = useState<DataViewManager>({ data: { list: [] }, loading: false })
  const [listFilter, setListFilter] = useState<FilterSearch>({ state: false, list: [] })
  const [parentListOption] = useAutoAnimate()
  const [parentListResultData] = useAutoAnimate()

  async function SearchData() {
    if (listSelection.length > 0) {
      setDataResult({ data: { list: [] }, loading: true });
      const listOption = listSelection;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const getSearchData = sampleDataContent.filter((data) => (
        data.ingredients.length > 0 && listOption.every(label => data.ingredients.includes(label))
      )).map(data => ({
        ...data,
        relate_recipes: [],
        cooking_note: '',
        instructions: [],
      }));
    //   setDataResult({ data: { list: getSearchData }, loading: false }); // ada bug yop, di bagian list
    } else {
      setDataResult({ data: { list: [] }, loading: false });
    }
  }

  useEffect(() => {
    // Sample Data (Like Real, But Only Dummy)
    setDataIngre({ data: { list: [] }, loading: true })
    const showCase = () => {
      setTimeout(() => {
        setDataIngre({ data: { list: bahanMakanan }, loading: false })
      }, 500)
    }
    showCase()
  }, [])

  const listToShow = listFilter.state ? listFilter.list : (dataIngre.data as StructIngredientFood).list || []
  const listOptSelect = (dataIngre.data as StructIngredientFood).list || []
  const rawData = dataResult.data;
  const isStruct = (d: any): d is StructIngredientFood =>
    d !== null && !Array.isArray(d) && "list" in d;
  const itemsToRender = !dataResult.loading
    ? isStruct(rawData)
      ? rawData.list
      : []
    : Array(3).fill(undefined);

  return <>
    <Head title="Cari Resep Dari Bahan - Bahan?!"/>
    <div className="w-full max-w-7xl m-auto h-[240px] flex justify-center items-center flex-col px-6 border-b border-gray-100">
      <div className="mb-5">
        <h1 className="font-bold text-2xl text-center">Cari Resep Dari Bahan - Bahan?!</h1>
      </div>
      <div className="w-full max-w-3xl bg-gray-50 rounded-md overflow-hidden border border-gray-200 shadow-md">
        <div className="flex items-center px-4 p-2 cursor-pointer overflow-x-auto" onClick={() => { setOpenSelection(!openSelection) }} ref={parentListOption}>
          {!listSelection[0] && <span className="select-none text-gray-500">Klik dan pilih bahan-bahannya</span>}
          {listSelection.map((lt, i) => (
            <span
              className="text-sm border border-gray-200 px-2 p-0.5 rounded-md mr-1 whitespace-nowrap"
              key={i}
            >{String(listOptSelect[listOptSelect.map(a => a?.value).indexOf(lt)]?.label)}</span>
          ))}
        </div>
        <div className={`absolute bg-white max-w-3xl max-h-[320px] w-[calc(100%-calc(var(--spacing)*12))] shadow-lg z-10 border border-gray-200 mt-2 rounded-md overflow-hidden duration-300 ${openSelection ? "mt-0 opacity-100" : "mt-[-10px] opacity-0 pointer-events-none"}`}>
          <div className="w-full border-b border-gray-200">
            <input
              className="px-4 p-2 outline-none border-none w-full"
              placeholder="Cari bahan..."
              name="s-items"
              type="text"
              onChange={(e) => {
                const contextValue = e.target.value.trim()
                if (contextValue) {
                  const filteredList = (dataIngre.data as StructIngredientFood).list.filter(
                    (a) => a.label.toLowerCase().includes(contextValue.toLowerCase())
                  )
                  setListFilter({ state: true, list: filteredList })
                } else {
                  setListFilter({ state: false, list: [] })
                }
              }}
            />
          </div>
          <div className="w-full overflow-y-scroll max-h-[280px]">
            {(listToShow || []).map((a: any, i: number) => (
              <div key={String(i)} onClick={() => {
                const updateList = [...listSelection]
                if (!listSelection.includes(a.value)) {
                  updateList.push(a.value)
                } else {
                  updateList.splice(listSelection.indexOf(a.value), 1)
                }
                setSelection(updateList)
                SearchData()
              }} className={`block w-full px-4 p-2 cursor-pointer ${listSelection.includes(a.value) ? "text-black font-bold" : "text-gray-400"}`}>{a.label}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="w-full pt-4">
      <div className="m-auto my-5 w-full max-w-7xl">
        <div className="flex justify-between px-6">
          <h2 className="text-3xl font-bold">Hasil Pencarian</h2>
        </div>
        <div className="mt-5 flex w-full flex-wrap px-4" ref={parentListResultData}>
          {itemsToRender.map((b, c) => (
            <div key={c} className="mb-3.5 flex w-full px-2 md:w-[calc(100%/2)] lg:w-[calc(100%/3)]">
              <CardRecipe data={b} loading={dataResult.loading}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
}