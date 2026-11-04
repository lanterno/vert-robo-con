import { expect, test } from '@playwright/test';

/** The program and session pages (#29). */
const PROGRAM = '/summits/2026/program';

test.describe('the program', () => {
  test('shows one day at a time, and moves between days from the keyboard', async ({ page }) => {
    await page.goto(PROGRAM);
    const tabs = page.getByRole('tablist', { name: 'Summit days' });
    await expect(tabs.getByRole('tab', { name: /DAY 1/ })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('link', { name: 'Panel: Finding methane leaks sooner', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Keynote: Hollis Wexford', exact: true })).toBeHidden();

    await tabs.getByRole('tab', { name: /DAY 1/ }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.getByRole('tab', { name: /DAY 2/ })).toBeFocused();
    await expect(page.getByRole('link', { name: 'Keynote: Hollis Wexford', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Panel: Finding methane leaks sooner', exact: true })).toBeHidden();
    // Only the chosen day's heading is on the page, not the empty ones.
    await expect(page.getByRole('heading', { name: /^Day 2/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^Day 1/ })).toBeHidden();
  });

  test('filters by type, track and search, and offers a way back', async ({ page }) => {
    await page.goto(PROGRAM);
    await page.getByRole('button', { name: 'Remarks' }).click();
    await expect(page.getByRole('link', { name: 'Hallway hour', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Panel: Finding methane leaks sooner', exact: true })).toBeHidden();

    await page.getByRole('button', { name: 'All', exact: true }).click();
    await page.getByLabel('Track').selectOption('Emissions');
    await expect(page.getByRole('link', { name: 'Panel: Finding methane leaks sooner', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Hallway hour', exact: true })).toBeHidden();

    await page.getByLabel('Track').selectOption('all');
    await page.getByLabel('Search sessions and speakers').fill('chidinma');
    await expect(page.getByRole('link', { name: 'Panel: Measuring soil carbon without digging every field', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Hallway hour', exact: true })).toBeHidden();

    // A search that matches nothing offers a way out.
    await page.getByLabel('Search sessions and speakers').fill('zzzz');
    await expect(page.getByText('No sessions match')).toBeVisible();
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByRole('link', { name: 'Hallway hour', exact: true })).toBeVisible();
  });

  test('shows every session without JavaScript', async ({ browser }) => {
    const page = await (await browser.newContext({ javaScriptEnabled: false })).newPage();
    await page.goto(PROGRAM);
    for (const title of ['Panel: Finding methane leaks sooner', 'Keynote: Hollis Wexford', 'Student lightning round']) {
      await expect(page.getByRole('link', { name: title, exact: true })).toBeVisible();
    }
    // The filters do nothing without scripting, so they are not shown.
    await expect(page.getByRole('button', { name: 'Keynotes' })).toBeHidden();
  });
});

test.describe('times', () => {
  test('are in UTC and the reader’s own zone, for the session’s own date', async ({ browser }) => {
    // The 2026 summit runs in May, when Berlin is UTC+2, not its winter UTC+1.
    const page = await (await browser.newContext({ timezoneId: 'Europe/Berlin' })).newPage();
    await page.goto(PROGRAM);
    await expect(page.locator('time[data-utc]').first()).toHaveText('17:00–17:50 · 15:00–15:50 UTC');
    await expect(page.getByText('Times are in UTC and your time (Europe/Berlin).')).toBeVisible();
  });

  test('are shown once for a reader already on UTC', async ({ browser }) => {
    const page = await (await browser.newContext({ timezoneId: 'UTC' })).newPage();
    await page.goto(PROGRAM);
    await expect(page.locator('time[data-utc]').first()).toHaveText('15:00–15:50 UTC');
  });
});

test.describe('a session page', () => {
  const SESSION = '/summits/2025/sessions/keynote-measuring-a-glacier-that-will-not-hold-still';

  test('shows when it ran, who spoke and its recording', async ({ page }) => {
    await page.goto(SESSION);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Keynote: Measuring a glacier that will not hold still');
    await expect(page.getByText('Day 2 · Wednesday, June 11, 2025')).toBeVisible();
    await expect(page.getByRole('link', { name: /Tamsin Ocampo/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Play:/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Open the video page/ })).toHaveAttribute('href', '/watch/v25-keynote-ocampo');
  });

  test('links the other sessions that day, and back to the program', async ({ page }) => {
    await page.goto(SESSION);
    await expect(page.getByRole('link', { name: /Sidewalk robots and the urban heat map/ })).toBeVisible();
    await page.getByRole('link', { name: 'Back to the program' }).click();
    await expect(page).toHaveURL(/\/summits\/2025\/program$/);
  });

  test('offers a calendar file that downloads as a calendar file', async ({ page, request }) => {
    await page.goto(SESSION);
    const href = await page.getByRole('link', { name: 'Add to calendar' }).getAttribute('href');
    expect(href).toBe(`${SESSION}.ics`);
    const res = await request.get(href!);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/calendar');
    const body = await res.text();
    expect(body).toContain('BEGIN:VEVENT');
    expect(body).toContain('DTSTART:20250611T134000Z');
  });
});
