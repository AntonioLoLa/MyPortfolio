'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { cn } from '@/lib/utils';
import { cvHref } from '@/lib/site';

const sectionIds = ['about', 'experience', 'projects', 'skills', 'education', 'contact'] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [active, setActive] = useState<string>('about');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <nav className="container-base flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-sm font-bold text-background">
            AL
          </span>
          <span className="hidden sm:inline">Antonio Lozano</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sectionIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm transition-colors',
                  active === id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t(id)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={cvHref(locale)}
            download
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent/60 sm:inline-flex"
          >
            <FileText size={15} />
            {t('resume')}
          </a>
          <button
            type="button"
            aria-label={open ? t('close') : t('menu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <ul className="container-base flex flex-col py-3">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-2.5 text-sm',
                    active === id ? 'bg-muted text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {t(id)}
                </a>
              </li>
            ))}
            <li>
              <a
                href={cvHref(locale)}
                download
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-accent"
              >
                <FileText size={15} />
                {t('resume')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
