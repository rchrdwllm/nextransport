import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
    children: ReactNode;
    className?: string;
    withSafeArea?: boolean;
}

export const MobileLayout = ({ children, className, withSafeArea = true }: MobileLayoutProps) => {
    return (
        <div
            className={cn(
                "min-h-screen w-full max-w-lg mx-auto bg-background",
                withSafeArea && "safe-area-bottom safe-area-top",
                className
            )}
        >
            {children}
        </div>
    );
};
