import { expect, test } from '@playwright/test';

/** Research, the white paper reader and the three codes (#31). */
test.describe('the research page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research');
  });

  test('leads with the white paper and lists its chapters', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Where robots help the climate');
    await expect(page.getByRole('link', { name: /Read online/ })).toHaveAttribute('href', '/research/white-paper/2025');
    const chapters = page.locator('ol li a[href^="/research/white-paper/2025#"]');
    await expect(chapters).toHaveCount(6);
    // Each chapter links straight to its own section.
    await expect(chapters.first()).toHaveAttribute('href', '/research/white-paper/2025#introduction');
  });

  test('credits the authors as the paper does', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Dr. Mireille Vos/ })).toHaveAttribute('href', '/people/mireille-vos');
  });

  test('links the three codes', async ({ page }) => {
    // Scoped to the section: the footer links to the code of conduct too.
    const section = page.locator('section').filter({ has: page.getByRole('heading', { name: 'How we work' }) });
    for (const [name, href] of [
      ['Design principles', '/principles'],
      ['Deployment code', '/deployment-code'],
      ['Code of conduct', '/code-of-conduct'],
    ]) {
      await expect(section.getByRole('link', { name: new RegExp(name!) })).toHaveAttribute('href', href!);
    }
  });
});

test.describe('the reader', () => {
  test('has contents, deep links and both citation formats', async ({ page }) => {
    await page.goto('/research/white-paper/2025');
    await expect(page.getByRole('heading', { level: 1, name: 'Working Notes on Climate Robots' })).toBeVisible();

    const contents = page.getByRole('navigation', { name: 'Contents' });
    await expect(contents.getByRole('link', { name: 'Running costs' })).toHaveAttribute('href', '#running-costs');
    // Every entry points at a heading that is really on the page.
    const hrefs = await contents.locator('a[href^="#"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    for (const href of hrefs) await expect(page.locator(href)).toHaveCount(1);

    await expect(page.getByText(/Vert Robo Con \(2025\)\. Working Notes on Climate Robots/)).toBeVisible();
    await expect(page.getByText('@techreport{vrc2025whitepaper')).toBeVisible();
  });

  test('offers "suggest an edit" as coming soon, not an outside form', async ({ page }) => {
    await page.goto('/research/white-paper/2025');
    await expect(page.getByText('Suggest an edit coming soon')).toBeVisible();
    const hrefs = await page.locator('main a[href]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const href of hrefs) expect(href.startsWith('http://localhost') || href.startsWith('mailto:'), href).toBe(true);
  });

  test('each code reads the same way', async ({ page }) => {
    for (const [path, title] of [
      ['/principles', 'Design principles'],
      ['/deployment-code', 'Deployment code'],
      ['/code-of-conduct', 'Code of conduct'],
    ]) {
      await page.goto(path!);
      await expect(page.getByRole('heading', { level: 1, name: title! })).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Contents' })).toBeVisible();
      await expect(page.getByText(/^@misc\{/)).toBeVisible();
      await expect(page.getByRole('link', { name: 'Research' }).first()).toHaveAttribute('href', '/research');
    }
  });
});
