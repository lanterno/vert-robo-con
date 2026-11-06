/**
 * The sitemap (#38), listing every page the site publishes.
 *
 * The page list comes from Astro's own route list, so a page added later is
 * in the sitemap without anyone remembering.
 */
import type { APIRoute } from 'astro';
import { buildSitemap, inSitemap } from '@/lib/sitemap';
import { REDIRECTS } from '@/lib/redirects';
import { SITE } from '@/lib/constants';

export const GET: APIRoute = async ({ site }) => {
  const pages = import.meta.glob('./**/*.astro');
  const redirects = REDIRECTS.map((r) => r.from);

  const paths = Object.keys(pages)
    .map((file) =>
      file
        .replace(/^\.\//, '/')
        .replace(/\.astro$/, '')
        .replace(/\/index$/, '')
        .replace(/^$/, '/'),
    )
    // A route with a parameter is listed by the pages it builds, not by its
    // pattern, and those are added below.
    .filter((p) => !p.includes('['))
    .map((p) => p || '/')
    .filter((p) => inSitemap(p, redirects));

  const { getEditions, getNews, getPeople, getProgram, getSessions, getVideos } = await import('@/lib/content');
  for (const e of getEditions()) {
    if (!e.pilot) paths.push(`/summits/${e.year}`);
    if (getProgram(e.year)) {
      paths.push(`/summits/${e.year}/program`);
      for (const s of getSessions(e.year) ?? []) paths.push(`/summits/${e.year}/sessions/${s.slug}`);
    }
  }
  for (const v of getVideos()) paths.push(`/watch/${v.slug}`);
  for (const p of getPeople()) paths.push(`/people/${p.slug}`);
  for (const n of getNews()) paths.push(`/news/${n.slug}`);

  return new Response(buildSitemap(paths, (site ?? new URL(SITE.url)).href), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
