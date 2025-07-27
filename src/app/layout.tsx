import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/layout/Nav";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Apex Auto Mods",
  description: "Customize your ride with Apex Auto Mods Garage.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-sans antialiased")}>
        <div className="flex min-h-screen w-full">
          <Nav />
          <div className="flex flex-col flex-1 md:pl-24">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 md:pt-4">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
