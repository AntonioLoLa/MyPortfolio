'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('navbar.theme');

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
      aria-label={theme === 'dark' ? t('light') : t('dark')}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm">{theme === 'dark' ? t('light') : t('dark')}</span>
    </button>
  );
}