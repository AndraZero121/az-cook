import { Link } from "@inertiajs/react";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">AZ Cook</h2>
            <p className="text-sm text-gray-600 max-w-xs">
              Platform resep masakan terbaik di Indonesia. Temukan inspirasi memasak dari ribuan resep.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/azcook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com/azcook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/azcook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Jelajahi</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/recipe" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Resep
                </Link>
              </li>
              <li>
                <Link href="/recipe/ingredients" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Cari dari Bahan
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Kategori
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Bergabung</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/register" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Daftar
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Masuk
                </Link>
              </li>
              <li>
                <Link href="/dash/add" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Buat Resep
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Lainnya</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Syarat dan Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {year} AZ Cook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
