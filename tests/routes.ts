/**
 * Every page the static site builds. Add a route here when you add a page and
 * the smoke, accessibility and link checks all pick it up.
 */
export const ROUTES = [
  '/',
  '/consulting',
  '/research',
  '/summits',
  '/summits/2025',
  '/summits/2026',
  '/summits/2027',
  '/watch',
  '/map',
  '/slack',
  // The shared components gallery (#25).
  '/components',
] as const;

/**
 * The 404 page is built as `dist/404.html` rather than a directory, so it is
 * reached by asking for a path that does not exist. GitHub Pages serves it
 * with a 404 status; `astro preview` serves it the same way.
 */
export const NOT_FOUND_PATH = '/this-page-does-not-exist';
