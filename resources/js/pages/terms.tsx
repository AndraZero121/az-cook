import { Head } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";

export default function TermsPage() {
  return (
    <MainLayout>
      <Head title="Syarat dan Ketentuan"/>
      
      <div className="w-full max-w-4xl mx-auto py-12">
        <div className="px-6">
          <h1 className="text-3xl font-bold">Syarat dan Ketentuan</h1>
          <div className="mt-8 prose prose-blue max-w-none">
            <p className="lead">
              Selamat datang di AZ Cook. Dengan mengakses dan menggunakan layanan kami, 
              Anda menyetujui untuk terikat dengan syarat dan ketentuan berikut.
            </p>

            <h2>1. Penggunaan Layanan</h2>
            <p>
              AZ Cook menyediakan platform untuk berbagi dan menemukan resep masakan. 
              Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah dan 
              sesuai dengan syarat dan ketentuan ini.
            </p>

            <h2>2. Akun Pengguna</h2>
            <p>
              Untuk menggunakan fitur tertentu dari layanan kami, Anda mungkin perlu 
              membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan informasi 
              akun Anda dan semua aktivitas yang terjadi di bawah akun Anda.
            </p>

            <h2>3. Konten Pengguna</h2>
            <p>
              Dengan mengunggah konten ke AZ Cook, Anda memberikan kami lisensi non-eksklusif 
              untuk menggunakan, memodifikasi, menampilkan, dan mendistribusikan konten tersebut 
              di platform kami. Anda tetap mempertahankan hak atas konten Anda.
            </p>

            <h2>4. Perilaku yang Dilarang</h2>
            <ul>
              <li>Mengunggah konten yang melanggar hak cipta</li>
              <li>Menyalahgunakan atau mengganggu layanan</li>
              <li>Membuat akun palsu atau menyesatkan</li>
              <li>Melakukan tindakan yang melanggar hukum</li>
            </ul>

            <h2>5. Perubahan Layanan</h2>
            <p>
              Kami berhak untuk memodifikasi atau menghentikan layanan kami, baik sementara 
              maupun permanen, dengan atau tanpa pemberitahuan sebelumnya.
            </p>

            <h2>6. Batasan Tanggung Jawab</h2>
            <p>
              AZ Cook tidak bertanggung jawab atas kerugian yang mungkin timbul dari 
              penggunaan layanan kami atau konten yang diunggah oleh pengguna.
            </p>

            <h2>7. Hukum yang Berlaku</h2>
            <p>
              Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap 
              perselisihan yang timbul akan diselesaikan di bawah yurisdiksi pengadilan 
              yang berwenang di Indonesia.
            </p>

            <h2>8. Perubahan Syarat dan Ketentuan</h2>
            <p>
              Kami berhak untuk mengubah syarat dan ketentuan ini setiap saat. Perubahan 
              akan efektif setelah diposting di situs web. Penggunaan berkelanjutan atas 
              layanan kami setelah perubahan tersebut merupakan persetujuan Anda terhadap 
              syarat dan ketentuan yang diubah.
            </p>

            <h2>9. Kontak</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan 
              hubungi kami melalui email di support@azcook.id
            </p>

            <div className="mt-8 text-gray-500 text-sm">
              Terakhir diperbarui: 29 April 2025
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}