import { Head, Link, useForm } from "@inertiajs/react";

export default function LoginPage() {
  const { data, setData, post, processing, errors } = useForm<{
    email: string;
    password: string;
    remember: boolean;
  }>({
    email: '',
    password: '',
    remember: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('login.store'));
  }

  return <>
    <Head title="Masuk"/>
    <div className="w-full max-w-6xl m-auto h-[calc(100vh-80px)] max-h-[900px] flex justify-center items-center">
      <form className="w-full max-w-lg px-6" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4">Masuk</h1>
        <p>Silahkan masuk untuk mengakses beberapa menu</p>
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
          <p className="font-bold mb-1.5">Sandi</p>
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
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.remember}
              onChange={e => setData('remember', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={processing}
          className={"w-full block bg-blue-600 border border-blue-800 p-1 px-3 cursor-pointer rounded-md mt-6 " +
            (processing ? "opacity-75" : "hover:bg-blue-700")}
        >
          <span className="font-bold text-white">
            {processing ? 'Memproses...' : 'Masuk'}
          </span>
        </button>
        <div className="mt-6">
          <p>Belum punya akun? <Link href={route('register')} className="text-blue-500 hover:underline">Daftar disini</Link></p>
        </div>
      </form>
    </div>
  </>
}
