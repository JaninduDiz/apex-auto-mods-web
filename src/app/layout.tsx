import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Nav } from '@/components/layout/Nav';

export const metadata: Metadata = {
  title: 'Apex Auto Mods',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-sans antialiased")}>
        <div className="flex min-h-screen w-full">
          <Nav />
          <main className="flex-1 pl-24">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
