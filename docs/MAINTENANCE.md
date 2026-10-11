# Maintenance

## GitHub metadata

`scripts/sync-github.mjs` writes `src/data/github.json` from the public GitHub API.

- **Public only.** It lists repositories through `/users/AntonioLoLa/repos`, which never
  returns private repositories, and drops anything flagged private as a second guard.
  The site itself never calls GitHub: pages render from the committed snapshot.
- **Token optional.** `GITHUB_TOKEN` only raises the rate limit (60 → 5,000 req/h). A run
  costs about 1 + 3 requests per public repository. The token is read from the environment
  and never written or logged; never put one in a `NEXT_PUBLIC_*` variable.
- **Failure-safe.** On any error (network, rate limit, malformed response) the previous
  snapshot is kept and the script exits 0, so a build never breaks because GitHub is down.
  `--strict` exits 1 instead (used in the scheduled workflow).

Three ways it runs:

1. **By hand**: `pnpm sync:github`, review the diff, commit.
2. **Weekly**: `.github/workflows/sync-github.yml` opens a PR when the snapshot changed.
   Merging it is the editorial checkpoint. Requires *Settings → Actions → General →
   Allow GitHub Actions to create and approve pull requests*.
3. **On deploy (opt-in)**: set `GITHUB_SYNC_ON_BUILD=1` in Vercel and `prebuild` refreshes
   the snapshot before every build.

`pnpm test` checks the snapshot is well-formed, contains no private repositories, includes
every repository the manifest links, and that no private repository name appears in any
published content. The private names are never written in the code: pass them as a
comma-separated `PRIVATE_REPO_NAMES` (locally `PRIVATE_REPO_NAMES=name-a,name-b pnpm test`;
in CI as a repository secret of the same name). Without it, that one check is skipped.

## Curating projects

A newly discovered public repository shows up automatically under **Also on GitHub** in the
index, and nowhere else. To promote it:

1. Add an entry to `src/content/projects.ts` (`slug`, `no`, `status`, `years`, `repo`).
2. Add `projects.<slug>.title` / `kind` to both `messages/en.json` and `messages/es.json`.
3. If it deserves a case study, add a section component and point `anchor` at it.

To hide a public repository from the automatic list, add it to `hiddenRepos` in the same file.

## Numbers that are transcribed, not synced

These come from reading a repository and must be re-checked by hand when it changes:

| Value | Where | Source |
| --- | --- | --- |
| F1 results, model comparison, dataset size, test count | `src/content/f1.ts` | f1-champion-predictor README at the pinned commit; `grep -rc "def test_" tests` |
| Expense Optimizer test count | `Workshop.tsx` → `counts` | `grep -rc "def test_" tests` in Calculation-expenses |
| Chess test cases and commits | `Workshop.tsx` → `counts` | `grep -rc "@Test" src` and `git log --oneline \| wc -l` in TQS_chess_2024 |
| Resolver stage status | `AgentFlow.tsx` → `flow`, `messages/*` → `resolver.status` | the private repository's own status line — publish only what is authorized |

After a retrain of the F1 model, update `src/content/f1.ts` (including `COMMIT`) from the
new README; every chart and the OG image read from it.

## Design system

- Tokens: `src/app/globals.css`. One continuous paper background: sections are separated by
  rules and running heads, never by background colour. `.sheet-dark` (the F1 dashboard's own
  palette) is only used inside figures printed as screens, via `<Plate screen>`. All text
  pairings are WCAG AA or better.
- Signature devices: the evidence key (`ui/Evidence.tsx`) and plates with crop marks
  (`ui/Plate.tsx`). Every figure must declare a provenance.
- Motion: exactly two CSS patterns, both triggered once by `InViewObserver` and disabled
  under `prefers-reduced-motion` or without JavaScript — `.draw` (chart marks extend from
  their baseline) and `.trace-dot` (the synthetic incident steps through the agent flow).
  Text never animates, so contrast is never reduced.
