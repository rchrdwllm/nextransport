import { cn } from "@/lib/utils";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    showText?: boolean;
}

export const Logo = ({ size = "md", className, showText = true }: LogoProps) => {
    const iconSizes = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    const textSizes = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-3xl",
    };

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className={cn(
                "gradient-hero rounded-xl flex items-center justify-center shadow-glow",
                iconSizes[size]
            )}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className={cn(
                        "text-primary-foreground",
                        size === "sm" ? "w-5 h-5" : size === "md" ? "w-7 h-7" : "w-9 h-9"
                    )}
                >
                    <path
                        d="M12 2L4 7v10l8 5 8-5V7l-8-5z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 12l8-5M12 12v10M12 12L4 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
            </div>
            {showText && (
                <div className="flex flex-col">
                    <span className={cn("font-bold tracking-tight text-foreground", textSizes[size])}>
                        NexTransport
                    </span>
                    {size !== "sm" && (
                        <span className="text-xs text-muted-foreground font-medium tracking-wide">
                            Decide. Commute. Arrive.
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
