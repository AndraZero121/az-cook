import { usePage } from "@inertiajs/react";
import Header from "@/meta/Header";
import Footer from "@/meta/Footer";
import { Head } from "@inertiajs/react";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function DashLayout({ children, title }: Props) {
  const { auth } = usePage().props as any;

  return (
    <div className="flex min-h-screen flex-col">
      {title && <Head title={title} />}
      <Header account={auth.user} />
      <main className="flex-1 bg-gray-50 pt-[60px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
