import { expect, test } from '@playwright/test';
import { gradientContrastFailures } from './gradient-contrast';

/**
 * The gradient check decides pass or fail on its own, so it gets its own
 * tests: fixed pages where the right answer is known, including the cases it
 * must not flag.
 */
const page = (body: string) =>
  `<!doctype html><html><body style="margin:0;font:16px/1.4 sans-serif">${body}</body></html>`;

test.describe('gradient contrast', () => {
  test('fails white text on a light gradient', async ({ page: p }) => {
    await p.setContent(
      page(`<div style="background:linear-gradient(to right,#10b981,#16a34a);padding:20px">
        <span id="t" style="color:#fff">Soil Carbon</span></div>`),
    );
    const failures = await gradientContrastFailures(p, ['#t']);
    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('needs 4.5:1');
  });

  test('passes white text on a dark gradient', async ({ page: p }) => {
    await p.setContent(
      page(`<div style="background:linear-gradient(to right,#047857,#166534);padding:20px">
        <span id="t" style="color:#fff">Soil Carbon</span></div>`),
    );
    expect(await gradientContrastFailures(p, ['#t'])).toEqual([]);
  });

  test('judges text by the part of the gradient it sits on', async ({ page: p }) => {
    // Navy on the left fading to white on the right, 1000px wide.
    await p.setContent(
      page(`<div style="position:relative;width:1000px;height:100px;background:linear-gradient(to right,#0a1222,#ffffff)">
        <span id="dark" style="position:absolute;left:20px;top:40px;color:#fff">On navy</span>
        <span id="light" style="position:absolute;right:20px;top:40px;color:#fff">On white</span></div>`),
    );
    expect(await gradientContrastFailures(p, ['#dark'])).toEqual([]);
    expect(await gradientContrastFailures(p, ['#light'])).toHaveLength(1);
  });

  test('places a corner gradient by the box shape, as CSS does', async ({ page: p }) => {
    // CSS angles "to bottom right" so that the other two corners, top right
    // and bottom left, both sit on the 50% line. Navy turns to white between
    // 40% and 60%. So text in the top-left corner is on navy, and text in the
    // bottom-left corner is mid-change. A fixed 135deg would wrongly put the
    // bottom-left text near the start, on navy, in this wide box.
    await p.setContent(
      page(`<div style="position:relative;width:1200px;height:200px;background:linear-gradient(to bottom right,#0a1222 0%,#0a1222 40%,#ffffff 60%,#ffffff 100%)">
        <span id="tl" style="position:absolute;left:20px;top:10px;color:#fff">Top left</span>
        <span id="bl" style="position:absolute;left:20px;bottom:10px;color:#fff">Bottom left</span></div>`),
    );
    expect(await gradientContrastFailures(p, ['#tl'])).toEqual([]);
    expect(await gradientContrastFailures(p, ['#bl'])).toHaveLength(1);
  });

  test('counts a translucent layer at its opacity', async ({ page: p }) => {
    // A bright glow at 25% opacity barely lifts the navy beneath it.
    await p.setContent(
      page(`<div style="position:relative;background:#0a1222;padding:20px">
        <div style="position:absolute;inset:0;opacity:.25;background:radial-gradient(circle,#16a34a,transparent)"></div>
        <span id="t" style="position:relative;color:#7fd6a8">On navy</span></div>`),
    );
    expect(await gradientContrastFailures(p, ['#t'])).toEqual([]);
  });

  test('fails gradient-filled text that fades into its background', async ({ page: p }) => {
    await p.setContent(
      page(`<div style="background:#fff;padding:20px">
        <span id="t" style="font-size:16px;background:linear-gradient(to right,#1db46c,#5eead4);-webkit-background-clip:text;background-clip:text;color:transparent">Cooler Planet</span></div>`),
    );
    expect(await gradientContrastFailures(p, ['#t'])).toHaveLength(1);
  });

  test('skips text over an image, whose colours it cannot know', async ({ page: p }) => {
    await p.setContent(
      page(`<div style="position:relative;width:400px;height:100px">
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" style="position:absolute;inset:0;width:100%;height:100%">
        <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(10,18,34,.8),transparent)"></div>
        <span id="t" style="position:absolute;right:10px;top:40px;color:#fff">Over the image</span></div>`),
    );
    expect(await gradientContrastFailures(p, ['#t'])).toEqual([]);
  });
});
