import { walkForward as wf } from '@/content/f1';

type Props = { legend: Record<'train' | 'calibrate' | 'test' | 'predict', string> };

const W = 680;
const LEFT = 34;
const TOP = 30;
const ROW = 7.2;
const GAP = 1.6;

/** 30 expanding-window folds over 1981–2026, derived from the training config. */
export default function WalkForward({ legend }: Props) {
  const seasons = wf.inference - wf.firstSeason + 1; // 46 columns
  const cell = (W - LEFT - 4) / seasons;
  const x = (season: number) => LEFT + (season - wf.firstSeason) * cell;
  const folds = Array.from({ length: wf.lastTest - wf.firstTest + 1 }, (_, k) => wf.firstTest + k);
  const H = TOP + folds.length * ROW + 26;
  const ticks = [1981, 1990, 2000, 2010, 2020];

  return (
    <div>
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-meta uppercase text-ink-2">
        <li className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 bg-rule" aria-hidden /> {legend.train}
        </li>
        <li className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 bg-ink-2" aria-hidden /> {legend.calibrate}
        </li>
        <li className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 bg-signal-mark" aria-hidden /> {legend.test}
        </li>
        <li className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 border border-dashed border-ink-2" aria-hidden /> {legend.predict}
        </li>
      </ul>
      {/* Below ~560px the folds would shrink past legibility: keep a minimum size and scroll. */}
      <div className="-mx-1 overflow-x-auto px-1" tabIndex={0} role="region" aria-label={`${folds.length} walk-forward folds`}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full min-w-[34rem]"
          role="img"
          aria-label={`${folds.length} folds. Fold 1 trains on ${wf.firstSeason}–${wf.firstTest - 1 - wf.calibration}, calibrates on ${wf.firstTest - wf.calibration}–${wf.firstTest - 1}, tests on ${wf.firstTest}. Each later fold adds one season. The last tests on ${wf.lastTest}; ${wf.inference} is predicted only.`}
        >
          {ticks.map((s) => (
            <g key={s}>
              <line x1={x(s)} x2={x(s)} y1={TOP - 6} y2={TOP + folds.length * ROW} stroke="rgb(var(--rule))" strokeDasharray="1 3" />
              <text x={x(s)} y={TOP - 12} className="font-mono tabular" fontSize="9" fill="rgb(var(--ink-3))">
                {s}
              </text>
            </g>
          ))}
          <text x={x(wf.inference)} y={TOP - 12} className="font-mono tabular" fontSize="9" fill="rgb(var(--signal))" textAnchor="middle">
            {wf.inference}
          </text>
          <rect
            x={x(wf.inference) + 0.5}
            y={TOP - 4}
            width={cell - 1}
            height={folds.length * ROW + 2}
            fill="none"
            stroke="rgb(var(--ink-2))"
            strokeDasharray="2 2"
          />

          {folds.map((test, k) => {
            const y = TOP + k * ROW;
            const h = ROW - GAP;
            const calibStart = test - wf.calibration;
            return (
              <g key={test}>
                {(k === 0 || (k + 1) % 5 === 0) && (
                  <text x={0} y={y + h} className="font-mono tabular" fontSize="8" fill="rgb(var(--ink-3))">
                    F{String(k + 1).padStart(2, '0')}
                  </text>
                )}
                <rect
                  x={x(wf.firstSeason)}
                  y={y}
                  width={x(calibStart) - x(wf.firstSeason)}
                  height={h}
                  fill="rgb(var(--rule))"
                  className="draw"
                  style={{ ['--i' as string]: k / 4 }}
                />
                <rect x={x(calibStart)} y={y} width={cell * wf.calibration - 0.5} height={h} fill="rgb(var(--ink-2))" />
                <rect x={x(test)} y={y} width={cell - 0.5} height={h} fill="rgb(var(--signal-mark))" />
              </g>
            );
          })}

          <text x={LEFT} y={H - 4} className="font-mono" fontSize="8.5" fill="rgb(var(--ink-3))">
            {`min. ${wf.minTrain} seasons per fold · ${wf.calibration} for calibration · test = next season`}
          </text>
        </svg>
      </div>
    </div>
  );
}
