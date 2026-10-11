import { ImageResponse } from 'next/og';
import { phaseResults } from '@/content/f1';

export const alt = 'Antonio Lozano — Field notes on engineering applied AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#F1EDE4';
const INK = '#15171C';
const INK3 = '#66645E';
const SIGNAL = '#C8380F';

/** Share card: the cover's claim and its evidence, in the journal's paper and ink. */
export default function OpengraphImage() {
  const x = (v: number) => ((v - 50) / 50) * 380;
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: PAPER,
          color: INK,
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: `2px solid ${INK}`,
            paddingTop: 14,
            fontSize: 20,
            fontFamily: 'monospace',
            letterSpacing: 1,
            color: INK3,
          }}
        >
          <span>FIELD NOTES · VOL. 2026 · BARCELONA</span>
          <span>ANTONIO LOZANO LARRUBIA</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 74, lineHeight: 1.02, maxWidth: 640, letterSpacing: -2 }}>
            <span>Software engineer working on the parts of AI that have to be</span>
            <span style={{ color: SIGNAL, fontStyle: 'italic' }}>measured.</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: 420, fontFamily: 'monospace', fontSize: 16 }}>
            <span style={{ color: INK3 }}>FIG. 00 — TOP-1 HIT RATE VS. “LEADER WINS”</span>
            {phaseResults.map((r) => (
              <div key={r.phase} style={{ display: 'flex', alignItems: 'center', position: 'relative', height: 16 }}>
                <span style={{ width: 52, textTransform: 'uppercase' }}>{r.phase}</span>
                <div style={{ display: 'flex', position: 'relative', width: 380, height: 16 }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: x(r.baseline),
                      width: x(r.model) - x(r.baseline),
                      top: 7,
                      height: 2,
                      backgroundColor: SIGNAL,
                    }}
                  />
                  <div style={{ position: 'absolute', left: x(r.baseline) - 7, top: 1, width: 14, height: 14, borderRadius: 7, border: `2px solid ${INK3}`, backgroundColor: PAPER }} />
                  <div style={{ position: 'absolute', left: x(r.model) - 7, top: 1, width: 14, height: 14, borderRadius: 7, backgroundColor: SIGNAL }} />
                </div>
              </div>
            ))}
            <span style={{ color: INK3 }}>REAL DATA · 30-FOLD WALK-FORWARD</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
