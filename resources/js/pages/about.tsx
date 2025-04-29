import { Head } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import { ChefHat, Share2, Users, Utensils } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <ChefHat size={32}/>,
      title: "Resep Berkualitas",
      description: "Temukan ribuan resep berkualitas dari koki berbakat di seluruh Indonesia"
    },
    {
      icon: <Share2 size={32}/>,
      title: "Berbagi Pengalaman",
      description: "Bagikan resep favorit Anda dan dapatkan umpan balik dari komunitas"
    },
    {
      icon: <Users size={32}/>,
      title: "Komunitas Aktif",
      description: "Bergabung dengan komunitas memasak yang saling mendukung dan berbagi"
    },
    {
      icon: <Utensils size={32}/>,
      title: "Tips & Trik",
      description: "Pelajari teknik memasak dari koki berpengalaman melalui resep detail"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Resep" },
    { number: "50,000+", label: "Pengguna" },
    { number: "100,000+", label: "Ulasan" },
    { number: "1,000,000+", label: "Masakan Dibuat" }
  ];

  const team = [
    {
      name: "Ahmad Zaini",
      role: "Founder & CEO",
      photo: "/team/ahmad.jpg"
    },
    {
      name: "Dewi Putri",
      role: "Head of Content",
      photo: "/team/dewi.jpg"
    },
    {
      name: "Budi Santoso",
      role: "Lead Developer",
      photo: "/team/budi.jpg"
    },
    {
      name: "Siti Rahayu",
      role: "Community Manager",
      photo: "/team/siti.jpg"
    }
  ];

  return (
    <MainLayout>
      <Head title="Tentang AZ Cook"/>
      
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/about-hero.jpg" 
            alt="Kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"/>
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Misi Kami
            </h1>
            <p className="max-w-2xl text-lg md:text-xl">
              Memudahkan setiap orang untuk menemukan dan berbagi resep masakan, 
              sambil membangun komunitas kuliner yang saling mendukung.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Kenapa AZ Cook?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platform kami dirancang untuk memudahkan Anda menemukan inspirasi 
              memasak dan berbagi pengalaman kuliner dengan komunitas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-blue-500 text-white">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Tim Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bertemu dengan orang-orang yang bekerja keras di balik layar untuk 
              membuat AZ Cook menjadi platform resep terbaik di Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="py-16 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Visi Kami
            </h2>
            <p className="text-gray-600 text-lg">
              Kami percaya bahwa memasak adalah cara universal untuk menghubungkan 
              orang dan budaya. Visi kami adalah menjadi platform resep terpercaya 
              yang menginspirasi jutaan orang untuk memasak, berbagi, dan terhubung 
              melalui makanan.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}