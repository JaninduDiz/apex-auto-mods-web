"use client";

import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-bold text-lg">Apex Auto Mods</span>
                </Link>
            </div>
        </header>
    );
}
