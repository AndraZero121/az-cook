import { Link, usePage } from "@inertiajs/react";
import { Menu, X, Search, Bell, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  account?: {
    name: string;
    email: string;
    profile_photo_path: string | null;
  };
}

export default function Header({ account }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.account-menu')) {
        setShowAccountMenu(false);
      }
      if (!target.closest('.mobile-menu')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 h-[60px] bg-white z-50 transition-shadow duration-200 ${
      scrolled ? 'shadow-md' : ''
    }`}>
      <div className="h-full w-full max-w-7xl m-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          AZ Cook
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/recipe" className="text-gray-600 hover:text-gray-900">Resep</Link>
          <Link href="/recipe/ingredients" className="text-gray-600 hover:text-gray-900">Cari dari Bahan</Link>
          <Link href="/categories" className="text-gray-600 hover:text-gray-900">Kategori</Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">Tentang</Link>
        </nav>

        {/* Right Side Menu */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Link
            href="/recipe/search"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <Search size={20} className="text-gray-600"/>
          </Link>

          {account ? (
            <>
              {/* Notifications */}
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <Bell size={20} className="text-gray-600"/>
              </button>

              {/* Account Menu */}
              <div className="relative account-menu">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAccountMenu(!showAccountMenu);
                  }}
                  className="flex items-center space-x-2 cursor-pointer focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={account.profile_photo_path || '/default-avatar.png'}
                      alt={account.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform duration-200 ${
                    showAccountMenu ? 'rotate-180' : ''
                  }`}/>
                </button>

                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold">{account.name}</p>
                      <p className="text-sm text-gray-500">{account.email}</p>
                    </div>
                    <Link href="/dash" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Dashboard</Link>
                    <Link href="/dash/add" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Buat Resep</Link>
                    <Link href="/user/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Pengaturan</Link>
                    <Link href="/logout" method="post" as="button" className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                      Keluar
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="font-semibold text-gray-600 hover:text-gray-900"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="font-semibold text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
              >
                Daftar
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center"
          >
            {isOpen ? (
              <X size={24} className="text-gray-600"/>
            ) : (
              <Menu size={24} className="text-gray-600"/>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-[60px] bg-white z-40 mobile-menu md:hidden">
          <nav className="p-6">
            <div className="space-y-4">
              <Link href="/recipe" className="block text-lg">Resep</Link>
              <Link href="/recipe/ingredients" className="block text-lg">Cari dari Bahan</Link>
              <Link href="/categories" className="block text-lg">Kategori</Link>
              <Link href="/about" className="block text-lg">Tentang</Link>
            </div>

            {!account && (
              <div className="mt-8 space-y-4">
                <Link
                  href="/login"
                  className="block w-full text-center font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2"
                >
                  Daftar
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
