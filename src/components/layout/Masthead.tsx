import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site';
import LanguageSwitcher from './LanguageSwitcher';

const sections = ['work', 'practice', 'trajectory', 'contact'] as const;

/**
 * Sticky running header. No hamburger: on small screens the section list scrolls
 * horizontally on its own row, so navigation never needs JavaScript or hides behind a tap.
 */
export default async function Masthead() {
  const t = await getTranslations('nav');
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-ink px-3 py-2 text-paper focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        {t('skip')}
      </a>
      <header className="sticky top-0 z-50 border-b border-rule bg-paper">
        <div className="page flex h-12 items-center gap-4 sm:gap-6">
          <a href="#top" className="shrink-0 font-display text-[1.05rem] italic leading-none tracking-tight">
            Antonio Lozano
          </a>
          <nav aria-label={t('label')} className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]">
            <ul className="flex items-center gap-4 whitespace-nowrap font-mono text-meta uppercase text-ink-2 sm:gap-6">
              {sections.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-block py-3 hover:text-ink">
                    {t(id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center gap-3 font-mono text-meta uppercase">
            <a href={siteConfig.cv} className="link hidden sm:inline" download>
              {t('cv')} ↓
            </a>
            <LanguageSwitcher label={t('language')} />
          </div>
        </div>
      </header>
    </>
  );
}
