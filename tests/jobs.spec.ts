import { expect, test } from '@playwright/test';

/** Jobs and internships (#36), and Get involved (#35). */
test.describe('jobs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/jobs');
  });

  test('shows the empty state, since listings come with #57', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 3, name: 'No open roles right now' })).toBeVisible();
    await expect(page.getByText('Post a job')).toBeVisible();
    // Nothing offers an outside form in the meantime.
    const main = page.locator('main');
    await expect(main.getByRole('link', { name: /Post a job/ })).toHaveCount(0);
  });

  test('lists each internship track with the status from settings', async ({ page }) => {
    const tracks = page.locator('#internships');
    await expect(tracks.getByRole('heading', { level: 3, name: 'Map data' })).toBeVisible();
    await expect(tracks.getByRole('heading', { level: 3, name: 'Your own idea' })).toBeVisible();
    // Writing & editing is "soon" in the settings; the other three are open.
    const statuses = tracks.locator('[data-track-status]');
    await expect(statuses).toHaveCount(4);
    await expect(statuses.filter({ hasText: 'Coming soon' })).toHaveCount(1);
    await expect(statuses.filter({ hasText: 'Open' })).toHaveCount(3);
  });
});

test.describe('get involved', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/get-involved');
  });

  test('shows the summit calls with their state from the edition’s dates', async ({ page }) => {
    const calls = page.locator('#calls');
    await expect(calls.getByRole('heading', { level: 3, name: 'Pitch your startup' })).toBeVisible();
    // The startup call opens Dec 8, 2026, so before then it says so.
    const statuses = calls.locator('[data-call-status]');
    await expect(statuses).toHaveCount(4);
    await expect(statuses.filter({ hasText: /Opens Dec 8, 2026|^Open$/ })).not.toHaveCount(0);
    // The research call has no dates yet.
    await expect(statuses.filter({ hasText: 'Dates to come' })).toHaveCount(1);
  });

  test('shows the sponsor tiers, with one already taken, and the FAQ', async ({ page }) => {
    const sponsor = page.locator('#sponsor');
    await expect(sponsor.getByRole('heading', { level: 3, name: '[TIER 1]' })).toBeVisible();
    await expect(sponsor.getByText('Taken for 2027')).toBeVisible();
    await expect(sponsor.getByText('Can we sponsor a single session?')).toBeVisible();
  });

  test('shows the network projects, with the programmes’ status from settings', async ({ page }) => {
    const network = page.locator('#network');
    await expect(network.getByRole('heading', { level: 3, name: 'Fix-it Circle' })).toBeVisible();
    // Schools is "soon" and the learning hub "later" in the settings.
    const statuses = network.locator('[data-project-status]');
    await expect(statuses).toHaveCount(5);
    await expect(statuses.filter({ hasText: 'Coming soon' })).toHaveCount(1);
    await expect(statuses.filter({ hasText: 'Coming later' })).toHaveCount(1);
    await expect(statuses.filter({ hasText: 'Active' })).toHaveCount(3);
  });

  test('links to no outside form anywhere', async ({ page }) => {
    const hrefs = await page.locator('main a[href]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const href of hrefs) {
      expect(href.startsWith('http://localhost') || href.startsWith('mailto:'), href).toBe(true);
    }
  });
});
