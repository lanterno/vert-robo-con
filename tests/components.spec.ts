import { expect, test, type Page } from '@playwright/test';
import { isCurrent } from '../src/lib/site-nav';

/**
 * How the shared components (#25) behave, driven on the components gallery:
 * the keyboard paths, focus, and what happens on phones.
 */
const isPhone = (page: Page) => (page.viewportSize()?.width ?? 1280) < 1024;
const focusedInside = (page: Page, selector: string) =>
  page.evaluate((sel) => !!document.querySelector(sel)?.contains(document.activeElement), selector);

test.beforeEach(async ({ page }) => {
  await page.goto('/components');
});

test.describe('header menus', () => {
  test.beforeEach(async ({ page }) => {
    test.skip(isPhone(page), 'The menus are in the desktop header; phones use the tab bar.');
  });

  test('open from the button, and Esc closes and returns focus', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Community', exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#menu-community')).toBeVisible();

    await page.keyboard.press('Tab');
    expect(await focusedInside(page, '#menu-community')).toBe(true);

    await page.keyboard.press('Escape');
    await expect(page.locator('#menu-community')).toBeHidden();
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('work from the keyboard alone', async ({ page }) => {
    const button = page.getByRole('button', { name: 'About', exact: true });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#menu-about')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /Mission and approach/ })).toBeFocused();
  });

  test('opening one closes the other', async ({ page }) => {
    await page.getByRole('button', { name: 'Community', exact: true }).click();
    await page.getByRole('button', { name: 'About', exact: true }).click();
    await expect(page.locator('#menu-community')).toBeHidden();
    await expect(page.locator('#menu-about')).toBeVisible();
  });

  test('close on a click elsewhere, and when focus leaves', async ({ page }) => {
    await page.getByRole('button', { name: 'Community', exact: true }).click();
    await page.locator('h1').click();
    await expect(page.locator('#menu-community')).toBeHidden();

    await page.getByRole('button', { name: 'About', exact: true }).click();
    for (let i = 0; i < 7; i++) await page.keyboard.press('Tab');
    await expect(page.locator('#menu-about')).toBeHidden();
  });
});

test.describe('sheet', () => {
  const sheet = '#demo-sheet';

  test('opens with focus inside, and keeps it there', async ({ page }) => {
    await page.getByRole('button', { name: 'Open the sheet' }).click();
    await expect(page.getByRole('dialog', { name: 'A sheet' })).toBeVisible();
    expect(await focusedInside(page, sheet)).toBe(true);
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      expect(await focusedInside(page, sheet), `focus left the sheet after ${i + 1} tabs`).toBe(true);
    }
    await expect(page.locator('html')).toHaveClass(/sheet-open/);
  });

  test('Esc closes it and returns focus to the opener', async ({ page }) => {
    const opener = page.getByRole('button', { name: 'Open the sheet' });
    await opener.click();
    await page.keyboard.press('Escape');
    await expect(page.locator(sheet)).toBeHidden();
    await expect(opener).toBeFocused();
    await expect(page.locator('html')).not.toHaveClass(/sheet-open/);
  });

  test('closes from the Close button and from the backdrop', async ({ page }) => {
    const opener = page.getByRole('button', { name: 'Open the sheet' });
    await opener.click();
    await page.locator(sheet).getByRole('button', { name: 'Close' }).click();
    await expect(page.locator(sheet)).toBeHidden();
    await expect(opener).toBeFocused();

    await opener.click();
    // Top left is backdrop in both layouts: left of a side sheet, above a bottom sheet.
    await page.mouse.click(5, 5);
    await expect(page.locator(sheet)).toBeHidden();
  });

  test('is a side sheet on wider screens and a bottom sheet on phones', async ({ page }) => {
    await page.getByRole('button', { name: 'Open the sheet' }).click();
    const box = await page.locator(sheet).boundingBox();
    const vp = page.viewportSize();
    if (!box || !vp) throw new Error('no layout');
    if (vp.width < 768) {
      expect(Math.round(box.width)).toBe(vp.width);
      expect(Math.round(box.y + box.height)).toBe(vp.height);
      expect(box.y).toBeGreaterThan(0);
    } else {
      expect(Math.round(box.width)).toBe(480);
      expect(Math.round(box.x + box.width)).toBe(vp.width);
      expect(Math.round(box.height)).toBe(vp.height);
    }
  });
});

test('Join opens the join sheet, which says it is coming and links out to no form', async ({ page }) => {
  await page.locator('header').getByRole('button', { name: /^Join/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Join the network' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('Coming soon')).toBeVisible();
  const hrefs = await dialog.locator('a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  expect(hrefs.every((h) => h?.startsWith('mailto:'))).toBe(true);
});

test.describe('person drawer', () => {
  test('opens from a card, named after the person', async ({ page }) => {
    await page.getByRole('link', { name: /Saskia Overmeer/ }).click();
    const dialog = page.getByRole('dialog', { name: 'Saskia Overmeer' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('TEAM · 1 OF 3')).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Previous' })).toHaveAttribute('aria-disabled', 'true');
  });

  test('steps through people with previous and next', async ({ page }) => {
    await page.getByRole('link', { name: /Saskia Overmeer/ }).click();
    await page.getByRole('button', { name: 'Next: Dario Fenwick' }).click();
    await expect(page.getByRole('dialog', { name: 'Dario Fenwick' })).toBeVisible();
    await expect(page.getByText('TEAM · 2 OF 3')).toBeVisible();
    await page.getByRole('button', { name: /^Next: / }).click();
    await expect(page.getByRole('dialog', { name: 'Kofi Ashgrove' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next', exact: true })).toHaveAttribute('aria-disabled', 'true');
    await page.getByRole('button', { name: 'Previous: Dario Fenwick' }).click();
    await expect(page.getByRole('dialog', { name: 'Dario Fenwick' })).toBeVisible();
  });

  test('Esc returns focus to the card that opened it', async ({ page }) => {
    const card = page.getByRole('link', { name: /Dario Fenwick/ });
    await card.click();
    await page.keyboard.press('Escape');
    await expect(card).toBeFocused();
  });

  test('copies a link to the person’s page', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.getByRole('link', { name: /Kofi Ashgrove/ }).click();
    await page.getByRole('button', { name: 'Copy link' }).click();
    await expect(page.getByText(/Copied: http:\/\/localhost:\d+\/people\/kofi-ashgrove/)).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/\/people\/kofi-ashgrove$/);
  });
});

test.describe('phone tab bar', () => {
  test('shows on phones only', async ({ page }) => {
    const bar = page.getByRole('navigation', { name: 'Primary, phone' });
    if (isPhone(page)) await expect(bar).toBeVisible();
    else await expect(bar).toBeHidden();
  });

  test('More opens the rest of the site', async ({ page }) => {
    test.skip(!isPhone(page), 'The tab bar is for phones.');
    await page.getByRole('navigation', { name: 'Primary, phone' }).getByRole('button', { name: 'More' }).click();
    const more = page.getByRole('dialog', { name: 'More' });
    await expect(more).toBeVisible();
    await expect(more.getByRole('link', { name: /Get involved/ })).toBeVisible();
    // My VRC is a later milestone: shown, but not a link.
    await expect(more.getByRole('link', { name: /^My VRC/ })).toHaveCount(0);
    await expect(more.getByText('My VRC', { exact: true })).toBeVisible();
  });
});

test.describe('video facade', () => {
  test('contacts no one until play, and a demo video shows a placeholder', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (r) => {
      if (!r.url().startsWith('http://localhost')) external.push(r.url());
    });
    await page.goto('/components');
    const play = page.getByRole('button', { name: /^Play: / });
    await play.scrollIntoViewIfNeeded();
    await play.click();
    const placeholder = page.getByRole('status').filter({ hasText: 'RECORDING PLACEHOLDER' });
    await expect(placeholder).toBeVisible();
    await expect(placeholder).toBeFocused();
    expect(external).toEqual([]);
  });

  test('plays a real video in the privacy-enhanced player', async ({ page }) => {
    // No demo video has a recording, so give the facade an id, and stop the
    // request before it leaves.
    await page.route(/youtube-nocookie\.com/, (route) => route.abort());
    await page.locator('[data-video-facade]').evaluate((el) => {
      (el as HTMLElement).dataset['youtubeId'] = 'test-id';
    });
    await page.getByRole('button', { name: /^Play: / }).click();
    const frame = page.locator('[data-video-facade] iframe');
    await expect(frame).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/test-id?autoplay=1&rel=0');
    await expect(frame).toHaveAttribute('title', 'Measuring a glacier that will not hold still');
  });
});

test('navigation marks the current section, and the home page only on itself', () => {
  expect(isCurrent('/summits/2026', '/summits')).toBe(true);
  expect(isCurrent('/summits', '/summits/')).toBe(true);
  expect(isCurrent('/summitsx', '/summits')).toBe(false);
  expect(isCurrent('/watch', '/')).toBe(false);
  expect(isCurrent('/', '/#field')).toBe(true);
});
