
"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    LayoutDashboard,
    Wrench,
    Settings,
    User,
    SquareStack,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";


export function Nav() {
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/customize", label: "Customize", icon: SquareStack },
        { href: "/services", label: "Services", icon: Wrench },
        { href: "/settings", label: "Settings", icon: Settings },
    ];
    
    return (
        <TooltipProvider>
            <nav className="fixed left-0 top-0 z-50 flex h-full flex-col items-center justify-between w-24 bg-sidebar text-sidebar-foreground p-4 rounded-r-3xl">
                <div className="flex flex-col items-center gap-8 pt-4">
                    <div className="flex flex-col items-center gap-4">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Tooltip key={link.href}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                                                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
                                            )}
                                        >
                                            <Icon className="h-6 w-6" />
                                            <span className="sr-only">{link.label}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{link.label}</TooltipContent>
                                </Tooltip>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors hover:bg-sidebar-accent/50">
                                <Bell className="h-6 w-6" />
                                <span className="sr-only">Notifications</span>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Notifications</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/profile">
                               <Image src="https://placehold.co/40x40.png" width={40} height={40} alt="User Profile" className="rounded-full" data-ai-hint="man avatar"/>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Profile</TooltipContent>
                    </Tooltip>
                </div>
            </nav>
        </TooltipProvider>
    );
}
