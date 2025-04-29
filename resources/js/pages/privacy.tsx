import { Head } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";

export default function PrivacyPage() {
  return (
    <MainLayout>
      <Head title="Kebijakan Privasi"/>
      
      <div className="w-full max-w-4xl mx-auto py-12">
        <div className="px-6">
          <h1 className="text-3xl font-bold">Kebijakan Privasi</h1>
          <div className="mt-8 prose prose-blue max-w-none">
            <p className="lead">
              Kebijakan Privasi ini menjelaskan bagaimana AZ Cook mengumpulkan, menggunakan, 
              dan melindungi informasi pribadi Anda saat Anda menggunakan layanan kami.
            </p>

            <h2>1. Informasi yang Kami Kumpulkan</h2>
            <p>Kami mengumpulkan informasi berikut:</p>
            <ul>
              <li>Informasi yang Anda berikan saat mendaftar (nama, email, dll)</li>
              <li>Informasi profil yang Anda tambahkan ke akun Anda</li>
              <li>Konten yang Anda unggah ke platform</li>
              <li>Informasi penggunaan dan interaksi dengan layanan kami</li>
              <li>Informasi teknis seperti alamat IP dan data browser</li>
            </ul>

            <h2>2. Penggunaan Informasi</h2>
            <p>Kami menggunakan informasi Anda untuk:</p>
            <ul>
              <li>Menyediakan dan memelihara layanan kami</li>
              <li>Meningkatkan dan mengembangkan layanan kami</li>
              <li>Berkomunikasi dengan Anda tentang layanan kami</li>
              <li>Mencegah aktivitas yang melanggar hukum</li>
              <li>Memenuhi kewajiban hukum</li>
            </ul>

            <h2>3. Penyimpanan Data</h2>
            <p>
              Kami menyimpan data Anda selama akun Anda aktif atau selama diperlukan untuk 
              memberikan layanan kepada Anda. Jika Anda menghapus akun Anda, kami akan 
              menghapus informasi Anda dalam waktu yang wajar.
            </p>

            <h2>4. Keamanan Data</h2>
            <p>
              Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi 
              Anda dari akses yang tidak sah atau pengungkapan. Namun, tidak ada sistem 
              yang sepenuhnya aman.
            </p>

            <h2>5. Berbagi Informasi</h2>
            <p>
              Kami tidak menjual informasi pribadi Anda. Kami mungkin membagikan informasi 
              Anda dalam keadaan berikut:
            </p>
            <ul>
              <li>Dengan persetujuan Anda</li>
              <li>Untuk memenuhi kewajiban hukum</li>
              <li>Dengan penyedia layanan yang membantu kami mengoperasikan platform</li>
              <li>Saat diperlukan untuk melindungi hak atau keamanan</li>
            </ul>

            <h2>6. Cookie dan Teknologi Pelacakan</h2>
            <p>
              Kami menggunakan cookie dan teknologi pelacakan serupa untuk mengumpulkan 
              informasi tentang bagaimana Anda menggunakan layanan kami. Anda dapat 
              mengatur browser Anda untuk menolak cookie.
            </p>

            <h2>7. Hak Privasi Anda</h2>
            <p>Anda memiliki hak untuk:</p>
            <ul>
              <li>Mengakses informasi pribadi Anda</li>
              <li>Memperbarui atau mengoreksi informasi Anda</li>
              <li>Meminta penghapusan informasi Anda</li>
              <li>Menolak penggunaan informasi Anda untuk tujuan tertentu</li>
              <li>Menarik persetujuan Anda</li>
            </ul>

            <h2>8. Perubahan Kebijakan</h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan 
              memberi tahu Anda tentang perubahan signifikan melalui email atau pemberitahuan 
              di situs web kami.
            </p>

            <h2>9. Kontak</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau bagaimana 
              kami menangani informasi Anda, silakan hubungi kami di privacy@azcook.id
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