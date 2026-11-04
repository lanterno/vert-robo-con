import { expect, test } from '@playwright/test';

/** The summit pages (#28). */
test('the overview links to each edition with a page, and the pilot has none', async ({ page }) => {
  await page.goto('/summits');
  await expect(page.getByRole('heading', { level: 1, name: 'Vert Robo Con Summit' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Summit 2027/ }).first()).toHaveAttribute('href', '/summits/2027');
  for (const year of ['2026', '2025']) await expect(page.locator(`main a[href="/summits/${year}"]`).first()).toBeVisible();
  await expect(page.locator('main a[href="/summits/2024"]')).toHaveCount(0);
});

test('the edition picker marks the edition on show', async ({ page }) => {
  await page.goto('/summits/2026');
  const picker = page.getByRole('navigation', { name: 'Editions' });
  await expect(picker.getByRole('link', { name: '2026' })).toHaveAttribute('aria-current', 'page');
  await picker.getByRole('link', { name: /2025/ }).click();
  await expect(page).toHaveURL(/\/summits\/2025$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('2025');
});

test('2027 has no Register button until registration is built (#40)', async ({ page }) => {
  await page.goto('/summits/2027');
  // The footer's "Register / Notify me" link is site-wide; the page itself offers none.
  const main = page.locator('main');
  await expect(main.getByRole('link', { name: /Register/ })).toHaveCount(0);
  await expect(main.getByRole('button', { name: /Register/ })).toHaveCount(0);
  await expect(page.getByText(/Registration (opens|opened) Dec 7, 2026/)).toBeVisible();
  await expect(page.getByText('Speakers not announced yet')).toBeVisible();
});

test('a speaker opens the person drawer, which lists the sessions they spoke in', async ({ page }) => {
  await page.goto('/summits/2026');
  const card = page.getByRole('link', { name: /Ruth Calloway/ });
  await card.click();
  const drawer = page.getByRole('dialog', { name: 'Ruth Calloway' });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText('Leak Survey Technician · Example Gas Utility')).toBeVisible();
  await expect(drawer.getByRole('link', { name: /Finding Methane Leaks Sooner/ })).toHaveAttribute(
    'href',
    '/summits/2026/sessions/panel-finding-methane-leaks-sooner',
  );
  await page.keyboard.press('Escape');
  await expect(card).toBeFocused();
});

test('a past edition lists its partners by tier', async ({ page }) => {
  await page.goto('/summits/2025');
  const partners = page.locator('#partners');
  await expect(partners.getByText('GOLD SPONSOR')).toBeVisible();
  await expect(partners.getByText('Example Climate Fund')).toBeVisible();
  await expect(partners.getByRole('link', { name: /Sponsor 2027/ })).toBeVisible();
});
