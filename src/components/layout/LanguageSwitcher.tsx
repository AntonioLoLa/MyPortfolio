'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-border p-0.5 text-xs font-medium transition-opacity',
        isPending && 'opacity-60',
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          aria-pressed={locale === code}
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              router.replace(pathname, { locale: code, scroll: false });
            })
          }
          className={cn(
            'rounded-full px-2.5 py-1 transition-colors',
            locale === code
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
