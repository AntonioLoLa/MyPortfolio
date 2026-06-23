import { ImageResponse } from 'next/og';

export const alt = 'Antonio Lozano — Backend & AI/ML Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#0a0a0b',
          backgroundImage:
            'radial-gradient(circle at 20% 0%, rgba(34,211,238,0.18), transparent 45%)',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: '#fafafa',
              color: '#0a0a0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            AL
          </div>
          <div style={{ fontSize: 26, color: '#a1a1aa' }}>antoniolola-portfolio.vercel.app</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 30, color: '#22d3ee', fontWeight: 600 }}>
            Backend &amp; AI/ML Engineer
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            Antonio Lozano Larrubia
          </div>
          <div style={{ fontSize: 30, color: '#a1a1aa', maxWidth: 900 }}>
            Reliable backend systems where solid engineering meets applied AI.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
