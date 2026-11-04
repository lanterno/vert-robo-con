import { expect, test } from '@playwright/test';

/** The video library and video pages (#30). */
test.describe('the library', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/watch');
  });

  test('groups videos into shelves, and says when an edition is still editing', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 2, name: 'Robots in the Field' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Summit 2025' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Summit 2026' })).toBeVisible();
    await expect(page.getByText('The recordings are being edited. They appear here as they are published.')).toBeVisible();
  });

  test('filters by type, and a search narrows to one video', async ({ page }) => {
    const shelves = page.locator('[data-shelves]');
    await expect(shelves).toBeVisible();

    await page.getByRole('button', { name: 'Series' }).click();
    // Filtering swaps the shelves for one grid of what matched.
    await expect(shelves).toBeHidden();
    await expect(page.getByText('4 videos')).toBeVisible();

    await page.getByRole('button', { name: 'All', exact: true }).click();
    await page.getByLabel('Search talks, speakers and topics').fill('glacier');
    await expect(page.getByText('1 video', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: /Tamsin Ocampo on measuring a glacier/ })).toBeVisible();
  });

  test('finds a video by its speaker, and by topic', async ({ page }) => {
    await page.getByLabel('Search talks, speakers and topics').fill('Odile Farrow');
    await expect(page.getByText('1 video', { exact: true })).toBeVisible();

    await page.getByLabel('Search talks, speakers and topics').fill('');
    await page.getByRole('button', { name: 'Sea' }).click();
    await expect(page.getByRole('link', { name: /Replanting reefs with diving robots/ })).toBeVisible();
    // Pressing the same topic again clears it.
    await page.getByRole('button', { name: 'Sea' }).click();
    await expect(page.locator('[data-shelves]')).toBeVisible();
  });

  test('offers a way back when nothing matches', async ({ page }) => {
    await page.getByLabel('Search talks, speakers and topics').fill('zzzz');
    await expect(page.getByText('No videos match')).toBeVisible();
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.locator('[data-shelves]')).toBeVisible();
  });

  test('shows every video without JavaScript', async ({ browser }) => {
    const page = await (await browser.newContext({ javaScriptEnabled: false })).newPage();
    await page.goto('/watch');
    await expect(page.getByRole('heading', { level: 2, name: 'Robots in the Field' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Why robots belong in climate work/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Series' })).toBeHidden();
  });
});

test.describe('a video page', () => {
  test('shows the video, who is in it, and where it came from', async ({ page }) => {
    await page.goto('/watch/v25-keynote-ocampo');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('measuring a glacier');
    await expect(page.getByRole('button', { name: /^Play:/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Tamsin Ocampo/ }).first()).toBeVisible();
    // It came from a session, so it links back to it.
    await expect(page.getByRole('link', { name: 'Keynote: Measuring a glacier that will not hold still' })).toHaveAttribute(
      'href',
      '/summits/2025/sessions/keynote-measuring-a-glacier-that-will-not-hold-still',
    );
  });

  test('an episode links to its series and the other episodes', async ({ page }) => {
    await page.goto('/watch/ritf-2');
    await expect(page.getByRole('heading', { level: 1, name: 'Replanting reefs with diving robots' })).toBeVisible();
    await expect(page.locator('aside').getByText('Robots in the Field')).toBeVisible();
    await expect(page.locator('aside').getByRole('link', { name: /Why robots belong in climate work/ })).toBeVisible();
  });

  test('contacts no video host, since the demo videos have no recording', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (r) => {
      if (!r.url().startsWith('http://localhost')) external.push(r.url());
    });
    await page.goto('/watch/ritf-2');
    await page.getByRole('button', { name: /^Play:/ }).click();
    await expect(page.getByRole('status').filter({ hasText: 'RECORDING PLACEHOLDER' })).toBeVisible();
    expect(external).toEqual([]);
  });
});
