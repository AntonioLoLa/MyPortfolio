import { getTranslations } from 'next-intl/server';
import { projects } from '@/content/projects';
import { repo } from '@/lib/github';
import RunningHead from '@/components/ui/RunningHead';
import Plate from '@/components/ui/Plate';
import { StatusMark } from '@/components/ui/Evidence';
import CutPlan from '@/components/figures/CutPlan';

/** Counted in each repository at the time of writing; see docs/MAINTENANCE.md. */
const counts = { expensesTests: 19, chessTests: 146, chessCommits: 105 };

async function EntryLinks({ slug }: { slug: string }) {
  const t = await getTranslations('workshop');
  const p = projects.find((x) => x.slug === slug)!;
  const r = repo(p.repo);
  return (
    <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-label uppercase">
      {r && (
        <a href={r.url} className="link" target="_blank" rel="noopener noreferrer">
          ↗ {t('code')}
        </a>
      )}
      {p.demo && (
        <a href={p.demo} className="link" target="_blank" rel="noopener noreferrer">
          ↗ {t('live')}
        </a>
      )}
      <StatusMark status={p.status} className="text-ink-3" />
    </p>
  );
}

function EntryHead({ id, no, title, kind }: { id: string; no: string; title: string; kind: string }) {
  return (
    <header className="flex items-baseline gap-3 border-t border-rule-strong pt-3">
      <span className="display tabular text-2xl text-signal">{no}</span>
      <div>
        <h3 id={id} className="display text-[1.7rem] leading-tight">{title}</h3>
        <p className="meta mt-1">{kind}</p>
      </div>
    </header>
  );
}

/** A small knight on d4 and the eight squares the move validator must accept. */
function KnightRule() {
  const knight = { f: 3, r: 3 }; // d4, 0-indexed
  const moves = new Set(
    [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ].map(([df, dr]) => `${knight.f + df},${knight.r + dr}`),
  );
  return (
    <svg viewBox="0 0 96 96" className="h-auto w-32 shrink-0" role="img" aria-label="Knight on d4 with its eight legal destination squares marked">
      {Array.from({ length: 64 }, (_, k) => {
        const f = k % 8;
        const r = 7 - Math.floor(k / 8);
        const dark = (f + r) % 2 === 0;
        return (
          <g key={k}>
            <rect x={f * 12} y={(7 - r) * 12} width={12} height={12} fill={dark ? 'rgb(var(--ink) / 0.14)' : 'transparent'} />
            {moves.has(`${f},${r}`) && <circle cx={f * 12 + 6} cy={(7 - r) * 12 + 6} r={2.6} fill="rgb(var(--signal-mark))" />}
            {f === knight.f && r === knight.r && (
              <g>
                <rect x={f * 12 + 1.5} y={(7 - r) * 12 + 1.5} width={9} height={9} fill="rgb(var(--ink))" />
                <text x={f * 12 + 6} y={(7 - r) * 12 + 8.6} textAnchor="middle" fontSize="7" className="font-mono" fill="rgb(var(--paper))">
                  N
                </text>
              </g>
            )}
          </g>
        );
      })}
      <rect x={0.5} y={0.5} width={95} height={95} fill="none" stroke="rgb(var(--ink))" />
    </svg>
  );
}

/** Entries 04–06. Short notes, each with its own small artefact, at different widths. */
export default async function Workshop() {
  const t = await getTranslations('workshop');
  const tp = await getTranslations('projects');

  return (
    <section id="workshop" aria-labelledby="workshop-title" className="scroll-mt-12">
      <div className="page">
        <RunningHead no="04–06" kicker={t('kicker')} />
        <h2 id="workshop-title" className="display mt-6 max-w-[24ch] text-[clamp(1.9rem,3.6vw,3rem)]">
          {t('title')}
        </h2>

        <div className="grid-journal mt-12 gap-y-14">
          <article className="col-span-4 md:col-span-5" aria-labelledby="entry-expenses">
            <div>
              <EntryHead id="entry-expenses" no="04" title={tp('expenses.title')} kind={tp('expenses.kind')} />
            </div>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">{t('expenses.text')}</p>
            <p className="mt-5 border-y border-rule py-2 font-mono text-meta uppercase leading-relaxed text-ink">
              CSV / XLSX → parser → analytics → <span className="text-ink-3">[LLM summary, opt.]</span> → UI
            </p>
            <p className="meta mt-3">{t('expenses.facts', { tests: counts.expensesTests })}</p>
            <EntryLinks slug="expenses" />
          </article>

          <article className="col-span-4 md:col-span-7 md:pl-6" aria-labelledby="entry-cutting">
            <div>
              <EntryHead id="entry-cutting" no="05" title={tp('cutting.title')} kind={tp('cutting.kind')} />
            </div>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">{t('cutting.text')}</p>
            <Plate
              fig="05.1"
              title={t('cutting.figTitle')}
              provenance="illustrative"
              caption={t('cutting.figCaption')}
              className="mt-6"
              source={{ href: 'https://github.com/AntonioLoLa/ProgramaCortes/blob/main/src/app/cutting/page.tsx', label: 'cutting/page.tsx' }}
            >
              <CutPlan barLabel={t('cutting.bar')} />
            </Plate>
            <p className="meta mt-3">{t('cutting.facts')}</p>
            <EntryLinks slug="cutting" />
          </article>

          <article className="col-span-4 md:col-span-12" aria-labelledby="entry-chess">
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-5">
                <EntryHead id="entry-chess" no="06" title={tp('chess.title')} kind={tp('chess.kind')} />
              </div>
              <div className="flex gap-6 md:col-span-7">
                <KnightRule />
                <div>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">{t('chess.text')}</p>
                  <p className="meta mt-3">{t('chess.facts', { tests: counts.chessTests, commits: counts.chessCommits })}</p>
                  <EntryLinks slug="chess" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
