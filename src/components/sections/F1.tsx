import { getFormatter, getTranslations } from 'next-intl/server';
import { ablation, dataset, f1Source, phaseResults, pooled, testFunctions } from '@/content/f1';
import { repo } from '@/lib/github';
import RunningHead from '@/components/ui/RunningHead';
import Plate from '@/components/ui/Plate';
import { StatusMark } from '@/components/ui/Evidence';
import WalkForward from '@/components/figures/WalkForward';
import ModelZoo from '@/components/figures/ModelZoo';

type Step = { h: string; t: string };

/**
 * Entry 02 — on the same paper as the rest of the journal; its figures are printed as dark
 * "screens" in the project's own dashboard palette, like timing screens reproduced in a
 * magazine. Dense, tabular, and every number is the repository's published out-of-fold result.
 */
export default async function F1() {
  const t = await getTranslations('f1');
  const tc = await getTranslations('contents');
  const format = await getFormatter();
  const r = repo('f1-champion-predictor');
  const approach = t.raw('approach') as string[];
  const pipeline = t.raw('pipeline') as Step[];
  const engineering = (t.raw('engineering') as string[]).map((s) =>
    s.replace('{tests}', String(testFunctions)),
  );
  const limits = t.raw('limits') as string[];
  // Always group thousands: Spanish omits the separator for 4-digit numbers, which looks
  // inconsistent beside 5-digit ones in the same table (1171 vs 27.438).
  const n = (v: number) => format.number(v, { useGrouping: true });
  const rows = [
    ...phaseResults.map((p) => ({ key: p.phase, ...p })),
    { key: 'pooled' as const, ...pooled },
  ];

  return (
    <article id="f1" aria-labelledby="f1-title" className="scroll-mt-12">
      <div className="page">
        <RunningHead
          no="02"
          kicker={t('kicker')}
          aside={
            <span className="flex items-center gap-4">
              <StatusMark status="built" />
              {r?.ci?.conclusion === 'success' && <span className="text-positive">{tc('ciPassing')}</span>}
            </span>
          }
        />

        <p className="mt-2 font-mono text-meta text-ink-3">{t('paletteNote')}</p>

        <div className="grid-journal mt-8 gap-y-10">
          <header className="col-span-4 md:col-span-12 lg:col-span-7">
            <h2 id="f1-title" className="display text-[clamp(2.1rem,4.4vw,3.8rem)]">
              {t('title')}
            </h2>
            <p className="mt-6 max-w-[40rem] text-lg leading-relaxed text-ink-2">{t('standfirst')}</p>
          </header>
          <dl className="col-span-4 grid grid-cols-2 gap-px self-end border border-rule bg-rule md:col-span-12 md:grid-cols-4 lg:col-span-4 lg:col-start-9 lg:grid-cols-2">
            {(
              [
                ['seasons', dataset.seasons],
                ['races', dataset.races],
                ['results', dataset.results],
                ['drivers', dataset.drivers],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="bg-paper p-3">
                <dt className="meta">{t(`datasetLabels.${k}`)}</dt>
                <dd className="tabular mt-1 font-mono text-2xl">{n(v)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid-journal mt-14 gap-y-10">
          <section className="col-span-4 md:col-span-5 lg:col-span-4">
            <h3 className="meta mb-2 text-ink">{t('problemTitle')}</h3>
            <p className="leading-relaxed text-ink-2">{t('problem')}</p>
            <h3 className="meta mb-3 mt-8 text-ink">{t('approachTitle')}</h3>
            <ol className="space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">
              {approach.map((a, i) => (
                <li key={i} className="grid grid-cols-[1.75rem_1fr]">
                  <span className="tabular font-mono text-meta text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </section>
          <div className="col-span-4 md:col-span-7 lg:col-span-8">
            <Plate
              fig="02.1"
              screen
              title={t('foldsTitle')}
              provenance="config"
              caption={t('foldsCaption')}
              source={{ href: f1Source.config, label: 'conf/models.yaml' }}
              animate
            >
              <WalkForward legend={t.raw('foldsLegend') as Record<'train' | 'calibrate' | 'test' | 'predict', string>} />
            </Plate>
          </div>
        </div>

        <div className="grid-journal mt-10 gap-y-10">
          <div className="col-span-4 md:col-span-6">
            <Plate
              fig="02.2"
              screen
              title={t('zooTitle')}
              provenance="real"
              caption={t('zooCaption')}
              source={{ href: f1Source.selection, label: 'training/selection.py' }}
              animate
            >
              <ModelZoo thresholdLabel={t('zooThreshold')} />
            </Plate>
          </div>
          <div className="col-span-4 md:col-span-6">
            <Plate
              fig="02.3"
              screen
              title={t('sheetTitle')}
              provenance="real"
              caption={t('sheetCaption')}
              source={{ href: f1Source.readme, label: `README @ ${f1Source.commit}` }}
            >
              <table className="w-full font-mono text-label tabular">
                <thead className="text-meta uppercase text-ink-3">
                  <tr className="border-b border-rule-strong">
                    <th scope="col" className="py-1.5 text-left font-normal">{t('sheetCols.phase')}</th>
                    <th scope="col" className="py-1.5 text-right font-normal">{t('sheetCols.logLoss')}</th>
                    <th scope="col" className="py-1.5 text-right font-normal">{t('sheetCols.model')}</th>
                    <th scope="col" className="py-1.5 text-right font-normal">{t('sheetCols.baseline')}</th>
                    <th scope="col" className="py-1.5 text-right font-normal">{t('sheetCols.delta')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.key} className={row.key === 'pooled' ? 'border-t border-rule-strong font-medium' : 'border-b border-rule'}>
                      <th scope="row" className="py-2 text-left font-normal">{t(`phases.${row.key}`)}</th>
                      <td className="py-2 text-right">{row.logLoss.toFixed(3)}</td>
                      <td className="py-2 text-right">{row.model.toFixed(1)}%</td>
                      <td className="py-2 text-right text-ink-3">{row.baseline.toFixed(1)}%</td>
                      <td className="py-2 text-right text-positive">+{(row.model - row.baseline).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-label text-ink-2">
                {t('ablation')}{' '}
                <span className="font-mono text-meta text-ink-3">
                  ({ablation.all.features} → {ablation.top5.features})
                </span>
              </p>
            </Plate>
          </div>
        </div>

        <section aria-labelledby="f1-pipeline" className="mt-14">
          <h3 id="f1-pipeline" className="meta mb-3 text-ink">
            {t('pipelineTitle')}
          </h3>
          <ol className="grid grid-cols-2 border-l border-t border-rule sm:grid-cols-4 lg:grid-cols-8">
            {pipeline.map((s, i) => (
              <li key={s.h} className="relative border-b border-r border-rule p-3">
                <span className="tabular font-mono text-meta text-signal">S{i + 1}</span>
                <p className="mt-1 text-[0.9375rem] font-medium">{s.h}</p>
                <p className="mt-0.5 text-label text-ink-3">{s.t}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid-journal mt-14 gap-y-10">
          <section className="col-span-4 md:col-span-6">
            <h3 className="meta mb-3 text-ink">{t('engineeringTitle')}</h3>
            <ul className="space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
              {engineering.map((e) => (
                <li key={e} className="border-l border-rule pl-3">
                  {e}
                </li>
              ))}
            </ul>
          </section>
          <section className="col-span-4 md:col-span-6">
            <h3 className="meta mb-3 text-ink">{t('limitsTitle')}</h3>
            <ul className="space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
              {limits.map((l) => (
                <li key={l} className="border-l border-signal-mark pl-3">
                  {l}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-rule pt-4 font-mono text-label uppercase">
          <a href={r?.url ?? 'https://github.com/AntonioLoLa/f1-champion-predictor'} className="link" target="_blank" rel="noopener noreferrer">
            ↗ {t('repo')}
          </a>
          <a href={f1Source.readme} className="link" target="_blank" rel="noopener noreferrer">
            ↗ {t('readme')}
          </a>
          <span className="text-meta text-ink-3">{t('commit', { commit: f1Source.commit })}</span>
        </div>
      </div>
    </article>
  );
}
