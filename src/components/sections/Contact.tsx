import { getFormatter, getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site';
import { syncedAt } from '@/lib/github';
import { Legend } from '@/components/ui/Evidence';

/**
 * Contact and colophon: the back page, on the same paper with a heavy rule like a back
 * cover. The evidence key closes the issue it opened.
 */
export default async function Contact() {
  const t = await getTranslations('contact');
  const tc = await getTranslations('colophon');
  const format = await getFormatter();
  const synced = format.dateTime(new Date(syncedAt), { dateStyle: 'long' });
  const year = new Date().getFullYear();

  const links = [
    { href: siteConfig.social.linkedin, label: t('linkedin'), external: true },
    { href: siteConfig.social.github, label: t('github'), external: true },
    { href: siteConfig.cv, label: t('cv'), download: true },
  ];

  return (
    <footer id="contact" className="scroll-mt-12">
      <div className="page pb-10">
        <div className="running-head meta border-t-[3px]">
          <span>{t('kicker')}</span>
        </div>
        <h2 className="display mt-8 max-w-[18ch] text-[clamp(2.3rem,5.4vw,4.8rem)]">{t('title')}</h2>
        <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-2">{t('text')}</p>

        <a
          href={`mailto:${siteConfig.email}`}
          className="display mt-10 inline-block break-all text-[clamp(1.4rem,3.4vw,2.6rem)] italic underline decoration-signal-mark decoration-2 underline-offset-[0.18em] hover:text-signal"
        >
          {siteConfig.email}
        </a>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-label uppercase">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="link"
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...(l.download ? { download: true } : {})}
              >
                {l.download ? '↓' : '↗'} {l.label}
              </a>
            </li>
          ))}
          <li className="text-ink-3">{t('location')}</li>
        </ul>

        <div className="mt-24 grid gap-10 border-t border-rule pt-6 text-ink-2 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <p className="meta mb-2">{tc('title')}</p>
            <p className="text-label">{tc('type')}</p>
            <p className="mt-2 text-label">{tc('sync', { date: synced })}</p>
            <a
              href="https://github.com/AntonioLoLa/MyPortfolio"
              className="link mt-3 inline-block font-mono text-meta uppercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ {tc('source')}
            </a>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Legend />
          </div>
        </div>
        <p className="mt-10 font-mono text-meta uppercase text-ink-3">{tc('copyright', { year })}</p>
      </div>
    </footer>
  );
}
