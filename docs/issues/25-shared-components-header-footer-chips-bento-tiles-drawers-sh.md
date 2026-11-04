# 25 · Shared components: header, footer, chips, bento tiles, drawers, sheets, phone tab bar

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

Build these once, matching the V3 boards.

## Scope

- [x] Header with the Community and About menus, keyboard-operable, and the footer
- [x] Buttons and status chips
- [x] Bento tiles
- [x] The person drawer (PeopleV3, SummitV3)
- [x] A sheet or dialog shell: Esc closes it, focus is trapped inside and returned to the opener afterwards. Bottom sheet on phones
- [x] The phone tab bar from PhoneV3
- [x] A video facade: a thumbnail until clicked, then a privacy-friendly embed

**Design:** HomeV3, PeopleV3, PhoneV3

**Depends on:** #24

## Done

In 8b69295, c8da68a, 3920c3f, 2c8d58b, fd17c2f, 99b0a38, 3be1b2a and
3681325. Building blocks are in `src/components/ui/`, the page chrome
in `src/components/site/`, and `SiteLayout` puts them together. Every
link comes from `src/lib/site-nav.ts`. `/components` shows them all,
and `tests/components.spec.ts` drives them at both widths.

- **Menus** are disclosure buttons over lists of links, not ARIA menus,
  because the items are plain links that Tab should reach.
- **Sheet** is a native `<dialog>`. A modal dialog lets Tab leave for
  the browser's own controls, which the tests caught, so the sheet
  wraps focus itself.
- **Chips** have no blue tone, per #24. The boards' blue "Registration
  opens" chip is neutral.
- **Later milestones:** the join sheet says joining is coming (#53),
  the digest shows "Coming soon" (#65), and My VRC appears as text with
  a chip, not a link, until M3.
- **Video facade:** no demo video has a recording, so play shows a
  placeholder; a video with an id plays in youtube-nocookie.com.
- **Not yet linked:** the new navigation points to the routes the page
  issues define (#27–#37), most of which don't exist yet. Today's pages
  keep the old layout until rebuilt, so nothing public links to a
  missing page. A check that every internal link resolves belongs with
  #38, once the pages are in.
