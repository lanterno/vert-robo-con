import { expect, test } from '@playwright/test';
import { REDIRECTS } from '../src/lib/redirects';
import { ROUTES } from './routes';

/** Redirects, the 404, the sitemap and the head of every page (#38). */
test.describe('old addresses', () => {
  for (const { from, to } of REDIRECTS) {
    test(`${from} sends people to ${to}`, async ({ page }) => {
      await page.goto(from);
      // The meta refresh carries most readers.
      await expect(page).toHaveURL(new RegExp(`${to.replace('#', '(#|$)').replace(/\//g, '\\/')}`));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test(`${from} is a redirect page, not a real one`, async ({ request }) => {
      const res = await request.get(from);
      const html = await res.text();
      expect(html).toContain(`<meta http-equiv="refresh" content="0; url=${to}">`);
      expect(html).toContain('rel="canonical"');
      // Search engines are told not to keep it.
      expect(html).toContain('noindex');
      // Anyone the refresh doesn't carry still has a link.
      expect(html).toContain(`href="${to}"`);
    });
  }
});

test.describe('the 404 page', () => {
  test('is in the new look and suggests real pages', async ({ page }) => {
    const res = await page.goto('/this-page-is-not-here');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: 'That page isn’t here' })).toBeVisible();
    // Every suggestion goes somewhere that exists.
    const hrefs = await page.locator('main ul a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    expect(hrefs.length).toBeGreaterThan(3);
    for (const href of hrefs) {
      const check = await page.request.get(href);
      expect(check.status(), `${href} is a real page`).toBe(200);
    }
  });

  test('keeps itself out of search results', async ({ page }) => {
    await page.goto('/this-page-is-not-here');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  });
});

test.describe('the sitemap and robots.txt', () => {
  test('list every page, and nothing that should stay out', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
    expect(locs.length).toBeGreaterThan(100);

    for (const path of ['/', '/summits/2027', '/watch', '/people', '/news', '/map', '/privacy']) {
      expect(locs, `${path} is listed`).toContain(`https://crn.elghareeb.space${path === '/' ? '/' : path}`);
    }
    // The 404, the noindex gallery and the redirect pages stay out.
    for (const path of ['/404', '/components', '/consulting', '/slack']) {
      expect(locs.some((l) => l.endsWith(path)), `${path} is not listed`).toBe(false);
    }
  });

  test('robots.txt points at the sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('Sitemap: https://crn.elghareeb.space/sitemap.xml');
  });
});

test.describe('every page', () => {
  test('has a canonical link, a description and a social card', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      // The built site serves /contact/ as well as /contact, so the
      // canonical may carry a trailing slash; it must name the same page.
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical?.replace(/\/$/, ''), `${route} canonical`).toBe(
        `https://crn.elghareeb.space${route}`.replace(/\/$/, ''),
      );
      await expect(page.locator('meta[name="description"]'), `${route} description`).toHaveAttribute('content', /.{20,}/);
      await expect(page.locator('meta[property="og:title"]'), `${route} og:title`).toHaveAttribute('content', /.+/);
      await expect(page.locator('meta[name="twitter:card"]'), `${route} twitter card`).toHaveAttribute('content', 'summary_large_image');
    }
  });

  test('sends nothing to an analytics service unless a token is configured', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('script[data-cf-beacon]')).toHaveCount(0);
  });
});
