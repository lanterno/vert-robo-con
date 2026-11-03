# 24 · V3 design tokens and self-hosted fonts

**State:** open · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

Replace today's Oswald, Source Sans 3 and `#1e40af` with the V3 look.

## Scope

- [ ] Colours: blue `#0138AC`, green `#1DB46C`, and the neutrals from the boards, as Tailwind theme tokens in the existing `vrc-*` group
- [ ] Fonts: Bricolage Grotesque (display), Geist (body) and Geist Mono (labels), as self-hosted woff2 files with `font-display: swap`. No Google Fonts requests
- [ ] Rule: blue is only for things you can act on. Statuses such as "Coming soon" use grey chips
- [ ] Text contrast is at least 4.5:1, checked by axe in CI
