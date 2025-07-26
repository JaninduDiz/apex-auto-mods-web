"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Wrench,
    Settings,
    User,
    SquareStack,
    Bell,
    PanelLeft
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/customize", label: "Customize", icon: SquareStack },
    { href: "/services", label: "Services", icon: Wrench },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
             <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Wrench className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Apex Auto Mods</span>
                        </Link>
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                                    pathname === link.href && "text-foreground"
                                )}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 md:hidden">
                <Wrench className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Apex Auto Mods</span>
            </div>
        </header>
    );
}
