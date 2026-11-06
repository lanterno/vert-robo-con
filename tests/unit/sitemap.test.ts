import { describe, expect, it } from 'vitest';
import { REDIRECTS } from '@/lib/redirects';
import { buildSitemap, inSitemap } from '@/lib/sitemap';

/** The sitemap (#38). */
const redirects = REDIRECTS.map((r) => r.from);

describe('what belongs in the sitemap', () => {
  it('takes a real page', () => {
    expect(inSitemap('/', redirects)).toBe(true);
    expect(inSitemap('/privacy', redirects)).toBe(true);
    expect(inSitemap('/summits/2027', redirects)).toBe(true);
  });

  it('leaves out the 404, the noindex gallery and the redirects', () => {
    expect(inSitemap('/404', redirects)).toBe(false);
    expect(inSitemap('/components', redirects)).toBe(false);
    for (const r of redirects) expect(inSitemap(r, redirects), r).toBe(false);
  });

  it('judges a path the same with or without a trailing slash', () => {
    expect(inSitemap('/components/', redirects)).toBe(false);
    expect(inSitemap('/consulting/', redirects)).toBe(false);
  });
});

describe('the sitemap file', () => {
  it('is sorted, has no repeats, and does not double the site’s slash', () => {
    const xml = buildSitemap(['/b', '/a', '/a', '/'], 'https://example.test/');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(['https://example.test/', 'https://example.test/a', 'https://example.test/b']);
    expect(xml).not.toContain('test//');
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
  });
});

describe('every redirect', () => {
  it('points somewhere on the site, and not at another redirect', () => {
    for (const r of REDIRECTS) {
      expect(r.to.startsWith('/'), `${r.from} → ${r.to}`).toBe(true);
      expect(redirects, `${r.from} points at another redirect`).not.toContain(r.to.split('#')[0]);
      expect(r.why.length, `${r.from} says why`).toBeGreaterThan(10);
    }
  });
});
