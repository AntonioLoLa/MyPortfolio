# Antonio Lozano — Portfolio

Personal portfolio of Antonio Lozano Larrubia, Backend & AI/ML Engineer. Built with the Next.js App Router, fully bilingual (EN/ES), dark-mode first, and optimized for SEO and performance.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **next-intl** — i18n with `localePrefix: 'as-needed'` (EN at `/`, ES at `/es`)
- **next-themes** — dark mode by default, system aware
- **Tailwind CSS 3** — HSL CSS-variable token system (light/dark)
- **framer-motion** — subtle, reduced-motion-aware microinteractions
- **Geist** fonts (bundled locally, no network fetch)
- SEO: dynamic metadata, Open Graph + Twitter cards, JSON-LD Person schema, dynamic OG image (`next/og`), `sitemap.ts`, `robots.ts`

## Requirements

- **Node.js** >= 20.9.0
- **pnpm** 9.x (`npm install -g pnpm@9` or via Corepack)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `pnpm dev`         | Start the dev server (Turbopack)     |
| `pnpm build`       | Production build                     |
| `pnpm start`       | Serve the production build           |
| `pnpm lint`        | Run ESLint                           |
| `pnpm type-check`  | Type-check with `tsc --noEmit`       |

## Project structure

```
src/
├── app/[locale]/        # Routes, layout, metadata, OG image
├── app/                 # sitemap.ts, robots.ts
├── components/
│   ├── layout/          # Header, Footer, ThemeProvider, switchers
│   ├── sections/        # Hero, About, Experience, Projects, Skills, Education, Contact
│   └── ui/              # Reveal, Section, Button, Badge primitives
├── i18n/                # next-intl routing config
├── lib/                 # site config + helpers
└── proxy.ts             # next-intl middleware (Next 16 naming)
messages/                # en.json, es.json
```

## Content

Copy lives in `messages/en.json` and `messages/es.json`. Site-wide config (URLs, email, social links, CV paths) is in `src/lib/site.ts`.

## Deployment

Deployed on [Vercel](https://vercel.com). Set `metadataBase` via `src/lib/site.ts` (`url`) to match the production domain.
