/** The news feed (#34): /news/rss.xml. */
import type { APIRoute } from 'astro';
import { getNews, newsFeed } from '@/lib/content';
import { SITE } from '@/lib/constants';

export const GET: APIRoute = ({ site }) =>
  new Response(
    newsFeed({
      posts: getNews(),
      site: (site ?? new URL(SITE.url)).href,
      title: `${SITE.name} news`,
      description: 'Essays, announcements and episodes from the Vert Robo Con network.',
    }),
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
