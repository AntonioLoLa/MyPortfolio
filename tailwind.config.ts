import type { Config } from 'tailwindcss';

/**
 * Design tokens. Colours are CSS variables (see globals.css) so a section can switch to the
 * dark "timing sheet" surface by adding the `.sheet-dark` class without new utilities.
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: 'rgb(var(--paper) / <alpha-value>)', 2: 'rgb(var(--paper-2) / <alpha-value>)' },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          2: 'rgb(var(--ink-2) / <alpha-value>)',
          3: 'rgb(var(--ink-3) / <alpha-value>)',
        },
        rule: { DEFAULT: 'rgb(var(--rule) / <alpha-value>)', strong: 'rgb(var(--rule-strong) / <alpha-value>)' },
        signal: { DEFAULT: 'rgb(var(--signal) / <alpha-value>)', mark: 'rgb(var(--signal-mark) / <alpha-value>)' },
        positive: 'rgb(var(--positive) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-display-italic)', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Metadata scale — mono labels never go below 11px.
        meta: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.04em' }],
        label: ['0.75rem', { lineHeight: '1.1rem', letterSpacing: '0.02em' }],
      },
      maxWidth: {
        page: '88rem',
        measure: '38rem',
      },
      spacing: {
        gutter: 'var(--gutter)',
      },
      transitionTimingFunction: {
        journal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
