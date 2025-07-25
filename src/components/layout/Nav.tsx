"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Wrench,
    LayoutDashboard,
    Car,
    Settings,
    LogIn,
    UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";


export function Nav() {
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/customize", label: "Customize", icon: Car },
        { href: "/services", label: "Services", icon: Settings },
    ];

    const bottomLinks = [
        { href: "/login", label: "Login", icon: LogIn },
        { href: "/register", label: "Sign Up", icon: UserPlus },
    ];

    const renderLink = (link: { href: string, label: string, icon: React.ElementType }) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
            <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                    <Link
                        href={link.href}
                        className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                            isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        <Icon className="h-6 w-6" />
                        <span className="sr-only">{link.label}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.label}</TooltipContent>
            </Tooltip>
        )
    };

    return (
        <nav className="flex flex-col items-center gap-4 px-4 w-20 flex-1">
            <div className="flex flex-col items-center gap-4">
                {navLinks.map(renderLink)}
            </div>
            <div className="mt-auto flex flex-col items-center gap-4">
                {bottomLinks.map(renderLink)}
            </div>
        </nav>
    );
}