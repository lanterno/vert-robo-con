/**
 * The sitemap (#38).
 *
 * Built from the pages the build produced, so a new page is listed without
 * anyone remembering to add it. Three kinds of page stay out: the redirect
 * pages for old addresses, the 404, and anything marked noindex, such as
 * the components gallery.
 */
export const NOT_IN_SITEMAP = ['/404', '/components'];

/** True when a built page belongs in the sitemap. */
export function inSitemap(path: string, redirects: string[]): boolean {
  const clean = path.replace(/\/$/, '') || '/';
  return !NOT_IN_SITEMAP.includes(clean) && !redirects.includes(clean);
}

export function buildSitemap(paths: string[], site: string): string {
  const base = site.replace(/\/$/, '');
  const urls = [...new Set(paths)].sort().map((p) => `  <url><loc>${base}${p}</loc></url>`);
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join('\n');
}
