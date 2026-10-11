import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import RunningHead from '@/components/ui/RunningHead';

type Item = { y: string; h: string; o: string; n: string };
type Cap = { a: string; t: string; w: string };

// Spans in decimal years, in the same order as `trajectory.timeline`. Open-ended spans run
// to the current issue date. Project spans are first commit → last push on GitHub; the
// thesis was presented in July 2025.
const NOW = 2026.8;
const spans: [number, number][] = [
  [2021.7, 2025.5], // BSc
  [2024.7, NOW], // EXTE
  [2025.0, 2025.52], // thesis
  [2025.96, 2026.48], // Expense Optimizer
  [2026.2, NOW], // MSc
  [2026.57, 2026.6], // F1 Championship Predictor
  [2026.69, NOW], // Sopra Steria
];
const FROM = 2021;
const TO = 2027;
const pct = (y: number) => ((y - FROM) / (TO - FROM)) * 100;
// Rows where AI is the subject; drawn in the accent colour.
const AI = new Set([3, 4, 5, 6]);
// Short spans still need to be visible as a mark.
const MIN_WIDTH = 0.8;

export default async function Trajectory() {
  const t = await getTranslations('trajectory');
  const items = t.raw('timeline') as Item[];
  const caps = t.raw('caps') as Cap[];
  const years = Array.from({ length: TO - FROM + 1 }, (_, i) => FROM + i);

  return (
    <section id="trajectory" aria-labelledby="trajectory-title" className="page scroll-mt-12">
      <RunningHead kicker={t('kicker')} />

      <div className="grid-journal mt-8 gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <h2 id="trajectory-title" className="display text-[clamp(2.1rem,4.4vw,3.8rem)]">
            {t('title')}
          </h2>
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-2">{t('intro')}</p>
        </div>
        <figure className="col-span-2 max-w-[10rem] md:max-w-none md:col-span-3 md:col-start-10 lg:col-span-2 lg:col-start-11">
          <Image
            src="/personal_photo.jpg"
            alt={t('photoAlt')}
            width={320}
            height={400}
            sizes="(min-width: 1024px) 12rem, 40vw"
            className="aspect-[4/5] w-full object-cover [object-position:50%_20%]"
          />
        </figure>
      </div>

      {/* Career chart: one row per item, bars on a shared year axis. */}
      <div className="mt-14">
        <div className="hidden border-b border-rule-strong md:grid md:grid-cols-[40%_1fr] md:gap-x-6" aria-hidden>
          <span />
          <div className="relative h-5">
            {years.map((y, i) => (
              <span
                key={y}
                className={`tabular absolute font-mono text-meta text-ink-3 ${i === years.length - 1 ? '-translate-x-full' : i === 0 ? '' : '-translate-x-1/2'}`}
                style={{ left: `${pct(y)}%` }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>
        <ol>
          {items.map((item, i) => {
            const [a, b] = spans[i];
            const open = b === NOW;
            return (
              <li key={item.h} className="grid gap-x-6 border-b border-rule py-3 md:grid-cols-[40%_1fr]">
                <div className="grid grid-cols-[4.5rem_1fr] gap-x-3">
                  <span className="tabular font-mono text-label text-ink-3">{item.y}</span>
                  <div>
                    <p className="font-medium leading-snug">
                      {item.h} <span className="font-normal text-ink-2">· {item.o}</span>
                    </p>
                    {item.n && <p className="mt-0.5 text-label text-ink-3">{item.n}</p>}
                  </div>
                </div>
                <div className="relative mt-2 hidden h-4 md:mt-1 md:block" aria-hidden>
                  {years.map((y) => (
                    <span key={y} className="absolute inset-y-0 w-px bg-rule/60" style={{ left: `${pct(y)}%` }} />
                  ))}
                  <span
                    className={`absolute inset-y-0.5 ${AI.has(i) ? 'bg-signal-mark' : 'bg-ink'}`}
                    style={{ left: `${pct(a)}%`, width: `${Math.max(pct(b) - pct(a), MIN_WIDTH)}%` }}
                  />
                  {open && (
                    <span
                      className="absolute inset-y-0.5 border-y border-r border-dashed border-ink-3"
                      style={{ left: `${pct(b)}%`, width: `${pct(TO) - pct(b)}%` }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid-journal mt-16 gap-y-12">
        <section className="col-span-4 md:col-span-12 lg:col-span-8" aria-labelledby="caps-title">
          <h3 id="caps-title" className="meta mb-3 text-ink">
            {t('capsTitle')}
          </h3>
          <table className="block w-full text-left text-[0.9375rem] md:table">
            <thead className="hidden font-mono text-meta uppercase text-ink-3 md:table-header-group">
              <tr className="border-b border-rule-strong">
                <th scope="col" className="w-[28%] py-2 pr-4 font-normal">{t('capsCols.area')}</th>
                <th scope="col" className="py-2 pr-4 font-normal">{t('capsCols.tools')}</th>
                <th scope="col" className="w-[18%] py-2 text-right font-normal">{t('capsCols.where')}</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {caps.map((c) => (
                <tr key={c.a} className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-rule py-2.5 align-baseline md:table-row md:py-0">
                  <th scope="row" className="font-medium md:py-2.5 md:pr-4">{c.a}</th>
                  <td className="col-span-2 row-start-2 mt-1 text-ink-2 md:mt-0 md:py-2.5 md:pr-4">{c.t}</td>
                  <td className="tabular col-start-2 row-start-1 text-right font-mono text-label text-signal md:py-2.5">{c.w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="col-span-4 space-y-8 md:col-span-12 lg:col-span-4 lg:pl-6">
          <section>
            <h3 className="meta mb-2 text-ink">{t('lookingTitle')}</h3>
            <p className="display text-[1.35rem] italic leading-snug">{t('looking')}</p>
          </section>
          <section>
            <h3 className="meta mb-2 text-ink">{t('languagesTitle')}</h3>
            <p className="text-label text-ink-2">{t('languages')}</p>
          </section>
          <section>
            <h3 className="meta mb-2 text-ink">{t('certsTitle')}</h3>
            <p className="text-label text-ink-2">{t('certs')}</p>
          </section>
        </aside>
      </div>
    </section>
  );
}
