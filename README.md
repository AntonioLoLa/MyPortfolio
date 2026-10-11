# Antonio Lozano — Field Notes

Personal site of Antonio Lozano Larrubia, software engineer moving into applied AI.
Designed as an engineering field journal: numbered entries, figures printed as plates, and
an **evidence key** on everything — each project and component carries its status
(● built · ◐ in progress · ○ planned) and each figure states where its data came from
(real data · from config · synthetic · conceptual · illustrative).

Bilingual (EN at `/`, ES at `/es`), statically rendered, no tracking or third-party scripts.

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**
- **next-intl** — `localePrefix: 'as-needed'`
- **Tailwind CSS 3** — RGB CSS-variable tokens (`src/app/globals.css`)
- Type: **Newsreader** (display, via `next/font/google`, self-hosted at build) and **Geist** /
  **Geist Mono** (body and metadata, bundled)
- Charts are hand-written SVG/HTML server components — no charting or animation library

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build (runs `prebuild`, see below) |
| `pnpm start` | Serve the production build |
| `pnpm lint` / `pnpm type-check` | ESLint / `tsc --noEmit` |
| `pnpm test` | Content guards (`tests/content.test.mjs`) |
| `pnpm sync:github` | Refresh `src/data/github.json` from the public GitHub API |

## Where things live

```
src/
├── app/[locale]/          layout (fonts, metadata, JSON-LD), page, OG image
├── components/
│   ├── layout/            Masthead, LanguageSwitcher
│   ├── sections/          Cover, Contents, Resolver, F1, Practice, Workshop, Trajectory, Contact
│   ├── figures/           PhaseChart, AgentFlow, WalkForward, ModelZoo, ProximityMap, CutPlan
│   └── ui/                Plate (figure + crop marks), Evidence (status/provenance key), RunningHead
├── content/
│   ├── projects.ts        editorial manifest: order, status, links, which repo backs each entry
│   └── f1.ts              F1 results transcribed from the repo README (pinned commit)
├── data/github.json       generated GitHub snapshot — never edit by hand
└── lib/github.ts          typed access to the snapshot
messages/{en,es}.json      all prose
scripts/sync-github.mjs    the sync
```

Editorial content (what to show, in what order, with what words) and GitHub metadata
(language, last push, tests/CI/Docker signals, CI status) are deliberately separate. See
[docs/MAINTENANCE.md](docs/MAINTENANCE.md) for how to update each.

## Deployment

Vercel. `siteConfig.url` in `src/lib/site.ts` must match the production domain (it feeds
`metadataBase`, canonical URLs, sitemap and OG). Set `GITHUB_SYNC_ON_BUILD=1` in the Vercel
project to refresh repository metadata on every deploy; without it the committed snapshot
is used.
