import { Bookmark, Star } from "lucide-react"
import { router } from '@inertiajs/react'

interface CardRecipe {
  data?: {
    image: String;
    star?: Number;
    title: String;
    description?: String;
    date?: Date | Number;
    bookmark?: Boolean;
    creator: {
      icon: String;
      username: String;
    };
    slug: String;
  };
  loading?: Boolean;
  onBookmark?: (value: Boolean) => void;
}

export default function CardRecipe({ data, onBookmark, loading = false }: CardRecipe) {
  const visitPage = () => {
    if(!data?.slug) return;
    router.visit(`/recipe/${data?.slug}`)
  }

  return <div className="w-full border border-gray-200 rounded-md">
    <div className="w-full overflow-hidden rounded-md h-[200px] bg-gray-200 cursor-pointer" onClick={visitPage}>
      {!loading&&<img
        className="w-full h-full object-cover"
        src={String(data?.image||"")}
        alt={String(data?.title||"")}
      />}
    </div>
    <div className="w-full p-2 px-4 pt-3.5">
      {!!loading? <div className="w-full flex flex-wrap mb-2.5">
        <div className="w-full h-[20px] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="w-[40%] h-[20px] rounded-md bg-gray-200 animate-pulse mt-2 mr-2"></div>
        <div className="w-[50%] h-[20px] rounded-md bg-gray-200 animate-pulse mt-2"></div>
      </div>:<h1 className="text-xl font-bold hover:underline cursor-pointer" onClick={visitPage}>{String(data?.title||"")}</h1>}
      <div className="w-full flex items-center justify-between my-3 mb-4.5">
        <div className="flex items-center">
          {[...Array(5)].map((c,i) => (
            <Star size={18} key={i} color={(Number(i) < Number(data?.star||0))?"#fcb103":"#000000"} className="mr-0.5"/>
          ))}
          <span className="text-sm font-bold ml-2.5">{String(data?.star||"1")}</span>
        </div>
        <button className="cursor-pointer flex items-center" type="button" onClick={() => {
          if(typeof onBookmark === "function") { onBookmark(!data?.bookmark) }
        }} aria-label="Bookmark">
          <span className="text-sm font-bold mr-1.5" style={{ color: data?.bookmark?"#0066ff":"#000000" }}>Boomark</span>
          <Bookmark size={18} color={data?.bookmark? "#0066ff":"#000000"}/>
        </button>
      </div>
      {!!loading? <div className="w-full flex flex-wrap mb-2.5">
        <div className="w-full h-[13px] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="w-[40%] h-[13px] rounded-md bg-gray-200 animate-pulse mt-2 mr-2"></div>
        <div className="w-[50%] h-[13px] rounded-md bg-gray-200 animate-pulse mt-2"></div>
        <div className="w-[70%] h-[13px] rounded-md bg-gray-200 animate-pulse mt-2 mr-2"></div>
        <div className="w-[20%] h-[13px] rounded-md bg-gray-200 animate-pulse mt-2"></div>
        <div className="w-[70%] h-[13px] rounded-md bg-gray-200 animate-pulse mt-2"></div>
      </div>:<p className="text-[1rem] my-3">{String(data?.description||"")}</p>}
    </div>
  </div>
}