"use client";

import Link from "next/link";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("navbar");

  const navItems: { label: string; href: string }[] = t.raw("items");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/80 dark:bg-black/60 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">Antonio Lozano</h1>
        <LanguageSwitcher />

        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
