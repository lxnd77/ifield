import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Read side for the Journal collection. Mirrors lib/projects.ts.
 *
 * Every read goes through `allPosts()`, which is the one place drafts
 * are filtered out — nothing downstream needs to remember to check
 * `data.draft` itself.
 */

export type Post = CollectionEntry<'posts'>;

function byNewestFirst(a: Post, b: Post): number {
  return b.data.publishedAt.localeCompare(a.data.publishedAt) || b.id.localeCompare(a.id);
}

/** Every published post, newest first. Drafts never leave this function. */
export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort(byNewestFirst);
}

/**
 * The hero story for the Journal index: the newest post flagged
 * `featured`, or simply the newest post if none is flagged.
 */
export async function featuredPost(): Promise<Post | null> {
  const posts = await allPosts();
  return posts.find((p) => p.data.featured) ?? posts[0] ?? null;
}

export const CATEGORY_LABELS: Record<Post['data']['category'], string> = {
  trends: 'Trends',
  guides: 'Guides',
  interviews: 'Interviews',
  insights: 'Insights',
  news: 'News',
};

export const CATEGORY_ORDER: readonly Post['data']['category'][] = [
  'trends',
  'guides',
  'interviews',
  'insights',
  'news',
];

/** Chronological prev/next within the full published set. */
export async function postSiblings(
  current: Post,
): Promise<{ prev: Post | null; next: Post | null }> {
  const posts = await allPosts();
  const index = posts.findIndex((p) => p.id === current.id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < posts.length - 1 ? (posts[index + 1] ?? null) : null,
    next: index > 0 ? (posts[index - 1] ?? null) : null,
  };
}

/**
 * Related posts: same category first (newest first), then the newest
 * remaining posts if the category alone doesn't fill the shelf.
 */
export async function relatedPosts(current: Post, count = 3): Promise<Post[]> {
  const posts = (await allPosts()).filter((p) => p.id !== current.id);
  const sameCategory = posts.filter((p) => p.data.category === current.data.category);
  const rest = posts.filter((p) => p.data.category !== current.data.category);
  return [...sameCategory, ...rest].slice(0, count);
}

/** "12 June 2026" — used on cards and the article hero. */
export function formatPostDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** "Jun 2026" — the compact form used in card meta lines. */
export function formatPostDateShort(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}
