import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { images, type ImageKey, type ImageSlot } from '../data/images';

/**
 * Build-time check for whether a manifest slot has a real file
 * behind it yet. Runs on the server during `astro build` / dev;
 * never ships to the browser.
 */

const PUBLIC_DIR = join(process.cwd(), 'public');
const cache = new Map<string, boolean>();

/**
 * Caching is production-only. In dev the whole point of the manifest is
 * that you drop a file into `public/` and it appears on the next reload —
 * a cached miss would keep showing the placeholder until the server was
 * restarted, which looks exactly like the drop-in workflow being broken.
 * A stat() per slot per request is trivially cheap.
 */
export function fileExists(publicRelativePath: string): boolean {
  if (import.meta.env.PROD) {
    const cached = cache.get(publicRelativePath);
    if (cached !== undefined) return cached;
  }
  const exists = existsSync(join(PUBLIC_DIR, publicRelativePath));
  if (import.meta.env.PROD) cache.set(publicRelativePath, exists);
  return exists;
}

export interface ResolvedImage {
  readonly key: ImageKey;
  readonly slot: ImageSlot;
  /** Absolute URL for `src`, or null when the file is not supplied yet. */
  readonly src: string | null;
  readonly available: boolean;
}

export function resolveImage(key: ImageKey): ResolvedImage {
  const slot = images[key] as ImageSlot;
  const available = fileExists(slot.path);
  return {
    key,
    slot,
    src: available ? `/${slot.path}` : null,
    available,
  };
}

/** Every slot still waiting on a file. Used by `npm run check:images`. */
export function missingImages(): ResolvedImage[] {
  return (Object.keys(images) as ImageKey[])
    .map(resolveImage)
    .filter((r) => !r.available);
}
