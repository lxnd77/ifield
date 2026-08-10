#!/usr/bin/env node
/**
 * npm run check:images
 *
 * Lists every image slot that still needs a file, grouped by folder,
 * with the exact filename and the aspect ratio to supply.
 * Exits 0 always — missing images are expected during the build-out,
 * not an error.
 */
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

// The manifest is TypeScript; strip the types with Node's built-in
// type stripping (Node 22.6+ / 22.18+ enables this by default).
const { images } = await import(pathToFileURL(join(root, 'src/data/images.ts')).href);

const entries = Object.entries(images).map(([key, slot]) => ({
  key,
  ...slot,
  exists: existsSync(join(publicDir, slot.path)),
}));

const missing = entries.filter((e) => !e.exists);
const present = entries.filter((e) => e.exists);

const groups = new Map();
for (const entry of missing) {
  const folder = entry.path.split('/').slice(0, -1).join('/');
  if (!groups.has(folder)) groups.set(folder, []);
  groups.get(folder).push(entry);
}

const B = (s) => `\x1b[1m${s}\x1b[0m`;
const DIM = (s) => `\x1b[2m${s}\x1b[0m`;
const RED = (s) => `\x1b[31m${s}\x1b[0m`;
const GRN = (s) => `\x1b[32m${s}\x1b[0m`;

console.log('');
console.log(B('  I-Field — image manifest'));
console.log(
  `  ${GRN(`${present.length} supplied`)}  ·  ${missing.length ? RED(`${missing.length} still needed`) : GRN('nothing outstanding')}  ·  ${entries.length} total`,
);
console.log('');

if (missing.length === 0) {
  console.log(GRN('  Every slot has a file. \n'));
  process.exit(0);
}

for (const [folder, items] of [...groups].sort()) {
  console.log(`  ${B(`public/${folder}/`)}  ${DIM(`(${items.length})`)}`);
  for (const item of items) {
    const file = item.path.split('/').pop();
    console.log(
      `    ${file.padEnd(24)} ${DIM(`${item.ratio.padEnd(6)} ≥${String(item.minWidth).padEnd(5)}px`)}  ${DIM(item.description)}`,
    );
  }
  console.log('');
}

console.log(DIM('  Drop files in with these exact names — no code changes needed.'));
console.log('');
