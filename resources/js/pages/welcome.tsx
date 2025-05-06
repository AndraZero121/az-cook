import CardRecipe from '@/components/CardRecipe';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

function WaveDecoration(props: any) {
  return (
    <svg width="705" height="380" viewBox="0 0 705 380" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path opacity="0.15" d="M705 380H0V0.5C0 0.5 125.151 87.0523 352.477 87.0523C579.803 87.0523 705 0.5 705 0.5V380Z" fill="#60A5FA"/>
    </svg>
  );
}

export default function Welcome() {
  const { auth } = usePage().props as any;
  const { popularCategories, latestRecipes } = usePage().props as any;

  const transformRecipe = (recipe: any) => ({
    image: recipe.image_path,
    star: recipe._count?.likes ?? 0,
    title: recipe.title,
    description: recipe.description,
    date: new Date(recipe.created_at).getTime(),
    creator: {
      icon: recipe.user.profile_photo_path,
      username: recipe.user.name
    },
    slug: recipe.id.toString(),
    bookmark: recipe.is_bookmarked
  });

  return <>
    <Head title="Selamat Datang"/>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="m-auto flex w-full max-w-7xl flex-wrap items-center px-6 max-md:mb-[30px] max-md:flex-col-reverse md:h-[490px]">
        <div className="w-full md:w-[calc(100%-400px)] md:pr-5 lg:w-[calc(100%-550px)]">
          <h1 className="text-4xl font-bold">
            Flavorful <span className="text-blue-500">Packet</span>
          </h1>
          <p className="mt-4.5 line-clamp-4">
            Temukan resep masakan terbaik, trending, dan terbaru setiap hari. Eksplorasi kategori populer dan mulai masak hari ini!
          </p>
          <Link href="/recipe" className="mt-4 inline-block cursor-pointer rounded-3xl bg-blue-500 p-2.5 px-6 text-white shadow-md duration-150 hover:bg-blue-600 active:scale-95">
            <span className="font-bold">Lihat Semua Resep</span>
          </Link>
        </div>
        <div className="mt-[30px] mb-[10px] flex w-full justify-center md:mt-0 md:h-[490px] md:w-[400px] lg:w-[550px]">
          <img
            width="400px"
            className="h-full w-full max-w-[400px] object-contain xl:max-w-[550px]"
            src="/blob-wave.svg"
            alt="Blob Wave"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-full bg-gray-50 py-12">
        <div className="m-auto w-full max-w-7xl">
          <div className="flex justify-between px-6">
            <h2 className="text-2xl font-bold">Kategori</h2>
            <Link href="/recipe/categories" className="flex items-center text-blue-500 hover:text-blue-600">
              <span className="mr-1">Lihat semua</span>
              <ChevronRight size={18} />
            </Link>
          </div>
          <div className="mt-5 flex w-full flex-wrap px-6">
            {popularCategories?.length > 0 ? (
              popularCategories.map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/recipe?category=${cat.slug}`}
                  className="mb-3.5 mr-3 flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50"
                >
                  {cat.image_path && (
                    <img src={cat.image_path} alt={cat.name} className="mr-2 h-8 w-8 rounded-full object-cover" />
                  )}
                  <span className="font-semibold">{cat.name}</span>
                  <span className="ml-2 text-xs text-gray-500">({cat.recipes_count ?? 0} resep)</span>
                </Link>
              ))
            ) : (
              <div className="w-full text-center text-gray-500">Belum ada kategori populer.</div>
            )}
          </div>
        </div>
      </div>

      {/* Latest Recipes Section */}
      <div className="w-full py-12">
        <div className="m-auto w-full max-w-7xl">
          <div className="flex justify-between px-6">
            <h2 className="text-2xl font-bold">Resep Terbaru</h2>
            <Link href="/recipe" className="flex items-center text-blue-500 hover:text-blue-600">
              <span className="mr-1">Lihat semua</span>
              <ChevronRight size={18} />
            </Link>
          </div>
          <div className="mt-5 flex w-full flex-wrap px-4">
            {latestRecipes?.length > 0 ? (
              latestRecipes.map((recipe: any) => (
                <div key={recipe.id} className="mb-3.5 w-full px-2 sm:w-1/2 lg:w-1/3">
                  <CardRecipe data={transformRecipe(recipe)} />
                </div>
              ))
            ) : (
              <div className="w-full text-center text-gray-500">Belum ada resep terbaru.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  </>;
}
