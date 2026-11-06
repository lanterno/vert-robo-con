import { expect, test } from '@playwright/test';

/** The organisation map and its downloads (#32). */
test.describe('the map page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/map');
  });

  test('lists every organisation, which works without the map', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'The global map' })).toBeVisible();
    await expect(page.locator('[data-org]')).toHaveCount(120);
    await expect(page.getByText('120 of 120 organizations')).toBeVisible();
  });

  test('filters by type, region, application and deployed, and clears again', async ({ page }) => {
    const visible = () => page.locator('[data-org]:not([hidden])');

    await page.getByRole('button', { name: /^Aerial/ }).click();
    await expect(visible()).toHaveCount(37);
    // The same button again clears that filter.
    await page.getByRole('button', { name: /^Aerial/ }).click();
    await expect(visible()).toHaveCount(120);

    await page.getByLabel('Region').selectOption('Oceania');
    await expect(visible()).toHaveCount(11);

    await page.getByRole('switch', { name: 'Deployed only' }).click();
    const deployed = await visible().count();
    expect(deployed).toBeGreaterThan(0);
    expect(deployed).toBeLessThan(11);

    await page.getByLabel('Search organizations').fill('zzzz');
    await expect(visible()).toHaveCount(0);
    await expect(page.getByText('No organizations match these filters.')).toBeVisible();
    await page.getByRole('button', { name: 'Clear them' }).click();
    await expect(visible()).toHaveCount(120);
  });

  test('opens an organisation from the keyboard', async ({ page }) => {
    const first = page.locator('[data-org]').first();
    const summary = first.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(first.getByText(/Robot:/)).toBeVisible();
  });

  test('shows a map once its script runs, with no console error', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto('/map');
    await expect(page.locator('.maplibregl-canvas')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('loads no third-party script', async ({ page }) => {
    const scripts: string[] = [];
    page.on('request', (r) => {
      if (r.resourceType() === 'script' && !r.url().startsWith('http://localhost')) scripts.push(r.url());
    });
    await page.goto('/map');
    await expect(page.locator('.maplibregl-canvas')).toBeVisible();
    expect(scripts).toEqual([]);
  });

  test('offers the data in three formats, with a licence and a citation', async ({ page }) => {
    const data = page.locator('#data');
    for (const [name, href] of [
      ['CSV', '/data/organizations.csv'],
      ['JSON', '/data/organizations.json'],
      ['GeoJSON', '/data/organizations.geojson'],
    ]) {
      // Exact, because "JSON" is also inside "GeoJSON".
      await expect(data.getByRole('link', { name: name!, exact: true })).toHaveAttribute('href', href!);
    }
    await expect(data.getByRole('link', { name: 'CC BY 4.0' })).toBeVisible();
    await expect(data.getByText(/Vert Robo Con Map \[Data set\]/)).toBeVisible();
  });
});

test.describe('the downloads', () => {
  test('CSV has a header and one row per organisation', async ({ request }) => {
    const res = await request.get('/data/organizations.csv');
    expect(res.status()).toBe(200);
    const body = await res.text();
    const rows = body.trimEnd().split('\r\n');
    expect(rows).toHaveLength(121);
    expect(rows[0]).toContain('id,name,website');
    // A description with a comma stays one field.
    expect(body).toContain('"A small diving robot that records temperature, oxygen and acidity');
  });

  test('GeoJSON is a FeatureCollection with longitude first', async ({ request }) => {
    const res = await request.get('/data/organizations.geojson');
    const body = JSON.parse(await res.text());
    expect(body.type).toBe('FeatureCollection');
    expect(body.licence).toBe('CC BY 4.0');
    expect(body.features.length).toBeGreaterThan(0);
    for (const f of body.features) {
      const [lon, lat] = f.geometry.coordinates;
      expect(Math.abs(lat), `${f.properties.name} latitude`).toBeLessThanOrEqual(90);
      expect(Math.abs(lon), `${f.properties.name} longitude`).toBeLessThanOrEqual(180);
    }
  });

  test('JSON keeps the address it has always had', async ({ request }) => {
    const res = await request.get('/data/organizations.json');
    expect(res.status()).toBe(200);
    const body = JSON.parse(await res.text());
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(120);
  });
});
