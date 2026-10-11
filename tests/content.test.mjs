/**
 * Guards for the published content: the GitHub snapshot is well-formed and public-only,
 * the curated manifest only links repositories the snapshot knows, and private work is
 * never referenced by name.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFile(path.join(root, p), 'utf8');

// Repositories that must never appear anywhere in published content. Read from the
// environment so the names themselves are never committed to this public repository.
const PRIVATE_NAMES = (process.env.PRIVATE_REPO_NAMES ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const snapshot = JSON.parse(await read('src/data/github.json'));
const manifest = await read('src/content/projects.ts');

test('snapshot is well-formed', () => {
  assert.equal(typeof snapshot.syncedAt, 'string');
  assert.ok(!Number.isNaN(Date.parse(snapshot.syncedAt)));
  assert.ok(Array.isArray(snapshot.repos) && snapshot.repos.length > 0);
  for (const r of snapshot.repos) {
    assert.match(r.url, /^https:\/\/github\.com\/AntonioLoLa\//, r.name);
    assert.equal(typeof r.pushedAt, 'string', r.name);
    assert.equal(typeof r.signals, 'object', r.name);
  }
});

test('snapshot contains no private repositories', () => {
  for (const r of snapshot.repos) {
    assert.ok(!('private' in r) || r.private === false, r.name);
    assert.ok(!PRIVATE_NAMES.includes(r.name), `${r.name} is private`);
  }
});

test('every curated repository is present in the snapshot', () => {
  const names = new Set(snapshot.repos.map((r) => r.name));
  const curated = [...manifest.matchAll(/repo:\s*'([^']+)'/g)].map((m) => m[1]);
  assert.ok(curated.length > 0);
  for (const name of curated) assert.ok(names.has(name), `${name} missing from snapshot — renamed or made private?`);
});

test('private repository names never appear in content or messages', { skip: PRIVATE_NAMES.length === 0 && 'set PRIVATE_REPO_NAMES to run' }, async () => {
  const files = ['messages/en.json', 'messages/es.json', 'src/content/projects.ts', 'src/data/github.json'];
  for (const dir of ['src/components', 'src/content']) {
    for (const f of await readdir(path.join(root, dir), { recursive: true })) {
      if (/\.(tsx?|json)$/.test(f)) files.push(path.join(dir, f));
    }
  }
  for (const f of files) {
    const text = await read(f);
    for (const name of PRIVATE_NAMES) assert.ok(!text.includes(name), `${name} referenced in ${f}`);
  }
});

test('both locales define the same message keys', async () => {
  const keys = (obj, prefix = '') =>
    Object.entries(obj).flatMap(([k, v]) =>
      v && typeof v === 'object' && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
    );
  const en = keys(JSON.parse(await read('messages/en.json'))).sort();
  const es = keys(JSON.parse(await read('messages/es.json'))).sort();
  assert.deepEqual(es, en);
});
