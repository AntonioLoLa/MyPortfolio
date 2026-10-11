#!/usr/bin/env node
/**
 * Refreshes src/data/github.json with public repository metadata for the portfolio.
 *
 * - Public data only: repositories are listed through /users/{user}/repos, which never
 *   returns private repositories, and anything flagged `private` is dropped defensively.
 * - GITHUB_TOKEN is optional and only raises the rate limit (60 → 5000 req/h). It is read
 *   from the environment, never written to disk and never logged.
 * - Never breaks the site: on any failure the previous snapshot is left untouched and the
 *   script exits 0 (pass --strict to exit 1 instead, e.g. in CI).
 *
 * Usage: pnpm sync:github [--strict]
 *        --on-build  only sync when GITHUB_SYNC_ON_BUILD=1 (used by `prebuild`), so local
 *                    and CI builds stay deterministic unless a deploy opts in.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const USER = 'AntonioLoLa';
const API = 'https://api.github.com';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'github.json');
const STRICT = process.argv.includes('--strict');
const TIMEOUT_MS = 10_000;

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': `${USER}-portfolio-sync`,
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function gh(pathname) {
  const res = await fetch(`${API}${pathname}`, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (res.status === 404 || res.status === 409) return null; // missing / empty repository
  if (!res.ok) {
    const remaining = res.headers.get('x-ratelimit-remaining');
    throw new Error(`GET ${pathname} → ${res.status}${remaining === '0' ? ' (rate limit exhausted)' : ''}`);
  }
  return res.json();
}

const TEST_PATH = /(^|\/)(tests?|__tests__|spec|src\/test)\/|\.(test|spec)\.[cm]?[jt]sx?$|(^|\/)test_[^/]+\.py$/i;
const DOCKER_PATH = /(^|\/)(Dockerfile|docker-compose\.ya?ml|compose\.ya?ml)$/i;
const CI_PATH = /^\.github\/workflows\/[^/]+\.ya?ml$|^\.gitlab-ci\.yml$/;

/** Engineering signals read from the file tree: what the repository actually contains. */
async function signals(repo) {
  const tree = await gh(`/repos/${USER}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`);
  const paths = tree?.tree?.map((t) => t.path) ?? [];
  return {
    readme: paths.some((p) => /^readme(\.|$)/i.test(p)),
    tests: paths.some((p) => TEST_PATH.test(p)),
    ci: paths.some((p) => CI_PATH.test(p)),
    docker: paths.some((p) => DOCKER_PATH.test(p)),
    files: paths.length,
  };
}

/** Latest completed run of the repository's main CI workflow (scheduled jobs are skipped). */
async function latestCi(repo) {
  const workflows = (await gh(`/repos/${USER}/${repo.name}/actions/workflows`))?.workflows ?? [];
  const ci =
    workflows.find((w) => /\/ci\.ya?ml$/.test(w.path) || /(^|\W)ci(\W|$)/i.test(w.name)) ??
    workflows.find((w) => w.state === 'active');
  if (!ci) return null;
  const runs = await gh(
    `/repos/${USER}/${repo.name}/actions/workflows/${ci.id}/runs?branch=${repo.default_branch}&status=completed&per_page=1`,
  );
  const run = runs?.workflow_runs?.[0];
  if (!run) return null;
  return { workflow: run.name, conclusion: run.conclusion, at: run.updated_at, url: run.html_url };
}

function validate(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') throw new Error('snapshot is not an object');
  if (!Array.isArray(snapshot.repos) || snapshot.repos.length === 0) throw new Error('no repositories');
  for (const r of snapshot.repos) {
    if (typeof r.name !== 'string' || !r.url?.startsWith('https://github.com/')) {
      throw new Error(`malformed repository entry: ${JSON.stringify(r).slice(0, 80)}`);
    }
  }
}

async function main() {
  if (process.argv.includes('--on-build') && process.env.GITHUB_SYNC_ON_BUILD !== '1') {
    console.log('[sync-github] skipped (set GITHUB_SYNC_ON_BUILD=1 to refresh on build)');
    return;
  }
  const listed = await gh(`/users/${USER}/repos?type=owner&sort=pushed&per_page=100`);
  if (!Array.isArray(listed)) throw new Error('unexpected repository list response');

  const publicRepos = listed.filter((r) => r.private === false && r.visibility !== 'private' && !r.fork);

  const repos = [];
  for (const r of publicRepos) {
    const [sig, ci] = await Promise.all([signals(r), r.archived ? null : latestCi(r)]);
    repos.push({
      name: r.name,
      description: r.description || null,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language || null,
      topics: r.topics ?? [],
      license: r.license?.spdx_id && r.license.spdx_id !== 'NOASSERTION' ? r.license.spdx_id : null,
      stars: r.stargazers_count,
      archived: r.archived,
      createdAt: r.created_at,
      pushedAt: r.pushed_at,
      signals: sig,
      ci,
    });
  }

  const snapshot = { user: USER, source: 'api.github.com', syncedAt: new Date().toISOString(), repos };
  validate(snapshot);
  await writeFile(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`[sync-github] wrote ${repos.length} public repositories → ${path.relative(process.cwd(), OUT)}`);
}

main().catch(async (err) => {
  let kept = 'no previous snapshot';
  try {
    const prev = JSON.parse(await readFile(OUT, 'utf8'));
    kept = `kept snapshot from ${prev.syncedAt}`;
  } catch {}
  console.warn(`[sync-github] sync failed: ${err.message} — ${kept}`);
  process.exit(STRICT ? 1 : 0);
});
