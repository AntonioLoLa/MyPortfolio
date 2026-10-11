import { getTranslations } from 'next-intl/server';
import type { Status } from '@/content/projects';
import RunningHead from '@/components/ui/RunningHead';
import Plate from '@/components/ui/Plate';
import { StatusGlyph, StatusMark } from '@/components/ui/Evidence';
import AgentFlow from '@/components/figures/AgentFlow';

type StatusLine = { s: Status; t: string };
type Principle = { h: string; t: string };

/** Entry 01 — a system diagram first, because the system is the point. */
export default async function Resolver() {
  const t = await getTranslations('resolver');
  const tk = await getTranslations('key');
  const status = t.raw('status') as StatusLine[];
  const principles = t.raw('principles') as Principle[];

  return (
    <article id="resolver" aria-labelledby="resolver-title" className="page scroll-mt-12">
      <RunningHead no="01" kicker={t('kicker')} aside={<StatusMark status="progress" />} />

      <div className="grid-journal mt-8 gap-y-12">
        <header className="col-span-4 md:col-span-12 lg:col-span-5">
          <h2 id="resolver-title" className="display text-[clamp(2.1rem,4.4vw,3.8rem)]">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-2">{t('standfirst')}</p>

          <div className="mt-10 space-y-8 text-[0.9375rem] leading-relaxed">
            <section>
              <h3 className="meta mb-2 text-ink">{t('problemTitle')}</h3>
              <p className="text-ink-2">{t('problem')}</p>
            </section>
            <section>
              <h3 className="meta mb-2 text-ink">{t('roleTitle')}</h3>
              <p className="text-ink-2">{t('role')}</p>
            </section>
            <section>
              <h3 className="meta mb-3 flex justify-between text-ink">
                {t('statusTitle')} <span className="text-ink-3">{t('statusDate')}</span>
              </h3>
              <ul className="divide-y divide-rule border-y border-rule">
                {status.map((s) => (
                  <li key={s.t} className="flex gap-3 py-2.5 text-ink-2">
                    <StatusGlyph status={s.s} className="mt-[0.35em] text-ink" />
                    <span>
                      <span className="sr-only">{tk(s.s)}: </span>
                      {s.t}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-label text-ink-3">{t('scope')}</p>
            </section>
          </div>
        </header>

        <div className="col-span-4 md:col-span-12 lg:col-span-7 lg:pl-8">
          <Plate fig="01.1" title={t('figTitle')} provenance="conceptual" caption={t('figCaption')} animate>
            <AgentFlow />
          </Plate>
          <p className="mt-4 border-l-2 border-signal-mark pl-3 text-label text-ink-2">{t('confidential')}</p>
        </div>
      </div>

      <section aria-labelledby="resolver-principles" className="mt-16 border-t border-rule pt-6">
        <h3 id="resolver-principles" className="meta mb-6">
          {t('principlesTitle')}
        </h3>
        <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
          {principles.map((p, i) => (
            <li key={p.h} className="flex gap-4">
              <span className="display tabular text-3xl text-signal">{String.fromCharCode(97 + i)}</span>
              <div>
                <p className="display text-2xl italic">{p.h}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{p.t}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
