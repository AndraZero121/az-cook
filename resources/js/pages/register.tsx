import { Head, Link, useForm } from "@inertiajs/react";

export default function RegisterPage() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('register.store'));
  }

  return <>
    <Head title="Daftar"/>
    <div className="w-full max-w-6xl m-auto h-[calc(100vh-80px)] max-h-[900px] flex justify-center items-center">
      <form className="w-full max-w-lg px-6" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4">Daftar</h1>
        <p>Silahkan daftar untuk membuat akun baru</p>

        <label className="w-full mt-3 block">
          <p className="font-bold mb-1.5">Nama</p>
          <input
            className={"w-full block border rounded-md p-1.5 px-4 outline-blue-400 " +
              (errors.name ? "border-red-500" : "border-gray-200")}
            type="text"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </label>

        <label className="w-full mt-3 block">
          <p className="font-bold mb-1.5">Email</p>
          <input
            className={"w-full block border rounded-md p-1.5 px-4 outline-blue-400 " +
              (errors.email ? "border-red-500" : "border-gray-200")}
            type="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </label>

        <label className="w-full mt-3 block">
          <p className="font-bold mb-1.5">Kata Sandi</p>
          <input
            className={"w-full block border rounded-md p-1.5 px-4 outline-blue-400 " +
              (errors.password ? "border-red-500" : "border-gray-200")}
            type="password"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </label>

        <label className="w-full mt-3 block">
          <p className="font-bold mb-1.5">Konfirmasi Kata Sandi</p>
          <input
            className={"w-full block border rounded-md p-1.5 px-4 outline-blue-400 " +
              (errors.password_confirmation ? "border-red-500" : "border-gray-200")}
            type="password"
            value={data.password_confirmation}
            onChange={e => setData('password_confirmation', e.target.value)}
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={processing}
          className={"w-full block bg-blue-600 border border-blue-800 p-1 px-3 cursor-pointer rounded-md mt-6 " +
            (processing ? "opacity-75" : "hover:bg-blue-700")}
        >
          <span className="font-bold text-white">
            {processing ? 'Memproses...' : 'Daftar'}
          </span>
        </button>

        <div className="mt-6">
          <p>Sudah punya akun? <Link href={route('login')} className="text-blue-500 hover:underline">Masuk disini</Link></p>
        </div>
      </form>
    </div>
  </>;
}
