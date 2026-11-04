import { expect, test } from '@playwright/test';

/** The people pages (#33). */
test.describe('the people page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/people');
  });

  test('has a section for the team, each edition’s speakers and the authors', async ({ page }) => {
    for (const name of ['Team & organizers', 'Summit speakers · 2026', 'Summit speakers · 2025', 'White paper authors']) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
    }
  });

  test('credits an author as the paper does', async ({ page }) => {
    const authors = page.locator('#authors');
    await expect(authors.getByText('Dr. Mireille Vos')).toBeVisible();
    // Elsewhere she is herself.
    await expect(page.locator('#team').getByText('Mireille Vos', { exact: true })).toBeVisible();
  });

  test('a card opens the drawer, and is a link to the person’s page without it', async ({ page }) => {
    const card = page.locator('#team').getByRole('link', { name: /Elif Brandvold/ });
    await expect(card).toHaveAttribute('href', '/people/elif-brandvold');
    await card.click();
    const drawer = page.getByRole('dialog', { name: 'Elif Brandvold' });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText(/mailing list for people who repair field robots/)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(card).toBeFocused();
  });
});

test.describe('a person page', () => {
  test('shows their roles and everywhere they appear', async ({ page }) => {
    await page.goto('/people/mireille-vos');
    await expect(page.getByRole('heading', { level: 1, name: 'Mireille Vos' })).toBeVisible();
    await expect(page.getByText('Organising team')).toBeVisible();
    await expect(page.getByText('White paper 2025')).toBeVisible();
    await expect(page.getByRole('link', { name: /Open Q&A and topic wishlist/ })).toHaveAttribute(
      'href',
      '/summits/2026/sessions/open-q-a-and-topic-wishlist',
    );
    // The paper credits her differently, and says so.
    await expect(page.getByText('WHITE PAPER · AS DR. MIREILLE VOS')).toBeVisible();
  });

  test('links a speaker to their sessions and recordings', async ({ page }) => {
    await page.goto('/people/tamsin-ocampo');
    await expect(page.getByRole('link', { name: /Keynote: Measuring a glacier/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Tamsin Ocampo on measuring a glacier/ })).toHaveAttribute(
      'href',
      '/watch/v25-keynote-ocampo',
    );
  });

  test('loads every portrait, with no broken image', async ({ page }) => {
    // Everyone has a portrait today; initials are checked in the unit tests.
    for (const path of ['/people', '/people/lorcan-beddoes', '/people/tamsin-ocampo']) {
      await page.goto(path);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForLoadState('networkidle');
      // An image that has finished loading with no pixels is broken. One that
      // hasn't started is lazy and below the fold, which is not a failure.
      const broken = await page.locator('img').evaluateAll((imgs) =>
        imgs
          .filter((i): i is HTMLImageElement => i instanceof HTMLImageElement)
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
      );
      expect(broken, `broken images on ${path}`).toEqual([]);
    }
  });
});
