/** robots.txt (#38): everything is public, and the sitemap is here. */
import type { APIRoute } from 'astro';
import { SITE } from '@/lib/constants';

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL(SITE.url)).href.replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
