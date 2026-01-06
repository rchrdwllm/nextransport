'use client';

import { Logo } from "@/components/branding/logo";
import { mockUser } from "@/data/mockData";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-3 bg-card p-4 border-border border-b">
        <Logo size="sm" showText={false} />
        <div className="relative flex-1">
          {/* Search container */}
        </div>
        <div 
          className="flex justify-center items-center bg-secondary border border-border rounded-full w-10 h-10 font-bold text-primary cursor-pointer"
          onClick={() => router.push('/profile')}
        >
          {mockUser.firstName[0]}
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
