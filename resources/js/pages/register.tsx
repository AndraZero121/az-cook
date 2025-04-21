import { Head, Link } from "@inertiajs/react";

export default function LoginPage() {
  return <>
    <Head title="Daftar"/>
    <div className="w-full max-w-6xl m-auto h-[calc(100vh-80px)] max-h-[900px] flex justify-center items-center">
      <form className="w-full max-w-lg px-6" method="post">
        <h1 className="text-3xl font-bold mb-4">Daftar</h1>
        <p>Daftar untuk membuat akun dan menambah resep</p>
        <label className="w-full mt-3 block">
          <p className="font-bold mb-1.5">Pengguna</p>
          <input
            className="w-full block border border-gray-200 rounded-md p-1.5 px-4 outline-blue-400"
            type="text"
            name="name"
            placeholder="Urdin W."
            required
            minLength={2}
          />
        </label>
        <label className="w-full mt-3 block">
          <p className="font-bold mb-1.5">Nama Pengguna</p>
          <input
            className="w-full block border border-gray-200 rounded-md p-1.5 px-4 outline-blue-400"
            type="username"
            name="username"
            placeholder="urdin_wasih"
            required
            minLength={2}
          />
        </label>
        <label className="w-full mt-3 block">
          <p className="font-bold mb-1.5">Email</p>
          <input
            className="w-full block border border-gray-200 rounded-md p-1.5 px-4 outline-blue-400"
            type="email"
            name="email"
            placeholder="urdinwasih24@gmail.com"
            required
            minLength={3}
          />
        </label>
        <div className="w-full flex flex-wrap justify-between">
          <div className="w-full md:w-[calc(calc(100%/2)-4px)] pr-[2px]">
            <label className="w-full mt-3 block">
              <p className="font-bold mb-1.5">Sandi</p>
              <input
                className="w-full block border border-gray-200 rounded-md p-1.5 px-4 outline-blue-400"
                type="password"
                name="password"
                placeholder="****************"
                required
                minLength={8}
              />
            </label>
          </div>
          <div className="w-full md:w-[calc(calc(100%/2)-4px)] pl-[2px]">
            <label className="w-full mt-3 block">
              <p className="font-bold mb-1.5">Konfrimasi Sandi</p>
              <input
                className="w-full block border border-gray-200 rounded-md p-1.5 px-4 outline-blue-400"
                type="password"
                name="password_confirmation"
                placeholder="****************"
                required
                minLength={8}
              />
            </label>
          </div>
        </div>
        <button className="w-full block bg-blue-600 border border-blue-800 p-1 px-3 cursor-pointer rounded-md mt-6">
          <span className="font-bold text-white">Daftar</span>
        </button>
        <div className="mt-6">
          <p>Sudah punya akun? <Link href="/register" className="text-blue-500 hover:underline">Masuk disini</Link></p>
        </div>
      </form>
    </div>
  </>
}