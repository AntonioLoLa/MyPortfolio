import { modelZoo, oneSeThreshold } from '@/content/f1';

const MAX = 1.5;
const pct = (v: number) => `${(v / MAX) * 100}%`;

/**
 * Horizontal bars in HTML rather than SVG, so labels stay at reading size on any screen.
 * Magnitude carries no colour; the accent goes on the one row that matters — the same
 * rule as the project's own dashboard palette.
 */
export default function ModelZoo({ thresholdLabel }: { thresholdLabel: string }) {
  return (
    <div
      className="font-mono text-label"
      role="img"
      aria-label={modelZoo.map((m) => `${m.model} ${m.logLoss}`).join(', ') + `. ${thresholdLabel} ${oneSeThreshold}.`}
    >
      <div className="relative grid grid-cols-[minmax(0,9.5rem)_1fr] gap-x-3" aria-hidden>
        <span />
        <div className="relative h-5">
          <span className="absolute bottom-1 -translate-x-1/2 whitespace-nowrap text-meta text-ink" style={{ left: pct(oneSeThreshold) }}>
            {thresholdLabel} = {oneSeThreshold}
          </span>
        </div>
        {modelZoo.map((m, i) => {
          const active = 'active' in m && m.active;
          return (
            <div key={m.model} className="contents">
              <span className={`truncate py-1 text-right ${active ? 'text-ink' : 'text-ink-2'}`}>{m.model}</span>
              <div className="relative py-1">
                {/* Values sit inside their bars: every bar here is long enough, and no label can
                    then collide with the threshold or run off the right edge. */}
                <div
                  className={`draw relative flex h-4 items-center pl-1.5 ${active ? 'bg-signal-mark text-white' : 'bg-ink-3/45 text-ink'}`}
                  style={{ width: pct(m.logLoss), ['--i' as string]: i }}
                >
                  <span className="tabular text-meta">{m.logLoss.toFixed(3)}</span>
                </div>
                {/* threshold, drawn per row so it spans exactly the bar area */}
                <span className="absolute inset-y-0 border-l border-dashed border-ink" style={{ left: pct(oneSeThreshold) }} />
              </div>
            </div>
          );
        })}
        <span />
        <div className="relative mt-1 h-4 border-t border-rule text-meta text-ink-3">
          {[0, 0.5, 1, 1.5].map((v) => (
            <span
              key={v}
              className={`tabular absolute top-1 ${v === 0 ? '' : v === MAX ? '-translate-x-full' : '-translate-x-1/2'}`}
              style={{ left: pct(v) }}
            >
              {v.toFixed(1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
