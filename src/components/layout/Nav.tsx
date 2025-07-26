"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Wrench,
  Settings,
  User,
  SquareStack,
  Bell,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useUserStore } from "@/store/user-store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";

export function Nav() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useUserStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/customize", label: "Customize", icon: SquareStack },
    { href: "/services", label: "Services", icon: Wrench },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <TooltipProvider>
        <nav className="hidden md:flex h-screen flex-col items-center justify-between w-24 bg-sidebar text-sidebar-foreground p-4 rounded-r-3xl fixed top-0 left-0">
          <div className="flex flex-col items-center gap-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex flex-col items-center gap-2 text-sidebar-primary"
                >
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <span className="sr-only">Apex Auto Mods</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Apex Auto Mods</TooltipContent>
            </Tooltip>
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
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50"
                        )}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="sr-only">{link.label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{link.label}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          {isClient &&
            (isAuthenticated && user ? (
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
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Profile</TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/login"
                      className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors hover:bg-sidebar-accent/50 bg-primary text-primary-foreground"
                    >
                      <LogIn className="h-6 w-6" />
                      <span className="sr-only">Login</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Login</TooltipContent>
                </Tooltip>
              </div>
            ))}
        </nav>
      </TooltipProvider>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="flex justify-around h-16 items-center">
          {navLinks.slice(0, 4).map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center text-muted-foreground w-full h-full transition-colors",
                  isActive ? "text-primary bg-primary/10" : "hover:bg-muted/50"
                )}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{link.label}</span>
              </Link>
            );
          })}
          {isClient &&
            (isAuthenticated && user ? (
              <Link
                href="/profile"
                className={cn(
                  "flex flex-col items-center justify-center text-muted-foreground w-full h-full transition-colors",
                  pathname === "/profile"
                    ? "text-primary bg-primary/10"
                    : "hover:bg-muted/50"
                )}
              >
                <User className="h-6 w-6 mb-1" />
                <span className="text-xs">Profile</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full transition-colors bg-primary text-primary-foreground"
                )}
              >
                <LogIn className="h-6 w-6 mb-1" />
                <span className="text-xs">Login</span>
              </Link>
            ))}
        </div>
      </nav>
    </>
  );
}
