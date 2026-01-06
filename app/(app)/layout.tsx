"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "@bprogress/next";
import { ReactNode, useEffect, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [userInitial, setUserInitial] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Get first initial from user metadata
      const firstName = user?.user_metadata?.firstName || user?.email;
      setUserInitial(firstName[0].toUpperCase() || "J");
    };

    getUser();
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-3 bg-card p-4 border-border border-b">
        <h1 className="font-bold text-xl">NexTranspo</h1>
        <div className="relative flex-1">{/* Search container */}</div>
        <div
          className="flex justify-center items-center bg-secondary border border-border rounded-full w-10 h-10 font-bold text-primary cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          {userInitial}
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
