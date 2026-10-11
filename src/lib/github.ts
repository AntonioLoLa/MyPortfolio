import snapshot from '@/data/github.json';
import { hiddenRepos, projects } from '@/content/projects';

export type RepoSignals = { readme: boolean; tests: boolean; ci: boolean; docker: boolean; files: number };
export type RepoCi = { workflow: string; conclusion: string | null; at: string; url: string };
export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  license: string | null;
  stars: number;
  archived: boolean;
  createdAt: string;
  pushedAt: string;
  signals: RepoSignals;
  ci: RepoCi | null;
};

type Snapshot = { user: string; source: string; syncedAt: string; repos: Repo[] };

const data = snapshot as Snapshot;
const byName = new Map(data.repos.map((r) => [r.name, r]));

export const syncedAt = data.syncedAt;

/** Metadata for a curated repository; `undefined` if the sync no longer sees it as public. */
export function repo(name: string | undefined): Repo | undefined {
  return name ? byName.get(name) : undefined;
}

/** Public repositories the sync found that are neither curated nor hidden. */
export function uncuratedRepos(): Repo[] {
  const curated = new Set(projects.map((p) => p.repo).filter(Boolean));
  return data.repos
    .filter((r) => !curated.has(r.name) && !hiddenRepos.has(r.name) && !r.archived)
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
}

/** "2026-08" — month precision is all the index needs. */
export function month(iso: string): string {
  return iso.slice(0, 7);
}
