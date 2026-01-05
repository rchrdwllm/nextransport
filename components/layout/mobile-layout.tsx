import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  withSafeArea?: boolean;
}

export const MobileLayout = ({
  children,
  className,
  withSafeArea = true,
}: MobileLayoutProps) => {
  return (
    <div
      className={cn(
        "flex-1 bg-background mx-auto w-full max-w-lg",
        withSafeArea && "safe-area-bottom safe-area-top",
        className
      )}
    >
      {children}
    </div>
  );
};
