# 26 · Data layer for public pages: repo data first, Postgres later

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** backend

---

Every public page reads its content through one set of functions, so pages never change when a content type moves from the repo into Postgres.

## Scope

- [x] Typed functions in `src/lib/content/*`, used by every public page:
  - `getEdition(year)`, `getEditions()`
  - `getProgram(year)`, `getPeople()`, `getPerson(slug)`
  - `getVideos()`, `getNews()`, `getPartners(year)`, `getSettings()`
- [x] In M1 they read the TypeScript and JSON data files in the repo
- [x] Add the data the V3 pages need that the repo doesn't have yet, as synthetic data files with the canvas copy (#7): the 2027 edition (Apr 20–22, 2027, registration from Dec 7, the startup pitch call from Dec 8), news posts, the "Robots in the Field" series, the white paper and the codes as Markdown, and the settings toggles. Today the data still lists 2026 as the current summit
- [x] `editionState(edition, now)` returns one of upcoming, open, closing soon, live or concluded, and is unit-tested around every boundary and time zone. On the static site it runs at build time, and the daily rebuild in #76 keeps it current
- [ ] When a content type moves to Postgres, its functions switch to queries behind an in-process cache that every admin write clears: editions in #39, sessions and people in #61, news, videos, partners and documents in #45, organisations in #55

## Done

In 504c9ae, a4e9ad8, 93d3a35 and 38afe74, with the board images in
f86a5c6 and bf3e768.

- **The functions** are in `src/lib/content/`, behind one import
  (`@/lib/content`), with the shapes in `types.ts`. They also offer
  `getCurrentEdition`, `getSpeakers`, `getVideo`, `getNewsPost`,
  `editionTimeline`, `liveDay`, `isRegistrationOpen` and UTC date
  formatting.
- **Six states, not five.** The boards (AdminEditionV3, RegisterV3)
  add `closed`, for when registration ends before the summit, and #40
  needs it. The boundaries follow AdminEditionV3's timeline exactly.
- **Tests** are Vitest, in `tests/unit/`: every boundary a millisecond
  either side, in six time zones, and integrity checks on the content.
- **Data added here:** the 2024–2027 editions, the news posts, and the
  settings switches. 2027's registration and startup call open at
  00:00 UTC on Dec 7 and 8; no time of day was decided, so an admin
  sets it in #39.
- **Data added with the page that shows it,** so each file arrives
  with a page that proves it renders: the white paper and the codes as
  Markdown with #31, the "Robots in the Field" series with #30, and the
  advisors, authors, bios and links from PeopleV3 with #33. Each of
  those issues now lists it.
- **Postgres** stays open: the switch happens in #39, #61, #45 and #55.
