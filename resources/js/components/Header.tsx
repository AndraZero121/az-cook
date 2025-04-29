import { Link, usePage } from "@inertiajs/react";
import { Menu, X, Search, Bell, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  account?: {
    name: string;
    profile_photo_path: string | null;
  };
}

export default function Header({ account }: Props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const toggleOpensidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <header className="fixed top-0 left-0 z-50 flex h-[60px] w-full items-center border-b border-gray-100 bg-white px-4">
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-8">
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            <Link 
              href="/recipe" 
              className="text-gray-600 hover:text-gray-900"
            >
              Resep
            </Link>
            <Link 
              href="/recipe/ingredients" 
              className="text-gray-600 hover:text-gray-900"
            >
              Cari dari Bahan
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setOpenSearch(!openSearch)}
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
            >
              <Search size={20} />
            </button>
            {openSearch && (
              <div className="absolute right-0 top-full mt-1 w-80 rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
                <form action="/recipe" method="GET">
                  <input
                    type="text"
                    name="search"
                    placeholder="Cari resep..."
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
                    autoFocus
                  />
                </form>
              </div>
            )}
          </div>

          {account ? (
            <>
              {/* Notifications */}
              <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100">
                <Bell size={20} />
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={toggleOpensidebar}
                  className="flex items-center space-x-2 rounded-lg border border-gray-200 p-1.5 hover:bg-gray-50"
                >
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <img
                      src={account.profile_photo_path || '/default-avatar.png'}
                      alt={account.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <ChevronDown size={16} />
                </button>
                {openSidebar && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                    <div className="border-b border-gray-100 px-4 py-2">
                      <p className="font-medium">{account.name}</p>
                    </div>
                    <Link
                      href="/dash"
                      className="block px-4 py-2 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/user/profile"
                      className="block px-4 py-2 hover:bg-gray-50"
                    >
                      Pengaturan
                    </Link>
                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                    >
                      Keluar
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Daftar
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 md:hidden"
            onClick={toggleOpensidebar}
          >
            {openSidebar ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {openSidebar && (
        <div className="fixed inset-0 top-[60px] z-50 bg-black/50 md:hidden">
          <div className="h-full w-64 bg-white p-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/recipe" 
                className="text-gray-600 hover:text-gray-900"
              >
                Resep
              </Link>
              <Link 
                href="/recipe/ingredients" 
                className="text-gray-600 hover:text-gray-900"
              >
                Cari dari Bahan
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}