/**
 * Illustrative proximity query on a vector-tile grid: which screens fall inside the radius
 * of a point of interest. Geometry is generated from a fixed seed — it is not client data —
 * but the in-range set is actually computed, the way the planning service would.
 */

const W = 480;
const H = 400;
const COLS = 4;
const ROWS = 3;
const TILE_W = W / COLS;
const TILE_H = (H - 40) / ROWS;
// Real z14 tile addresses around Barcelona (lon 2.17, lat 41.39 → x 8290, y 6118).
const Z = 14;
const X0 = 8289;
const Y0 = 6117;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(2024);
const MAP_H = H - 40;
const screens = Array.from({ length: 34 }, () => ({ x: 14 + rand() * (W - 28), y: 14 + rand() * (MAP_H - 28) }));
const pois = [
  { x: 182, y: 182, r: 78 },
  { x: 352, y: 196, r: 62 },
];
const inRange = screens.map((s) => pois.some((p) => Math.hypot(s.x - p.x, s.y - p.y) <= p.r));

// A few street polylines; a diagonal avenue, a grid, a coast-like edge.
const streets = [
  'M0 300 L480 60',
  'M0 90 L480 110',
  'M0 210 L480 250',
  'M120 0 L140 360',
  'M260 0 L250 360',
  'M390 0 L410 360',
  'M0 330 C120 320 200 352 300 340 S440 350 480 330',
];

export default function ProximityMap({
  poiLabel,
  inRangeLabel,
  outOfRangeLabel,
}: {
  poiLabel: string;
  inRangeLabel: string;
  outOfRangeLabel: string;
}) {
  const count = inRange.filter(Boolean).length;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label={`Illustrative map: ${screens.length} screens, ${count} ${inRangeLabel} of two points of interest.`}
    >
      <defs>
        <clipPath id="map-clip">
          <rect width={W} height={MAP_H} />
        </clipPath>
      </defs>
      <g clipPath="url(#map-clip)">
        {streets.map((d) => (
          <path key={d} d={d} fill="none" stroke="rgb(var(--ink) / 0.13)" strokeWidth="5" strokeLinecap="round" />
        ))}
        {streets.map((d) => (
          <path key={`c${d}`} d={d} fill="none" stroke="rgb(var(--ink) / 0.22)" strokeWidth="0.75" />
        ))}

        {pois.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.r} fill="rgb(var(--signal-mark) / 0.07)" stroke="rgb(var(--signal-mark))" strokeWidth="1" strokeDasharray="3 3" />
            <line x1={p.x} y1={p.y} x2={p.x + p.r} y2={p.y} stroke="rgb(var(--signal-mark))" strokeWidth="0.75" />
            <text x={p.x + p.r / 2} y={p.y - 4} textAnchor="middle" className="font-mono" fontSize="8.5" fill="rgb(var(--signal))">
              r
            </text>
            <path d={`M${p.x} ${p.y - 7} L${p.x + 6} ${p.y + 5} L${p.x - 6} ${p.y + 5} Z`} fill="rgb(var(--signal-mark))" />
            <text x={p.x} y={p.y + 18} textAnchor="middle" className="font-mono" fontSize="9" fill="rgb(var(--ink))">
              {poiLabel} {String.fromCharCode(65 + i)}
            </text>
          </g>
        ))}

        {screens.map((s, i) =>
          inRange[i] ? (
            <rect key={i} x={s.x - 3.5} y={s.y - 3.5} width={7} height={7} fill="rgb(var(--ink))" />
          ) : (
            <rect key={i} x={s.x - 3} y={s.y - 3} width={6} height={6} fill="rgb(var(--paper))" stroke="rgb(var(--ink-3))" strokeWidth="1" />
          ),
        )}
      </g>

      {/* tile grid with z/x/y addresses */}
      {Array.from({ length: COLS * ROWS }, (_, k) => {
        const cx = k % COLS;
        const cy = Math.floor(k / COLS);
        return (
          <g key={k}>
            <rect x={cx * TILE_W} y={cy * TILE_H} width={TILE_W} height={TILE_H} fill="none" stroke="rgb(var(--ink) / 0.35)" strokeWidth="0.75" />
            <text x={cx * TILE_W + 5} y={cy * TILE_H + 12} className="font-mono tabular" fontSize="7.5" fill="rgb(var(--ink-3))">
              {Z}/{X0 + cx}/{Y0 + cy}
            </text>
          </g>
        );
      })}

      <g className="font-mono" fontSize="9.5" fill="rgb(var(--ink-2))">
        <rect x={0} y={MAP_H + 16} width={7} height={7} fill="rgb(var(--ink))" />
        <text x={12} y={MAP_H + 23} className="tabular">
          {count} {inRangeLabel}
        </text>
        <rect x={110} y={MAP_H + 16.5} width={6} height={6} fill="none" stroke="rgb(var(--ink-3))" />
        <text x={122} y={MAP_H + 23} className="tabular">
          {screens.length - count} {outOfRangeLabel}
        </text>
        <text x={W} y={MAP_H + 23} textAnchor="end" fill="rgb(var(--ink-3))">
          z{Z} · MBTiles → Martin → MapLibre
        </text>
      </g>
    </svg>
  );
}
