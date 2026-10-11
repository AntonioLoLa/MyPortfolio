/**
 * First-fit decreasing, transcribed from ProgramaCortes (src/app/cutting/page.tsx):
 * sort cuts longest first, place each in the first bar with enough length left, open a
 * new bar otherwise. Run here on an illustrative cutting list.
 */
const BAR_LENGTH = 650;
const cuttingList = [
  { length: 240, quantity: 3 },
  { length: 180, quantity: 4 },
  { length: 120, quantity: 3 },
  { length: 95, quantity: 4 },
];

function firstFitDecreasing(cuts: typeof cuttingList) {
  const bars: { remaining: number; cuts: number[] }[] = [];
  const sorted = [...cuts].sort((a, b) => b.length - a.length);
  for (const { length, quantity } of sorted) {
    for (let i = 0; i < quantity; i++) {
      const bar = bars.find((b) => b.remaining >= length);
      if (bar) {
        bar.remaining -= length;
        bar.cuts.push(length);
      } else {
        bars.push({ remaining: BAR_LENGTH - length, cuts: [length] });
      }
    }
  }
  return bars;
}

const W = 440;
const LEFT = 44;
const ROW = 26;

export default function CutPlan({ barLabel }: { barLabel: string }) {
  const bars = firstFitDecreasing(cuttingList);
  const scale = (W - LEFT - 4) / BAR_LENGTH;
  const H = bars.length * ROW + 18;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label={bars.map((b, i) => `${barLabel} ${i + 1}: ${b.cuts.join(' + ')}, off-cut ${b.remaining}`).join('; ')}
    >
      <defs>
        <pattern id="offcut" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="rgb(var(--ink-3))" strokeWidth="1" />
        </pattern>
      </defs>
      {bars.map((b, i) => {
        const y = i * ROW;
        let cursor = LEFT;
        return (
          <g key={i}>
            <text x={0} y={y + 14} className="font-mono tabular" fontSize="9" fill="rgb(var(--ink-3))">
              {barLabel.slice(0, 1).toUpperCase()}
              {i + 1}
            </text>
            {b.cuts.map((c, j) => {
              const x0 = cursor;
              cursor += c * scale;
              return (
                <g key={j}>
                  <rect x={x0} y={y + 2} width={c * scale - 1.5} height={17} fill="rgb(var(--ink))" />
                  <text x={x0 + (c * scale) / 2} y={y + 14} textAnchor="middle" className="font-mono tabular" fontSize="9" fill="rgb(var(--paper))">
                    {c}
                  </text>
                </g>
              );
            })}
            {b.remaining > 0 && (
              <g>
                <rect x={cursor} y={y + 2} width={b.remaining * scale} height={17} fill="url(#offcut)" stroke="rgb(var(--ink-3))" strokeWidth="0.75" />
                {b.remaining * scale >= 32 && (
                <text x={cursor + (b.remaining * scale) / 2} y={y + 14} textAnchor="middle" className="font-mono tabular" fontSize="9" fill="rgb(var(--signal))">
                  {b.remaining}
                </text>
                )}
              </g>
            )}
          </g>
        );
      })}
      <text x={W - 2} y={H - 2} textAnchor="end" className="font-mono tabular" fontSize="8.5" fill="rgb(var(--ink-3))">
        {cuttingList.map((c) => `${c.quantity}×${c.length}`).join(' · ')} → {bars.length} × {BAR_LENGTH}
      </text>
    </svg>
  );
}
