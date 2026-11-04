/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Unit tests for logic that needs no browser, such as the content layer.
// Astro's Vite config, so imports like `@/lib/...` resolve as in the site.
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
  },
});
