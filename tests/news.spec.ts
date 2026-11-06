import { expect, test } from '@playwright/test';

/** The news list, post pages and the feed (#34). */
test.describe('the news list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news');
  });

  test('leads with a featured post, then the latest and the earlier years', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'News' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Who repairs the robot after the pilot ends/ })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Latest' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: '2024' })).toBeVisible();
  });

  test('filters by type, and empties a year that has nothing left', async ({ page }) => {
    await page.getByRole('button', { name: 'Announcements' }).click();
    await expect(page.getByRole('link', { name: /The organization map is open/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Notes from the 2024 pilot summit/ })).toBeHidden();
    await expect(page.getByRole('heading', { level: 2, name: '2024' })).toBeHidden();

    await page.getByRole('button', { name: 'All', exact: true }).click();
    await expect(page.getByRole('heading', { level: 2, name: '2024' })).toBeVisible();
  });

  test('shows every post without JavaScript', async ({ browser }) => {
    const page = await (await browser.newContext({ javaScriptEnabled: false })).newPage();
    await page.goto('/news');
    await expect(page.getByRole('link', { name: /Notes from the 2024 pilot summit/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Announcements' })).toBeHidden();
  });

  test('offers the feed', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Get the RSS feed' })).toHaveAttribute('href', '/news/rss.xml');
  });
});

test.describe('a post', () => {
  const POST = '/news/who-repairs-the-robot-after-the-pilot-ends';

  test('shows its author, date, reading time and sections', async ({ page }) => {
    await page.goto(POST);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Who repairs the robot after the pilot ends?');
    await expect(page.getByText('THURSDAY, MARCH 12, 2026 · 6 MIN READ')).toBeVisible();
    await expect(page.getByRole('link', { name: /Elif Brandvold/ })).toHaveAttribute('href', '/people/elif-brandvold');
    await expect(page.getByRole('heading', { level: 2, name: 'What technicians ask for' })).toBeVisible();
    await expect(page.getByText('A robot nobody local can fix is a demo, not a deployment.')).toBeVisible();
  });

  test('links where to go next, and to more of the same kind', async ({ page }) => {
    await page.goto(POST);
    await expect(page.getByRole('link', { name: /The white paper/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'MORE ESSAYS' })).toBeVisible();
  });
});

test.describe('the feed', () => {
  test('is valid RSS, newest first, and leaves out undated posts', async ({ request }) => {
    const res = await request.get('/news/rss.xml');
    expect(res.status()).toBe(200);
    // On the static site the host picks the type from the file extension, so
    // it is text/xml rather than the endpoint's application/rss+xml. Feed
    // readers accept either; Caddy can set it properly once the site is on
    // the server (#19).
    expect(res.headers()['content-type']).toMatch(/xml/);
    const xml = await res.text();
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);

    const dates = [...xml.matchAll(/<pubDate>([^<]+)<\/pubDate>/g)].map((m) => Date.parse(m[1]!));
    expect(dates.length).toBeGreaterThan(0);
    expect(dates.every((d) => !Number.isNaN(d))).toBe(true);
    expect(dates).toEqual([...dates].sort((a, b) => b - a));

    // Posts with no date yet are placeholders; a reader has nowhere to put them.
    expect(xml).not.toContain('Save the date: Vert Robo Con Summit 2027');
    // Links in a feed are absolute and point at the real site, not at
    // whatever host served the file.
    expect(xml).toContain('<link>https://crn.elghareeb.space/news/who-repairs-the-robot-after-the-pilot-ends</link>');
    expect(xml).not.toContain('localhost');
  });
});
