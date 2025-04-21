import { Head, Link } from "@inertiajs/react";

export default function LoginPage() {
  return <>
    <Head title="Masuk"/>
    <div className="w-full max-w-6xl m-auto h-[calc(100vh-80px)] max-h-[900px] flex justify-center items-center">
      <form className="w-full max-w-lg px-6" method="post">
        <h1 className="text-3xl font-bold mb-4">Masuk</h1>
        <p>Silahkan masuk untuk mengakses beberapa menu</p>
        <label className="w-full mt-3 block">
          <p className="font-bold mb-1.5">Nama Pengguna</p>
          <input
            className="w-full block border border-gray-200 rounded-md p-1.5 px-4 outline-blue-400"
            type="username"
            name="username"
            placeholder="urdin_wasih"
            minLength={4}
            required
          />
        </label>
        <label className="w-full mt-3 block">
          <p className="font-bold mb-1.5">Sandi</p>
          <input
            className="w-full block border border-gray-200 rounded-md p-1.5 px-4 outline-blue-400"
            type="password"
            name="password"
            placeholder="****************"
            minLength={6}
            required
          />
        </label>
        <button className="w-full block bg-blue-600 border border-blue-800 p-1 px-3 cursor-pointer rounded-md mt-6">
          <span className="font-bold text-white">Log In</span>
        </button>
        <div className="mt-6">
          <p>Belum punya akun? <Link href="/register" className="text-blue-500 hover:underline">Daftar disini</Link></p>
        </div>
      </form>
    </div>
  </>
}