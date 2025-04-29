import { usePage } from "@inertiajs/react";
import Header from "@/components/Header";

interface Props {
  children: React.ReactNode;
}

export default function DashLayout({ children }: Props) {
  const { auth } = usePage().props as any;

  return (
    <div className="flex min-h-screen flex-col">
      <Header account={auth.user} />
      <main className="flex-1 bg-gray-50 pt-[60px]">
        {children}
      </main>
    </div>
  );
}