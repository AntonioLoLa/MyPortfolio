'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  mobile?: boolean;
}

export default function Navbar({ mobile = false }: NavbarProps) {
  const t = useTranslations('navbar');
  const navItems: { label: string; href: string }[] = t.raw('items');

  if (mobile) {
    return (
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    );
  }

  return (
    <nav className="flex flex-col gap-6 text-sm font-medium text-slate-300">
      <h1 className="text-xl font-bold mb-4 text-white">Antonio Lozano</h1>
      <div className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-blue-400 hover:underline transition-colors">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto pt-6 border-t border-gray-700">
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
