import { usePage } from "@inertiajs/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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