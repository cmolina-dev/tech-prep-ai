"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Interview Setup" },
    { href: "/interview", label: "Practice" },
    { href: "/results", label: "Results" },
    { href: "/summary", label: "Summary" },
  ];

  // Hide header on interview page
  if (pathname?.startsWith("/interview") || pathname?.startsWith("/settings")) {
    return null;
  }

  return (
    <header className="bg-secondary border-b border-border sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">TechPrepAI</span>
        </Link>

        {/* <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-md text-sm font-medium text-secondary-foreground transition-colors hover:text-white hover:bg-muted ${
                pathname === item.href ? 'text-white bg-muted' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav> */}

        <div className="flex items-center gap-2">
          <Link href="/settings">
            <div className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors mr-2 cursor-pointer text-secondary-foreground hover:text-white">
              <Settings className="w-5 h-5" />
            </div>
          </Link>
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-white font-semibold text-sm">
            <span>C</span>
          </div>
        </div>
      </div>
    </header>
  );
}
