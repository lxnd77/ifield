#!/usr/bin/env node
/**
 * One-time batch conversion: every JPG/PNG under public/images becomes a
 * same-name .webp, resized down to a sane max width for photography.
 * Originals are deleted once the .webp is written and verified.
 *
 * Skips images/og-default.jpg — social-platform crawlers (Facebook,
 * LinkedIn, some messaging apps) don't reliably support WebP og:image,
 * so the fallback share card stays JPG.
 *
 * This does not touch code references — run
 * scripts/update-image-refs.mjs (or the equivalent manual edits)
 * afterward to point the manifest/content at the new filenames.
 */
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = join(root, 'public/images');

const MAX_WIDTH = 2400;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 90;

const SKIP = new Set([join(imagesDir, 'og-default.jpg')]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;

for await (const file of walk(imagesDir)) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  if (SKIP.has(file)) {
    console.log(`skip   ${relative(root, file)} (og:image fallback — kept as-is)`);
    continue;
  }

  const before = (await stat(file)).size;
  const outPath = file.slice(0, -ext.length) + ".webp";

  const isPng = ext === ".png";
  const pipeline = sharp(file).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  await (isPng
    ? pipeline.webp({ quality: PNG_QUALITY, alphaQuality: 100 })
    : pipeline.webp({ quality: JPEG_QUALITY })
  ).toFile(outPath);

  const after = (await stat(outPath)).size;
  await unlink(file);

  totalBefore += before;
  totalAfter += after;
  converted += 1;

  console.log(
    `${relative(root, file)} → ${relative(root, outPath)}  ` +
      `${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`,
  );
}

console.log(
  `\n${converted} files converted. ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ` +
    `${(totalAfter / 1024 / 1024).toFixed(1)}MB ` +
    `(${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}% smaller)`,
);
