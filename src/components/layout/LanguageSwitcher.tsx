'use client';

import { useEffect, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const locales = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
] as const;

export default function LanguageSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Prefetch the other locale so switching feels instant, especially on mobile — once the
  // page is idle, so it never competes with first paint for bandwidth.
  useEffect(() => {
    const prefetch = () =>
      locales
        .filter(({ code }) => code !== locale)
        .forEach(({ code }) => router.prefetch(pathname, { locale: code }));
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prefetch, 2000);
    return () => clearTimeout(id);
  }, [locale, pathname, router]);

  return (
    <div role="group" aria-label={label} className={cn('flex items-center', isPending && 'opacity-60')}>
      {locales.map(({ code, label: short, name }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && (
            <span className="px-1 text-ink-3" aria-hidden>
              /
            </span>
          )}
          <button
            type="button"
            lang={code}
            title={name}
            aria-pressed={locale === code}
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                router.replace(pathname, { locale: code, scroll: false });
              })
            }
            className={cn(
              'py-3 uppercase transition-colors',
              locale === code ? 'text-ink underline decoration-signal underline-offset-4' : 'text-ink-3 hover:text-ink',
            )}
          >
            {short}
          </button>
        </span>
      ))}
    </div>
  );
}
