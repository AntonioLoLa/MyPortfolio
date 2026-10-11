import { getTranslations } from 'next-intl/server';
import RunningHead from '@/components/ui/RunningHead';
import Plate from '@/components/ui/Plate';
import { StatusMark } from '@/components/ui/Evidence';
import ProductMap from '@/components/figures/ProductMap';
import ProximityMap from '@/components/figures/ProximityMap';

type Theme = { h: string; t: string };

/**
 * Entry 03 — professional practice, kept apart from personal and internship work.
 * Composed as a ledger of problem types beside a product map and a planning map, not as
 * a list of logos.
 */
export default async function Practice() {
  const t = await getTranslations('exte');
  const themes = t.raw('themes') as Theme[];

  return (
    <article id="practice" aria-labelledby="practice-title" className="page scroll-mt-12">
      <RunningHead no="03" kicker={t('kicker')} aside={<StatusMark status="built" />} />

      <div className="grid-journal mt-8 gap-y-12">
        <header className="col-span-4 md:col-span-12 lg:col-span-6">
          <h2 id="practice-title" className="display text-[clamp(2.1rem,4.4vw,3.8rem)]">
            {t('title')}
          </h2>
          <p className="mt-5 font-mono text-label uppercase text-ink">
            {t('role')}
            <span className="block text-ink-3">{t('period')}</span>
            <span className="mt-1 block text-signal">{t('thesis')}</span>
          </p>
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-2">{t('standfirst')}</p>

          <dl className="mt-10 border-t border-rule-strong">
            {themes.map((th, i) => (
              <div key={th.h} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-rule py-4 sm:grid-cols-[2rem_11rem_1fr]">
                <dt className="contents">
                  <span className="tabular font-mono text-meta text-signal" aria-hidden>
                    {String.fromCharCode(97 + i)}.
                  </span>
                  <span className="font-medium leading-snug">{th.h}</span>
                </dt>
                <dd className="col-start-2 mt-1 text-[0.9375rem] leading-relaxed text-ink-2 sm:col-start-3 sm:mt-0">{th.t}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="col-span-4 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-7 lg:pl-6">
          <Plate fig="03.1" title={t('modulesTitle')} provenance="conceptual" caption={t('modulesCaption')}>
            <ProductMap />
          </Plate>
          <Plate fig="03.2" title={t('figTitle')} provenance="illustrative" caption={t('figCaption')} className="mt-8">
            <ProximityMap poiLabel={t('poi')} inRangeLabel={t('inRange')} outOfRangeLabel={t('outOfRange')} />
          </Plate>
          <p className="mt-4 border-l-2 border-signal-mark pl-3 text-label text-ink-2">{t('note')}</p>
          <p className="mt-6 font-mono text-meta uppercase leading-relaxed text-ink-3">{t('stack')}</p>
        </div>
      </div>
    </article>
  );
}
