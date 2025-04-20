import { Head } from "@inertiajs/react"
import { PlusIcon, SendIcon, TrashIcon } from "lucide-react"

export default function AddRecipe() {
  return <>
    <Head title="Ubah Resep Yang Ada"/>
    <div className="w-full max-w-7xl m-auto">
      <div className="w-full px-4 border-b pb-4 mb-4 border-gray-200">
        <div className="w-full flex items-center justify-between">
          <p>Ubah Resep Yang Ada</p>
          <div className="w-auto flex items-center">
            <button className="p-2 px-4 rounded-md border border-gray-200 flex items-center cursor-pointer mr-2">
              <SendIcon size={17}/>
              <span className="text-sm ml-2">Ubah</span>
            </button>
            <button className="p-2 px-4 rounded-md border border-red-700 flex items-center cursor-pointer bg-red-500 text-white">
              <TrashIcon size={17}/>
              <span className="text-sm ml-2">Hapus</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl m-auto pt-3 px-4">
        <label className="w-full block mt-2">
          <b className="font-bold mb-2 block w-full">Judul Resep</b>
          <input
            type="text"
            minLength={2}
            maxLength={82}
            className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400"
            placeholder="Your Subject Recipe..."
          />
        </label>
        <div className="w-full block mt-2">
          <b className="font-bold mb-2 block w-full">Tambah gambar cover</b>
          <button className="w-full mt-2 h-[120px] bg-gray-200 rounded-md flex justify-center items-center cursor-pointer" type="button">
            <span className="text-sm">Unggah file gambar</span>
          </button>
        </div>
        <label className="w-full block mt-2">
          <b className="font-bold mb-2 block w-full">Deskripsi</b>
          <textarea
            minLength={2}
            maxLength={120}
            className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400"
            placeholder="Deskripsi..."
          ></textarea>
        </label>
        <div className="w-full block mt-2">
          <b className="font-bold mb-2 block w-full">Bahan - bahan</b>
          <input
            type="text"
            minLength={2}
            maxLength={120}
            className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400 mb-2"
            placeholder="Bahan..."
            defaultValue="Telur 3"
          />
          <input
            type="text"
            minLength={2}
            maxLength={120}
            className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400 mb-2"
            placeholder="Bahan..."
            defaultValue="Garam 3"
          />
          <button className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400 mb-2 flex items-center justify-center cursor-pointer" type="button">
            <PlusIcon size={18}/>
            <span className="ml-2">Tambahkan</span>
          </button>
        </div>
        <div className="w-full block mt-2">
          <b className="font-bold mb-2 block w-full">Intruksi</b>
          <div className="flex mb-2">
            <div className="w-[90px]">
              <button className="bg-gray-100 rounded-md w-full h-[88px] cursor-pointer" type="button">
                <span className="text-sm">Tambahkan gambar</span>
              </button>
            </div>
            <div className="w-[calc(100%-90px)] pl-2">
              <textarea
                className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400 mb-2"
                placeholder="Intruksi..."
                defaultValue="Memasukan telur..."
              ></textarea>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="w-[90px]">
              <button className="bg-gray-100 rounded-md w-full h-[88px] cursor-pointer" type="button">
                <span className="text-sm">Tambahkan gambar</span>
              </button>
            </div>
            <div className="w-[calc(100%-90px)] pl-2">
              <textarea
                className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400 mb-2"
                placeholder="Intruksi..."
                defaultValue="Memasukan garam..."
              ></textarea>
            </div>
          </div>
          <button className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400 mb-2 flex items-center justify-center cursor-pointer" type="button">
            <PlusIcon size={18}/>
            <span className="ml-2">Tambahkan</span>
          </button>
        </div>
        <label className="w-full block mt-2">
          <b className="font-bold mb-2 block w-full">Porsi</b>
          <input
            type="text"
            minLength={2}
            maxLength={120}
            className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400"
            placeholder="Berapa porsi yang diizinkan..."
          />
        </label>
        <div className="w-full flex justify-between mt-1 mb-3">
          <label className="w-[calc(calc(100%/2)-2px)] block mt-2">
            <b className="font-bold mb-2 block w-full">Waktu Masak</b>
            <input
              type="text"
              minLength={2}
              maxLength={120}
              className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400"
              placeholder="72 (menit)..."
            />
          </label>
          <label className="w-[calc(calc(100%/2)-2px)] block mt-2">
            <b className="font-bold mb-2 block w-full">Waktu mempersiapkan</b>
            <input
              type="text"
              minLength={2}
              maxLength={120}
              className="w-full border border-gray-200 p-1.5 px-3 rounded-md text-[0.9rem] outline-blue-400"
              placeholder="72 (menit)..."
            />
          </label>
        </div>
      </div>
    </div>
  </>
}
