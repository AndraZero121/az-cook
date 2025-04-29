import { Link } from "@inertiajs/react";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/">
              <img src="/logo.svg" alt="Logo" className="h-8" />
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Temukan resep masakan terbaik, trending, dan terbaru setiap hari. 
              Eksplorasi kategori populer dan mulai masak hari ini!
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Jelajahi</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/recipe" className="text-sm text-gray-600 hover:text-gray-900">
                  Resep
                </Link>
              </li>
              <li>
                <Link href="/recipe/ingredients" className="text-sm text-gray-600 hover:text-gray-900">
                  Cari dari Bahan
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-600 hover:text-gray-900">
                  Kategori
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Bergabung</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/register" className="text-sm text-gray-600 hover:text-gray-900">
                  Daftar
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                  Masuk
                </Link>
              </li>
              <li>
                <Link href="/dash/add" className="text-sm text-gray-600 hover:text-gray-900">
                  Buat Resep
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Lainnya</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  Syarat dan Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AZ Cook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}