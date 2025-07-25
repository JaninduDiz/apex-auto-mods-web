import type {Metadata} from 'next';
import './globals.css';
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { Nav } from '@/components/layout/Nav';

export const metadata: Metadata = {
  title: 'Apex Configurator',
  description: 'Customize your ride with Apex Auto Mods Garage.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased min-h-screen bg-background")}>
        <SidebarProvider defaultOpen={true}>
            <div className="flex">
                <div className="flex flex-col items-center pt-8 border-r bg-sidebar text-sidebar-foreground">
                    <Link href="/" className="flex items-center gap-2 pb-8">
                        <Wrench className="h-8 w-8 text-primary" />
                    </Link>
                    <Nav />
                </div>
                <div className="flex-1">
                    <Header />
                    <main>{children}</main>
                </div>
            </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
