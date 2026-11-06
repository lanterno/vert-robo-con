/**
 * The documents the site publishes (#31): the white paper and the three
 * codes, as Markdown in src/content/documents. #45 moves them into Postgres.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const documents = defineCollection({
  loader: glob({ base: './src/content/documents', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** The small label above the title, such as "WHITE PAPER · 2025 EDITION". */
    eyebrow: z.string(),
    /** Which edition this is and when it changed. */
    version: z.string(),
    citation: z.object({
      apa: z.string(),
      bibtex: z.string().optional(),
    }),
  }),
});

export const collections = { documents };
