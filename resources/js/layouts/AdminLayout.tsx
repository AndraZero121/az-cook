import { Fragment, useState, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { User, BookOpen, Users, Tag, Layers, Home, Menu as MenuIcon, X } from 'lucide-react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { auth } = usePage().props as any;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home, current: window.location.pathname === '/admin' },
    { name: 'Resep', href: '/admin/recipes', icon: BookOpen, current: window.location.pathname.startsWith('/admin/recipes') },
    { name: 'Resep Menunggu', href: '/admin/recipes/pending', icon: Layers, current: window.location.pathname === '/admin/recipes/pending' },
    { name: 'Pengguna', href: '/admin/users', icon: Users, current: window.location.pathname.startsWith('/admin/users') },
    { name: 'Kategori', href: '/admin/categories', icon: Tag, current: window.location.pathname.startsWith('/admin/categories') },
    { name: 'Bahan', href: '/admin/ingredients', icon: Layers, current: window.location.pathname.startsWith('/admin/ingredients') },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <span className="text-xl font-bold text-white">Az-Cook Admin</span>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          {auth.user.profile_photo_path ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={auth.user.profile_photo_path}
                              alt={auth.user.name}
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
                              <User className="h-5 w-5" />
                            </div>
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Profil
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Kembali ke Situs
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/logout"
                                method="post"
                                as="button"
                                type="button"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full text-left px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Logout
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    {auth.user.profile_photo_path ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={auth.user.profile_photo_path}
                        alt={auth.user.name}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
                        <User className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{auth.user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{auth.user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as={Link}
                    href="/profile"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Profil
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    href="/"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Kembali ke Situs
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    href="/logout"
                    method="post"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Logout
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="flex">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto bg-white pt-5">
            <div className="flex flex-shrink-0 flex-col px-4">
              <div className="text-lg font-semibold">Menu Admin</div>
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <Icon
                        className={classNames(
                          item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
