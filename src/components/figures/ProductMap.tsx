import { getTranslations } from 'next-intl/server';

type Module = { h: string; t: string; d: string };
type Layer = { h: string; t: string };

/**
 * exte.market, EXTE's internal tool, as the markets team uses it: four modules inside a
 * workspace, over the layers they share. Feature level only — no data, no internal
 * architecture.
 */
export default async function ProductMap() {
  const t = await getTranslations('exte');
  const modules = t.raw('modules') as Module[];
  const layers = t.raw('layers') as Layer[];

  return (
    <div className="font-mono text-label">
      <div className="relative border border-dashed border-ink-3 p-3 pt-6">
        <span className="absolute -top-2 left-3 bg-paper px-1.5 text-meta uppercase text-ink-3">{t('workspace')}</span>
        <ul className="grid grid-cols-2 gap-2">
          {modules.map((m, i) => (
            <li key={m.h} className="flex flex-col border border-ink bg-paper p-2.5">
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-sans text-[0.9375rem] font-medium">{m.h}</span>
                <span className="tabular text-meta text-signal">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className="mt-1 font-sans text-label leading-snug text-ink-2">{m.t}</span>
              <span className="mt-auto pt-2 text-meta uppercase text-ink-3">← {m.d}</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-2 space-y-px">
        {layers.map((l, i) => (
          <li
            key={l.h}
            className={`flex flex-wrap items-baseline gap-x-3 px-2.5 py-1.5 ${i === layers.length - 1 ? 'bg-ink text-paper' : 'bg-ink/[0.07] text-ink'}`}
          >
            <span className="text-meta uppercase">{l.h}</span>
            <span className={`text-meta ${i === layers.length - 1 ? 'text-paper/75' : 'text-ink-2'}`}>{l.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
