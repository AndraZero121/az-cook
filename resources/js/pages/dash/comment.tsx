import CardComment from '@/components/CardComment';
import { Head, Link } from '@inertiajs/react';
import { Search, ChevronRight, ArrowRight, PlusIcon, MoveRightIcon, PanelLeft, ChevronLeftIcon } from 'lucide-react';

const listCommentDummy = [
  {
    username: "prichaalox21",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Web ini sangat membantu, kunjungi di ####𝘼##𝙍7## terima kasih!",
    relate: 'Sushi Platter',
    relate_slug: 'sushi-platter',
    id: 1,
    reply: [
      {
        username: "rika_matsui",
        icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
        comment: "Ga usah promosi judol bangsat!",
        id: 101
      }
    ]
  },
  {
    username: "Rahmi",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Saya suka penjelasannya, mudah dipahami.",
    relate: 'Sushi Platter',
    relate_slug: 'sushi-platter',
    id: 2,
    reply: [
      {
        username: "konota",
        icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
        comment: "Iya, apalagi bagian diagram itu.",
        id: 102
      }
    ]
  },
  {
    username: "rina_takasih",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Bisa tolong dijelaskan lebih detail bagian terakhir?",
    relate: 'Sushi Platter',
    relate_slug: 'sushi-platter',
    id: 3,
    reply: [
      {
        username: "author_bot",
        icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
        comment: "Tentu, bagian mana yang kurang jelas menurutmu?",
        id: 103
      },
      {
        username: "rahmi",
        icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
        comment: "Aku juga sempat bingung, tapi setelah baca ulang, jadi paham.",
        id: 104
      }
    ]
  },
  {
    username: "ridho_pratama",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Kerja bagus. Lanjutkan.",
    relate: 'Sushi Platter',
    relate_slug: 'sushi-platter',
    id: 4,
    reply: []
  },
  {
    username: "niku",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Terima kasih banyak, sangat informatif.",
    relate: 'Sushi Platter',
    relate_slug: 'sushi-platter',
    id: 5,
    reply: [
      {
        username: "konota",
        icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
        comment: "Iya, pas banget buat tugas kuliah.",
        id: 105
      }
    ]
  },
  {
    username: "azura",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Ada typo di bagian ketiga, mungkin bisa dikoreksi.",
    relate: 'Sushi Platter',
    relate_slug: 'sushi-platter',
    id: 6,
    reply: [
      {
        username: "author_bot",
        icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
        comment: "Terima kasih atas masukannya! Sudah saya perbaiki.",
        id: 106
      }
    ]
  },
  {
    username: "fajar_syah",
    icon: "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?semt=ais_hybrid&w=740",
    comment: "Ini sangat berguna untuk pemula, tolong teruskan kontennya ya.",
    relate: 'Sushi Platter',
    relate_slug: 'sushi-platter',
    id: 7,
    reply: []
  }
]


export default function CommentManagePage() {
  return <>
    <Head title='Manage Comment'/>
    <div className='max-w-7xl m-auto px-4'>
      <Link className='flex items-center' href='/dash'>
        <ChevronLeftIcon size={18} className='mr-2'/>
        <span>Kembali Ke Halaman Utama</span>
      </Link>
      <div className='w-full'>
        {listCommentDummy.map((data, i) => (
          <CardComment data={data} key={i} moderator={true}/>
        ))}
      </div>
    </div>
  </>
}