export default function Footer() {
  return <footer className="w-full bg-gray-100 pt-2.5">
    <div className="w-full max-w-7xl m-auto px-6 p-4 flex flex-wrap border-b border-gray-300">
      <div className="w-full md:w-[calc(100%-400px)] max-md:mb-4 px-2 md:pr-3.5">
        <div className="w-full flex items-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/113/113339.png"
            alt="Icon"
            width="37px"
          />
          <b className="font-bold ml-3">MasakanTergacor🔥</b>
        </div>
        <p className="text-sm text-gray-500">Tempat resep makanan terbaik ANTI BANGKRUT dan GACOR ABIZ🔥, ga kaya kamu yang main JUDI ONLINE tapi ga dapet dapet alias KERE📦, mending buat makanan, perut pun terisi, hiduppun tenang 🗣️ BOS!</p>
      </div>
      <div className="w-[calc(100%/2)] md:w-[200px] px-2">
        <h3 className="font-bold text-lg">Lainnya</h3>
        <ul className="mt-4">
          <li><a href="/#hash" className="my-1.5 block">Beranda</a></li>
          <li><a href="/#hash" className="my-1.5 block">Dukungan</a></li>
          <li><a href="/#hash" className="my-1.5 block">Share Recipe</a></li>
        </ul>
      </div>
      <div className="w-[calc(100%/2)] md:w-[200px] px-2">
        <h3 className="font-bold text-lg">Legalitas</h3>
        <ul className="mt-4">
          <li><a href="/#hash" className="my-1.5 block">Syarat Dan Ketentuan</a></li>
          <li><a href="/#hash" className="my-1.5 block">Keamanan Privasi</a></li>
          <li><a href="/#hash" className="my-1.5 block">Tentang Layanan</a></li>
        </ul>
      </div>
    </div>
    <div className="w-full max-w-7xl m-auto px-6 p-4 flex items-center">
      <p className="text-sm text-muted">{`© ${new Date().getFullYear()} AZ-MasakanTergacor!`} Frontend or design made by <a href="https://github.com/ernestoyoofi" target="_blank" rel="noopener" className="text-blue-700 hover:underline">@ernestoyoofi</a></p>
    </div>
  </footer>
}