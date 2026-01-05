import { Logo } from "@/components/branding/logo";
import { Input } from "@/components/ui/input";
import { mockUser } from "@/data/mockData";
import { Search } from "lucide-react";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="flex items-center gap-3 bg-card p-4 border-border border-b">
        <Logo size="sm" showText={false} />
        <div className="relative flex-1">
          <Search className="top-1/2 left-3 absolute w-5 h-5 text-muted-foreground -translate-y-1/2" />
          <Input placeholder="Search places…" className="pl-10" />
        </div>
        <div className="flex justify-center items-center bg-secondary border border-border rounded-full w-10 h-10 font-bold text-primary">
          {mockUser.firstName[0]}
        </div>
      </header>
      {children}
    </>
  );
};

export default Layout;
