import type { Page } from '@playwright/test';

/**
 * axe can't work out the background behind text that sits on a gradient, so it
 * files those elements under "incomplete" and never fails them. Today's pages
 * put a lot of text on gradients, which left it unchecked (#24).
 *
 * This checks those elements itself. It looks at what is actually painted under
 * the middle of the text, layer by layer, the way axe does for solid colours.
 * For a linear gradient it projects the text's box onto the gradient line, as
 * CSS lays the gradient out, and checks every colour across that span; for a
 * radial gradient it takes the worst of all its stops. Translucent layers, and
 * layers with `opacity`, are blended over the layers beneath them.
 * Gradient-filled text (`bg-clip-text`) checks its own colours across the
 * text against every colour behind it. Large text (24px, or 18.66px bold)
 * needs 3:1 and everything else 4.5:1, as in WCAG 1.4.3.
 *
 * If an image, video or inline SVG is beneath the text, the backdrop can't be
 * known, and the element is skipped, as axe skips it.
 *
 * The V3 boards use no gradients, so this matters less as pages are rebuilt,
 * but it keeps a gradient added later from going unchecked.
 */
export async function gradientContrastFailures(page: Page, selectors: string[]): Promise<string[]> {
  const failures: string[] = [];
  for (const sel of selectors) {
    // Only on-screen elements can be stacked by elementsFromPoint.
    const handle = page.locator(sel).first();
    if ((await handle.count()) === 0) continue;
    await handle.scrollIntoViewIfNeeded().catch(() => {});

    const failure = await handle.evaluate((el) => {
      type RGBA = [number, number, number, number];
      const IMAGE_TAGS = new Set(['img', 'picture', 'video', 'canvas', 'svg', 'iframe']);

      const parse = (c: string): RGBA | null => {
        const m = c.match(/rgba?\(([^)]+)\)/);
        if (!m?.[1]) return null;
        const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
        return [p[0] ?? 0, p[1] ?? 0, p[2] ?? 0, p[3] ?? 1];
      };
      const over = (top: RGBA, under: RGBA): RGBA => {
        const a = top[3];
        return [
          top[0] * a + under[0] * (1 - a),
          top[1] * a + under[1] * (1 - a),
          top[2] * a + under[2] * (1 - a),
          1,
        ];
      };
      const lum = ([r, g, b]: RGBA) => {
        const f = (v: number) => {
          const s = v / 255;
          return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const ratio = (a: RGBA, b: RGBA) => {
        const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x) as [number, number];
        return (hi + 0.05) / (lo + 0.05);
      };
      const allStops = (bgImage: string): RGBA[] =>
        (bgImage.match(/rgba?\([^)]+\)/g) ?? []).map(parse).filter((c): c is RGBA => c !== null);

      /** Mix two colours in premultiplied alpha, as CSS gradients do. */
      const mix = (a: RGBA, b: RGBA, t: number): RGBA => {
        const pa = [a[0] * a[3], a[1] * a[3], a[2] * a[3]];
        const pb = [b[0] * b[3], b[1] * b[3], b[2] * b[3]];
        const alpha = a[3] + (b[3] - a[3]) * t;
        if (alpha === 0) return [0, 0, 0, 0];
        const ch = (i: number) => (pa[i]! + (pb[i]! - pa[i]!) * t) / alpha;
        return [ch(0), ch(1), ch(2), alpha];
      };

      /**
       * The colours a gradient paints under `text`. For a linear gradient,
       * the text's corners are projected onto the gradient line to find the
       * span it covers, and the colours at both ends of the span and at every
       * stop inside it are returned. Anything else falls back to every stop.
       */
      const gradientUnder = (host: Element, bgImage: string, text: DOMRect): RGBA[] => {
        const first = bgImage.match(/^linear-gradient\((.*)\)$/);
        // Only a single linear gradient can be placed; layered or radial ones
        // are judged on all their stops.
        if (!first?.[1] || bgImage.includes('gradient(', 'linear-gradient('.length)) return allStops(bgImage);

        const box = host.getBoundingClientRect();
        const W = box.width;
        const H = box.height;
        const args = first[1].split(/,(?![^(]*\))/).map((a) => a.trim());

        // The direction, as a CSS angle: 0deg points up, clockwise.
        let angle = 180;
        const head = args[0] ?? '';
        if (/deg$/.test(head)) {
          angle = parseFloat(head);
          args.shift();
        } else if (head.startsWith('to ')) {
          const side = head.slice(3).split(/\s+/);
          const right = side.includes('right');
          const left = side.includes('left');
          const top = side.includes('top');
          const bottom = side.includes('bottom');
          const corner = (Math.atan(H / W) * 180) / Math.PI;
          if ((top || bottom) && (left || right)) {
            // Perpendicular to the diagonal through the two other corners.
            angle = bottom ? (right ? 180 - corner : 180 + corner) : right ? corner : 360 - corner;
          } else angle = top ? 0 : right ? 90 : bottom ? 180 : 270;
          args.shift();
        }

        // Stops with their positions; missing positions are spread evenly.
        const stops = args.map((a) => {
          const c = parse(a);
          const pos = a.match(/\)\s+(-?[\d.]+)%/);
          return { c, at: pos?.[1] ? Number(pos[1]) / 100 : NaN };
        }).filter((x): x is { c: RGBA; at: number } => x.c !== null);
        if (stops.length === 0) return [];
        if (Number.isNaN(stops[0]!.at)) stops[0]!.at = 0;
        if (Number.isNaN(stops[stops.length - 1]!.at)) stops[stops.length - 1]!.at = 1;
        for (let i = 1; i < stops.length - 1; i++) {
          if (!Number.isNaN(stops[i]!.at)) continue;
          let j = i;
          while (Number.isNaN(stops[j]!.at)) j++;
          const from = stops[i - 1]!.at;
          const step = (stops[j]!.at - from) / (j - i + 1);
          for (let k = i; k < j; k++) stops[k]!.at = from + step * (k - i + 1);
        }

        const colourAt = (t: number): RGBA => {
          if (t <= stops[0]!.at) return stops[0]!.c;
          for (let i = 1; i < stops.length; i++) {
            const a = stops[i - 1]!;
            const b = stops[i]!;
            if (t <= b.at) return mix(a.c, b.c, b.at === a.at ? 1 : (t - a.at) / (b.at - a.at));
          }
          return stops[stops.length - 1]!.c;
        };

        // Where the text's corners fall along the gradient line.
        const rad = (angle * Math.PI) / 180;
        const dx = Math.sin(rad);
        const dy = -Math.cos(rad);
        const length = Math.abs(W * dx) + Math.abs(H * dy);
        const cx = box.left + W / 2;
        const cy = box.top + H / 2;
        const ts = [
          [text.left, text.top],
          [text.right, text.top],
          [text.left, text.bottom],
          [text.right, text.bottom],
        ].map(([x, y]) => 0.5 + ((x! - cx) * dx + (y! - cy) * dy) / length);
        const t0 = Math.max(0, Math.min(...ts));
        const t1 = Math.min(1, Math.max(...ts));

        return [colourAt(t0), colourAt(t1), ...stops.filter((x) => x.at > t0 && x.at < t1).map((x) => x.c)];
      };

      /** Blend `colours` over each colour in `below`. */
      const blendOver = (colours: RGBA[], below: RGBA[]): RGBA[] =>
        colours.flatMap((c) => (c[3] < 1 ? below.map((b) => over(c, b)) : [c]));

      /**
       * Every colour that can show through at this point, from layer `k` down.
       * Null when an image is in the way and the colour can't be known.
       */
      const coloursFrom = (stack: Element[], k: number): RGBA[] | null => {
        for (let j = k; j < stack.length; j++) {
          const e = stack[j]!;
          if (IMAGE_TAGS.has(e.tagName.toLowerCase())) return null;
          const cs = getComputedStyle(e);
          if (cs.backgroundImage.includes('url(')) return null;
          // A layer drawn at partial opacity lets that much more show through.
          const opacity = Number(cs.opacity);
          const fade = (c: RGBA): RGBA => [c[0], c[1], c[2], c[3] * opacity];
          const bgRaw = parse(cs.backgroundColor);
          const bg = bgRaw && fade(bgRaw);
          const below = () => (bg && bg[3] === 1 ? [bg] : coloursFrom(stack, j + 1));

          if (cs.backgroundImage.includes('gradient') && !isClipText(cs)) {
            const stops = gradientUnder(e, cs.backgroundImage, textBox).map(fade);
            if (stops.every((s) => s[3] === 1)) return stops;
            const under = below();
            return under && blendOver(stops, under);
          }
          if (bg && bg[3] > 0) {
            if (bg[3] === 1) return [bg];
            const under = coloursFrom(stack, j + 1);
            return under && blendOver([bg], under);
          }
        }
        return [[255, 255, 255, 1]];
      };

      const textBox = el.getBoundingClientRect();

      function isClipText(cs: CSSStyleDeclaration) {
        return [cs.backgroundClip, cs.getPropertyValue('-webkit-background-clip')].includes('text');
      }

      const stack = document.elementsFromPoint(
        textBox.left + textBox.width / 2,
        textBox.top + textBox.height / 2,
      );
      let i = stack.indexOf(el);
      if (i < 0) i = stack.findIndex((e) => e.contains(el) || el.contains(e));
      if (i < 0) return null;

      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize);
      const bold = Number(cs.fontWeight) >= 700;
      const needed = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;

      let worst: number;
      if (isClipText(cs) && cs.backgroundImage.includes('gradient')) {
        const behind = coloursFrom(stack, i + 1);
        if (!behind) return null;
        const textStops = blendOver(gradientUnder(el, cs.backgroundImage, textBox), behind);
        worst = Math.min(...textStops.flatMap((t) => behind.map((b) => ratio(t, b))));
      } else {
        const behind = coloursFrom(stack, i);
        const fg = parse(cs.color);
        if (!behind || !fg) return null;
        worst = Math.min(...behind.map((b) => ratio(fg[3] < 1 ? over(fg, b) : fg, b)));
      }
      if (worst >= needed) return null;

      const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 40);
      return `${worst.toFixed(2)}:1, needs ${needed}:1 — "${text}"`;
    });

    if (failure) failures.push(`${failure} (${sel})`);
  }
  return failures;
}
