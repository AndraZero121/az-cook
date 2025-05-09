import { Link, usePage } from "@inertiajs/react";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";

interface HeaderContext {
  account?: {
    username?: string;
    icon?: string;
  };
}

interface PageProps {
  auth: {
    user: {
      avatar?: string;
      name: string;
    } | null;
  };
  [key: string]: any;
}

export default function Header({ account }: HeaderContext) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { auth } = usePage<PageProps>().props;

  function toggleOpensidebar() {
    setOpenSidebar(!openSidebar);
  }

  function toggleDropdown() {
    setOpenDropdown(!openDropdown);
  }

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <header className="w-full h-[60px] shadow-sm bg-white sticky top-0 z-50">
      <div className="w-full h-full max-w-7xl m-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Az Cook Logo" className="h-[35px]"/>
          </Link>

          <nav className="ml-8 hidden xl:flex items-center space-x-6">
            <Link href="/" className="text-[1.12rem]">Home</Link>
            <Link href="/recipe" className="text-[1.12rem]">Resep</Link>
            <Link href="/recipe/ingredients" className="text-[1.12rem]">Resep Dari Bahan</Link>
            <Link href="/bookmark" className="text-[1.12rem]">Bookmark</Link>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden w-[48px] h-[48px] flex items-center justify-center"
          onClick={toggleOpensidebar}
          aria-label="Menu"
        >
          <Menu size={23}/>
        </button>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 xl:hidden ${openSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={toggleOpensidebar}
        />
        <div
          className={`fixed top-0 right-0 w-[300px] h-full bg-white z-50 transform transition-transform xl:hidden ${openSidebar ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <nav className="flex flex-col p-6">
            <Link href="/" className="py-3">Home</Link>
            <Link href="/recipe" className="py-3">Resep</Link>
            <Link href="/recipe/ingredients" className="py-3">Resep Dari Bahan</Link>
            <Link href="/bookmark" className="py-3">Bookmark</Link>
            {auth.user ? (
              <>
                <Link href="/dash" className="py-3">Dashboard</Link>
                <Link href="/dash/recipe" className="py-3">Resep Saya</Link>
                <Link href="/profile" className="py-3">Pengaturan</Link>
                <hr className="my-3" />
                <Link href="/logout" method="post" as="button" className="py-3 text-left text-red-600">
                  Keluar
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="py-3">Log in</Link>
                <Link href="/register" className="py-3">Sign up</Link>
              </>
            )}
          </nav>
        </div>

        {/* Desktop Auth Buttons/Menu */}
        <div className="hidden xl:flex items-center space-x-4">
          {auth.user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white">
                  {auth.user.avatar ? (
                    <img
                      src={auth.user.avatar}
                      alt={auth.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getInitials(auth.user.name)
                  )}
                </div>
                <span className="font-medium">{auth.user.name}</span>
                <ChevronDown className={`transform transition-transform ${openDropdown ? 'rotate-180' : ''}`} size={20} />
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                  <Link href="/dash" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <Link href="/dash/recipe" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Resep Saya
                  </Link>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Pengaturan
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <Link href="/logout" method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Keluar
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="px-6 py-2 rounded-md border border-gray-300 font-medium">
                Log in
              </Link>
              <Link href="/register" className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
