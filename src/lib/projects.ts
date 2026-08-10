import { getCollection, type CollectionEntry } from 'astro:content';
import { directoryKey } from '../data/projects';

/**
 * Read side for the Projects collection.
 *
 * A directory row links to a case study when a CMS entry carries the
 * same name and location. The seeded entries deliberately use the
 * directory's exact strings so this matches without fuzzy logic —
 * an editor who changes `location` to something the directory does
 * not contain simply loses the link, which is visible and easy to
 * put right.
 */

export type Project = CollectionEntry<'projects'>;

export async function allProjects(): Promise<Project[]> {
  return getCollection('projects');
}

/** Flagship Work grid, ordered by `featuredOrder` then name. */
export async function featuredProjectEntries(): Promise<Project[]> {
  const projects = await allProjects();
  return projects
    .filter((p) => p.data.featured)
    .sort(
      (a, b) =>
        a.data.featuredOrder - b.data.featuredOrder || a.data.title.localeCompare(b.data.title),
    );
}

/** Map of `name|location` → slug, for linking directory rows. */
export async function projectSlugByDirectoryKey(): Promise<Map<string, string>> {
  const projects = await allProjects();
  return new Map(projects.map((p) => [directoryKey(p.data.title, p.data.location), p.id]));
}

/**
 * Previous/next pager, following the order the Flagship grid uses so
 * the sequence a visitor sees is the sequence they can page through.
 */
export async function projectSiblings(
  current: Project,
): Promise<{ prev: Project | null; next: Project | null }> {
  const ordered = await featuredProjectEntries();
  const pool = ordered.some((p) => p.id === current.id) ? ordered : await allProjects();
  const index = pool.findIndex((p) => p.id === current.id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? (pool[index - 1] ?? null) : (pool[pool.length - 1] ?? null),
    next: index < pool.length - 1 ? (pool[index + 1] ?? null) : (pool[0] ?? null),
  };
}

/** True when the pull quote has something to show. */
export function hasTestimonial(project: Project): boolean {
  return (project.data.testimonial?.quote ?? '').trim().length > 0;
}
