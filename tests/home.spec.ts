import { expect, test } from '@playwright/test';

/** The home page's own behaviour (#27). */
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the places robots work show one at a time, and arrow keys move between them', async ({ page }) => {
  const tablist = page.getByRole('tablist', { name: 'Where robots work' });
  const sky = tablist.getByRole('tab', { name: /^Sky/ });
  await expect(sky).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toHaveCount(1);
  await expect(page.getByRole('tabpanel')).toContainText('Drones scatter seed');

  await sky.focus();
  await page.keyboard.press('ArrowRight');
  const field = tablist.getByRole('tab', { name: /^Field/ });
  await expect(field).toBeFocused();
  await expect(field).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('Ground robots weed crops');

  await page.keyboard.press('End');
  await expect(tablist.getByRole('tab', { name: /^Factory/ })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(sky).toBeFocused();
});

test('every Join control on the page opens the join sheet', async ({ page }) => {
  const openers = page.locator('main [data-sheet-open="join-sheet"]');
  const count = await openers.count();
  expect(count).toBeGreaterThanOrEqual(3);
  for (let i = 0; i < count; i++) {
    await openers.nth(i).scrollIntoViewIfNeeded();
    await openers.nth(i).click();
    const sheet = page.getByRole('dialog', { name: 'Join the network' });
    await expect(sheet).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(sheet).toBeHidden();
  }
});

test('the summit tile shows the edition’s state and dates', async ({ page }) => {
  const tile = page.locator('main').getByText('April 20–22, 2027').first();
  await expect(tile).toBeVisible();
  // The state depends on the build date; any of the chip's forms will do.
  await expect(page.locator('main').getByText(/REGISTRATION OPENS|REGISTRATION OPEN|CLOSES IN|REGISTRATION CLOSED|LIVE NOW|CONCLUDED/).first()).toBeVisible();
});
