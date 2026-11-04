import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { gradientContrastFailures } from './gradient-contrast';
import { ROUTES } from './routes';

/**
 * axe on every public page, at desktop and phone widths.
 *
 * Scoped to WCAG 2.1 A and AA, which is what the roadmap's "passes the
 * automated accessibility checks" means. Colour contrast is included, so the
 * 4.5:1 rule in #24 is enforced here.
 */
for (const route of ROUTES) {
  test(`${route} has no accessibility violations`, async ({ page }) => {
    await page.goto(route);

    const { violations, incomplete } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Name the rule and a sample element, so a failure says what to fix.
    const summary = violations.map(
      (v) => `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes[0]?.target.join(' ')}`,
    );
    expect(summary, `${route} has accessibility violations`).toEqual([]);

    // Text on a gradient is the one contrast case axe leaves unchecked.
    const onGradient = incomplete
      .filter((v) => v.id === 'color-contrast')
      .flatMap((v) => v.nodes)
      .filter((n) => n.any.some((c) => /gradient/i.test(c.message)))
      .map((n) => n.target.join(' '));
    const gradientFailures = await gradientContrastFailures(page, onGradient);
    expect(gradientFailures, `${route} has text below contrast on a gradient`).toEqual([]);
  });
}
