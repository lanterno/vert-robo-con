# 24 · V3 design tokens and self-hosted fonts

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

Replace today's Oswald, Source Sans 3 and `#1e40af` with the V3 look.

## Scope

- [x] Colours: blue `#0138AC`, green `#1DB46C`, and the neutrals from the boards, as Tailwind theme tokens in the existing `vrc-*` group
- [x] Fonts: Bricolage Grotesque (display), Geist (body) and Geist Mono (labels), as self-hosted woff2 files with `font-display: swap`. No Google Fonts requests
- [x] Rule: blue is only for things you can act on. Statuses such as "Coming soon" use grey chips
- [x] Text contrast is at least 4.5:1, checked by axe in CI

## Done

In 9573981, 5b6352e, 4b38643, 6f728b2 and a5f5755.

- **Colours:** taken from the boards, whose scripts share named tones
  (a chip is background, text and dot). Every text pair in the token
  notes meets 4.5:1. The boards never put white text on the bright
  green (2.7:1); they use it for dots and icons, and the tokens say so.
- **Fonts:** Fontsource packages under the OFL, bundled into `dist/`.
  Checked in a browser: headings render in Bricolage Grotesque and body
  text in Geist, and loading the home page contacts only the site's own
  host and fetches two woff2 files.
- **Blue only for actions:** written into the token notes, with the
  grey chip (`ink-2` on `surface`) for statuses. Today's pages still use
  blue for some eyebrow labels, the wordmark and a "Keynote" badge;
  those pages are rebuilt from the boards in #27–#37, and the chips
  themselves are built in #25, so they weren't restyled here.
- **Contrast in CI:** axe leaves text on gradients unchecked, which hid
  about 50 failures on today's pages. `tests/gradient-contrast.ts` now
  checks them, and the failures are fixed.
