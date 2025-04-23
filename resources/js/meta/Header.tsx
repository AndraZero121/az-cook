import { useCallback, useEffect, useState } from "react"
import { Link } from "@inertiajs/react"
import { Menu } from "lucide-react"

interface HeaderContext {
  account?: {
    icon: string,
    username: string,
  }|undefined
}

export default function Header({ account }: HeaderContext) {
  const [itScrollContent, setItScrollContent] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)

  const toggleOpensidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  const scrollingPage = useCallback(() => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      if(!itScrollContent) {
        setItScrollContent(true)
      }
    } else {
      if(itScrollContent) {
        setItScrollContent(false)
      }
    }
  }, [itScrollContent])
  useEffect(() => {
    window.addEventListener('scroll', scrollingPage);
    return () => {
      window.removeEventListener('scroll', scrollingPage);
    };
  }, [itScrollContent, scrollingPage]);

  return <>
    <div className="w-full h-[76px]"></div>
    <header className={"fixed top-0 left-0 w-full h-[76px] duration-150 border-b z-50"+(itScrollContent?" backdrop-blur-[3px] bg-white/30 border-gray-200/20":" border-transparent")}>
      <div className="w-full max-w-7xl m-auto flex items-center">
        <Link className="w-[calc(100%-76px)] xl:w-[270px] h-[76px] flex items-center px-5" href="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/113/113339.png"
            alt="Icon"
            width="34px"
          />
          <b className="font-bold ml-3">MasakanTergacor🔥</b>
        </Link>
        <div className={"fixed top-0 left-0 w-full h-screen bg-gray-500/50 z-30 xl:hidden duration-300 cursor-pointer "+(openSidebar?" opacity-100":"opacity-0 pointer-events-none")} onClick={toggleOpensidebar}></div>
        <nav className={"max-xl:fixed max-xl:top-0 max-xl:right-0 max-xl:h-[100vh] w-full max-xl:max-w-[300px] xl:w-[calc(100%-calc(270px*2))] max-xl:bg-white max-xl:shadow-md flex justify-center items-center max-xl:duration-300 max-xl:min-h-[490px] z-30"+(openSidebar?" max-xl:mr-[0px]":" max-xl:mr-[-300px]")}>
          <div className="flex flex-wrap max-xl:p-4 max-xl:overflow-y-auto">
            <Link href="/" className="p-4 px-6 max-xl:w-full">
              <span className="text-[1.12rem]">Home</span>
            </Link>
            <Link href="/recipe" className="p-4 px-6 max-xl:w-full">
              <span className="text-[1.12rem]">Resep</span>
            </Link>
            <Link href="/recipe/ingredients" className="p-4 px-6 max-xl:w-full">
              <span className="text-[1.12rem]">Resep Dari Bahan</span>
            </Link>
            <Link href="/bookmark" className="p-4 px-6 max-xl:w-full">
              <span className="text-[1.12rem]">Bookmark</span>
            </Link>
            {(typeof account === "object" && !Array.isArray(account))? <>
              <div className="w-full h-[55px] flex items-center px-6 xl:hidden">
                <div className="w-[48px] h-[48px] min-w-[48px] rounded-full overflow-hidden select-none">
                  <img
                    src={String(account.icon||"")}
                    alt={String(account.username||"")}
                    width="48px"
                    height="48px"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[calc(100%-48px)] pl-3 overflow-hidden">
                  <p title={String(account.username||"")} className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">{String(account.username||"")}</p>
                </div>
              </div>
            </>:<>
              <Link href="/login" className="p-4 px-6 max-xl:w-full xl:hidden">
                <span className="text-[1.12rem]">Log in</span>
              </Link>
              <Link href="/register" className="p-4 px-6 max-xl:w-full xl:hidden">
                <span className="text-[1.12rem]">Sign up</span>
              </Link>
            </>}
          </div>
        </nav>
        <div className="fixed top-0 right-0 w-[76px] h-[76px] flex justify-center items-center xl:hidden z-50">
          <button className={"w-[48px] h-[48px] bg-white rounded-md overflow-hidden flex justify-center items-center cursor-pointer duration-200 border border-gray-100"+(openSidebar?" shadow-md":"")} aria-label="Menu" onClick={toggleOpensidebar}>
            <span className="text-xl">
              <Menu size={23}/>
            </span>
          </button>
        </div>
        {/* External Button Login */}
        <div className="w-[270px] max-xl:hidden flex items-center justify-end px-5">
          {(typeof account == "object" && !Array.isArray(account))? <>
            <div className="w-[calc(100%-50px)] whitespace-nowrap overflow-ellipsis overflow-hidden pr-2.5">
              <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">{String(account.username)}</span>
            </div>
            <div className="w-[50px] h-[50px] overflow-hidden rounded-full select-none">
              <img
                width="50px"
                height="50px"
                src={String(account.icon)}
                alt={String(account.username)}
                className="bg-gray-200 w-full h-full object-cover"
              />
            </div>
          </>:<>
            <Link className="p-2 px-4 cursor-pointer rounded-md bg-gray-100 shadow-md mr-2.5 border border-gray-300" href="/login">
              <span className="font-bold">Log in</span>
            </Link>
            <Link className="p-2 px-4 cursor-pointer rounded-md bg-blue-700 shadow-md border border-blue-500" href="/register">
              <span className="text-white">Sign up</span>
            </Link>
          </>}
        </div>
      </div>
    </header>
  </>
}