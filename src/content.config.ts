import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

/**
 * Astro-side schemas for the content Keystatic writes.
 *
 * These mirror keystatic.config.ts. Keystatic owns the authoring
 * experience; this owns the read side and the type safety. If you add
 * a field in one, add it here too — a mismatch surfaces as a build
 * error rather than a silent undefined.
 */

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    region: z.enum(['usa', 'mea', 'india', 'china']),
    keys: z.string().optional().default(''),
    scope: z.string().optional().default(''),
    year: z.string().optional().default(''),
    duration: z.string().optional().default(''),
    featured: z.boolean().default(false),
    featuredOrder: z.number().default(100),
    heroImage: z.string().nullable().optional(),
    cardImage: z.string().nullable().optional(),
    gallery: z
      .array(z.object({ image: z.string().nullable(), caption: z.string().optional().default('') }))
      .default([]),
    scopeDelivered: z.array(z.string()).default([]),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    testimonial: z
      .object({
        quote: z.string().optional().default(''),
        name: z.string().optional().default(''),
        role: z.string().optional().default(''),
      })
      .optional()
      .default({ quote: '', name: '', role: '' }),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['trends', 'guides', 'interviews', 'insights', 'news']),
    publishedAt: z.string(),
    draft: z.boolean().default(false),
    excerpt: z.string(),
    readingTime: z.string().optional().default(''),
    featured: z.boolean().default(false),
    coverImage: z.string().nullable().optional(),
    author: z
      .object({
        name: z.string().optional().default(''),
        role: z.string().optional().default(''),
      })
      .optional()
      .default({ name: '', role: '' }),
  }),
});

export const collections = { projects, posts };
