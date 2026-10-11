import { phaseResults } from '@/content/f1';

type Props = {
  labels: Record<'early' | 'mid' | 'late', string>;
  baselineLabel: string;
  modelLabel: string;
};

const W = 360;
const ROW = 38;
const TOP = 26;
const LEFT = 92;
const RIGHT = 16;
const MIN = 50;
const MAX = 100;
const x = (v: number) => LEFT + ((v - MIN) / (MAX - MIN)) * (W - LEFT - RIGHT);

/** Dumbbell: baseline (hollow) → model (filled) top-1 hit rate per season phase. */
export default function PhaseChart({ labels, baselineLabel, modelLabel }: Props) {
  const H = TOP + phaseResults.length * ROW + 22;
  const ticks = [50, 60, 70, 80, 90, 100];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="phase-title phase-desc">
      <title id="phase-title">{`${modelLabel} vs ${baselineLabel}`}</title>
      <desc id="phase-desc">
        {phaseResults
          .map((r) => `${labels[r.phase]}: ${modelLabel} ${r.model}%, ${baselineLabel} ${r.baseline}%`)
          .join('; ')}
      </desc>

      {/* legend — the model entry is placed after the baseline label, whatever its length */}
      <g className="font-mono" fontSize="9.5" fill="rgb(var(--ink-2))">
        <circle cx={4} cy={9} r={4} fill="none" stroke="rgb(var(--ink-3))" strokeWidth="1.5" />
        <text x={13} y={12.5}>
          {baselineLabel.toUpperCase()}
        </text>
        <circle cx={baselineLabel.length * 6.2 + 36} cy={9} r={4} fill="rgb(var(--signal-mark))" />
        <text x={baselineLabel.length * 6.2 + 45} y={12.5}>
          {modelLabel.toUpperCase()}
        </text>
      </g>

      {/* grid */}
      {ticks.map((v) => (
        <g key={v}>
          <line
            x1={x(v)}
            x2={x(v)}
            y1={TOP - 4}
            y2={TOP + phaseResults.length * ROW}
            stroke="rgb(var(--rule))"
            strokeWidth="1"
            strokeDasharray={v === 50 ? undefined : '2 3'}
          />
          <text
            x={x(v)}
            y={TOP + phaseResults.length * ROW + 14}
            textAnchor="middle"
            className="font-mono tabular"
            fontSize="9"
            fill="rgb(var(--ink-3))"
          >
            {v}%
          </text>
        </g>
      ))}

      {phaseResults.map((r, i) => {
        const cy = TOP + i * ROW + ROW / 2;
        return (
          <g key={r.phase}>
            <text x={0} y={cy + 4} className="font-mono" fontSize="10" fill="rgb(var(--ink))">
              {labels[r.phase].split(' · ')[0].toUpperCase()}
            </text>
            <line
              x1={x(r.baseline)}
              x2={x(r.model)}
              y1={cy}
              y2={cy}
              stroke="rgb(var(--signal-mark))"
              strokeWidth="2"
              className="draw"
              style={{ ['--i' as string]: i }}
            />
            <circle cx={x(r.baseline)} cy={cy} r={4.5} fill="rgb(var(--paper))" stroke="rgb(var(--ink-3))" strokeWidth="1.5" />
            <circle cx={x(r.model)} cy={cy} r={4.5} fill="rgb(var(--signal-mark))" />
            <text
              x={x(r.model) + 8}
              y={cy - 7}
              className="font-mono tabular"
              fontSize="9.5"
              fill="rgb(var(--ink))"
              textAnchor={r.model > 92 ? 'end' : 'start'}
            >
              {r.model.toFixed(1)}%
            </text>
            <text
              x={x(r.baseline) - 8}
              y={cy - 7}
              className="font-mono tabular"
              fontSize="9.5"
              fill="rgb(var(--ink-3))"
              textAnchor="end"
            >
              {r.baseline.toFixed(1)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}
