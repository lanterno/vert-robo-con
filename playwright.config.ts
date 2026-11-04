import { defineConfig, devices } from '@playwright/test';

/**
 * Checks for the static site (#76).
 *
 * Everything runs against the built output, not the dev server, so what CI
 * checks is what GitHub Pages serves. `astro preview` serves `dist/`, so the
 * build has to have run first; `bun run test` in CI does both.
 *
 * Every test runs twice, once at desktop width and once at phone width,
 * because the roadmap requires every page to work on a phone.
 */
const PORT = 4321;

export default defineConfig({
  testDir: './tests',
  // tests/unit is Vitest's (vitest.config.ts).
  testIgnore: ['unit/**'],
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: 0,
  reporter: process.env['CI'] ? [['github'], ['list']] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    // The pages fade and slide in over 500ms. Without this, axe samples an
    // element mid-animation and reports its blended colour as a contrast
    // failure. The site already turns the animations off under reduced
    // motion, so this settles the page through its own code path rather
    // than by injecting CSS.
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // astro preview on exactly this port; see scripts/preview-strict.mjs.
    command: `node scripts/preview-strict.mjs ${PORT}`,
    url: `http://localhost:${PORT}`,
    // Always start a fresh server. Reusing one that happened to be on the
    // port meant a run could lose its server halfway through, and fail
    // with errors that pointed at the tests rather than the cause.
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
