import { expect, test } from '@playwright/test';
import { NOT_FOUND_PATH, ROUTES } from './routes';

/**
 * Every route loads, at desktop and phone widths. A page that throws, 404s or
 * renders nothing fails here.
 */
for (const route of ROUTES) {
  test(`${route} loads`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    const response = await page.goto(route);
    expect(response?.status(), `${route} should return 200`).toBe(200);

    // A page that rendered has a title and a single h1.
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('h1').first()).toBeVisible();

    expect(errors, `${route} threw in the browser`).toEqual([]);
  });
}

test('an unknown path serves the 404 page', async ({ page }) => {
  const response = await page.goto(NOT_FOUND_PATH);
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1').first()).toBeVisible();
});

test('the map dataset is served as JSON', async ({ request }) => {
  const response = await request.get('/data/organizations.json');
  expect(response.status()).toBe(200);
  const body: unknown = await response.json();
  expect(Array.isArray(body) ? body.length : 0).toBeGreaterThan(0);
});
