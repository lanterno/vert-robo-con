import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

/**
 * "Everything happens on the site": no page may send people to an outside
 * form, spreadsheet or file-sharing host. Parts that aren't built yet show
 * their state, such as "Coming soon", instead of linking out.
 *
 * This is the check that keeps that principle true as pages are rebuilt in
 * M1. When a feature lands on the site, its outside link should already be
 * gone; if one is added, this fails.
 */
const BANNED_HOSTS = [
  'docs.google.com',
  'forms.gle',
  'drive.google.com',
  'sheets.google.com',
  'airtable.com',
  'typeform.com',
  'jotform.com',
  'surveymonkey.com',
  'wufoo.com',
  'dropbox.com',
  'wetransfer.com',
  'box.com',
  'onedrive.live.com',
  'sharepoint.com',
  'eventbrite.com',
];

/** Matches a banned host, and any subdomain of it. */
function bannedHostFor(url: string): string | null {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return null; // relative or non-http link, not our concern here
  }
  return BANNED_HOSTS.find((b) => host === b || host.endsWith(`.${b}`)) ?? null;
}

for (const route of ROUTES) {
  test(`${route} links to no outside forms or file hosts`, async ({ page }) => {
    await page.goto(route);

    const hrefs = await page.locator('a[href]').evaluateAll((as) =>
      as.map((a) => (a as HTMLAnchorElement).href),
    );

    const offenders = hrefs
      .map((href) => ({ href, banned: bannedHostFor(href) }))
      .filter((h) => h.banned !== null)
      .map((h) => `${h.banned} → ${h.href}`);

    expect(offenders, `${route} links to an outside form or file host`).toEqual([]);
  });
}
