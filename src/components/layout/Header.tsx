"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/customize", label: "Customize" },
    { href: "/services", label: "Services" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="font-bold">Apex Configurator</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
