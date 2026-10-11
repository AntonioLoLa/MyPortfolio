import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site';
import { f1Source } from '@/content/f1';
import Plate from '@/components/ui/Plate';
import { Legend } from '@/components/ui/Evidence';
import PhaseChart from '@/components/figures/PhaseChart';

/**
 * The cover. Asymmetric: the claim on the left, the evidence for it on the right. The
 * figure is a real result, not an illustration, so the first screen already shows how
 * the rest of the journal argues.
 */
export default async function Cover() {
  const t = await getTranslations('cover');
  const tf = await getTranslations('f1');

  const links = [
    { href: '#work', label: t('links.work'), mark: '→' },
    { href: siteConfig.social.github, label: t('links.github'), mark: '↗', external: true },
    { href: siteConfig.social.linkedin, label: t('links.linkedin'), mark: '↗', external: true },
    { href: siteConfig.cv, label: t('links.cv'), mark: '↓', download: true },
    { href: `mailto:${siteConfig.email}`, label: t('links.email'), mark: '@' },
  ];

  return (
    <section id="top" aria-labelledby="cover-title" className="page pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="running-head meta">
        <span className="flex-1">{t('kicker')}</span>
        <span className="hidden sm:inline">{t('role')}</span>
      </div>

      <div className="grid-journal mt-8 gap-y-12 lg:mt-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-7">
          <p className="meta mb-5 text-ink">{t('name')}</p>
          <h1
            id="cover-title"
            className="display max-w-[16ch] text-[clamp(2.5rem,5.5vw,5.1rem)] [&_em]:italic [&_em]:text-signal"
          >
            {t.rich('headline', { em: (chunks) => <em>{chunks}</em> })}
          </h1>
          <p className="mt-7 max-w-measure text-[1.0625rem] leading-relaxed text-ink-2 sm:text-lg">{t('dek')}</p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-rule pt-4 font-mono text-label uppercase">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="link inline-flex items-baseline gap-1.5 py-1"
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(l.download ? { download: true } : {})}
                >
                  <span className="text-signal" aria-hidden>
                    {l.mark}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-4 flex flex-col gap-8 md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-8 lg:pl-6">
          <Plate
            fig="00"
            title={t('figTitle')}
            provenance="real"
            animate
            caption={
              <>
                {t('figCaption')}{' '}
                <a href="#f1" className="link font-mono text-meta uppercase">
                  → {t('figLink')}
                </a>
              </>
            }
            source={{ href: f1Source.readme, label: `README @ ${f1Source.commit}` }}
          >
            <p className="display text-[1.35rem] leading-snug sm:text-[1.5rem]">{t('figQuestion')}</p>
            <p className="mb-4 mt-2 text-label text-ink-2">{t('figUnit')}</p>
            <PhaseChart
              labels={{ early: tf('phases.early'), mid: tf('phases.mid'), late: tf('phases.late') }}
              baselineLabel={t('baseline')}
              modelLabel={t('model')}
            />
          </Plate>
          <Legend className="px-1" />
        </div>
      </div>
    </section>
  );
}
