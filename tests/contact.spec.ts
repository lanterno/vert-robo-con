import { expect, test } from '@playwright/test';

/** Contact and Privacy (#37). */
test.describe('contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('answers the common questions and says how long a reply takes', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('How can we');
    await expect(page.getByText(/We usually reply within 24–48 hours/).first()).toBeVisible();
    await expect(page.getByRole('term').filter({ hasText: 'When is the next summit?' })).toBeVisible();
  });

  test('sends each topic somewhere: a page, or email with the subject set', async ({ page }) => {
    const topics = page.locator('#topics');
    // A topic a page already answers links there.
    await expect(topics.getByRole('link', { name: /Summit 2027/ })).toHaveAttribute('href', '/summits/2027');
    // One waiting on the form (#54) offers email, with the topic as the subject.
    const research = topics.locator('li').filter({ hasText: 'White paper & research' });
    await expect(research.getByText('Form coming soon')).toBeVisible();
    await expect(research.getByRole('link', { name: /Email us/ })).toHaveAttribute(
      'href',
      'mailto:hello@vert-robo-con.example?subject=White%20paper%20%26%20research',
    );
  });

  test('shows the consulting coordinator', async ({ page }) => {
    const aside = page.getByRole('complementary', { name: 'Consulting and email' });
    await expect(aside.getByText('Imogen Calder')).toBeVisible();
    await expect(aside.getByRole('link', { name: 'View profile' })).toHaveAttribute('href', '/people/imogen-calder');
  });

  test('offers no outside form', async ({ page }) => {
    const hrefs = await page.locator('main a[href]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const href of hrefs) expect(href.startsWith('http://localhost') || href.startsWith('mailto:'), href).toBe(true);
  });
});

test.describe('privacy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/privacy');
  });

  test('is marked as a draft, since #5 is still open', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Privacy' })).toBeVisible();
    await expect(page.getByText('Draft · in legal review')).toBeVisible();
  });

  test('names Cloudflare Web Analytics, and none of the tools that were dropped', async ({ page }) => {
    await expect(page.getByText(/Cloudflare Web Analytics/).first()).toBeVisible();
    const text = (await page.locator('main').textContent()) ?? '';
    for (const gone of ['Umami', 'listmonk', 'Plausible', 'Matomo']) expect(text).not.toContain(gone);
  });

  test('shows what is still undecided as a placeholder, not a guess', async ({ page }) => {
    const text = (await page.locator('main').textContent()) ?? '';
    expect(text).toContain('[LEGAL ENTITY]');
    expect(text).toContain('[LEGAL BASIS]');
  });

  test('has every section, and lists what each form asks for', async ({ page }) => {
    for (const heading of ['Who we are', 'What we collect, and why', 'Who processes it', 'No cookies for tracking', 'Your rights', 'The map dataset', 'Changes to this policy']) {
      await expect(page.getByRole('heading', { level: 2, name: new RegExp(heading) })).toBeVisible();
    }
    // Each kind of data opens to show its fields.
    const registration = page.locator('details').filter({ hasText: 'Summit registration' });
    await expect(registration.getByText('Accessibility or captioning needs (optional)')).toBeHidden();
    await registration.locator('summary').click();
    await expect(registration.getByText('Accessibility or captioning needs (optional)')).toBeVisible();
  });
});
