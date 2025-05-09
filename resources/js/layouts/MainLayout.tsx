import { usePage } from "@inertiajs/react";
import Header from "@/meta/Header";
import Footer from "@/meta/Footer";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { auth } = usePage().props as any;

  return (
    <div className="flex min-h-screen flex-col">
      <Header account={auth.user} />
      <main className="flex-1 pt-[60px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
