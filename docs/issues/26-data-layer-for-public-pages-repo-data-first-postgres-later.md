# 26 · Data layer for public pages: repo data first, Postgres later

**State:** open · **Milestone:** M1 · Public site without a database · **Labels:** backend

---

Every public page reads its content through one set of functions, so pages never change when a content type moves from the repo into Postgres.

## Scope

- [ ] Typed functions in `src/lib/content/*`, used by every public page:
  - `getEdition(year)`, `getEditions()`
  - `getProgram(year)`, `getPeople()`, `getPerson(slug)`
  - `getVideos()`, `getNews()`, `getPartners(year)`, `getSettings()`
- [ ] In M1 they read the TypeScript and JSON data files in the repo
- [ ] Add the data the V3 pages need that the repo doesn't have yet, as synthetic data files with the canvas copy (#7): the 2027 edition (Apr 20–22, 2027, registration from Dec 7, the startup pitch call from Dec 8), news posts, the "Robots in the Field" series, the white paper and the codes as Markdown, and the settings toggles. Today the data still lists 2026 as the current summit
- [ ] `editionState(edition, now)` returns one of upcoming, open, closing soon, live or concluded, and is unit-tested around every boundary and time zone. On the static site it runs at build time, and the daily rebuild in #76 keeps it current
- [ ] When a content type moves to Postgres, its functions switch to queries behind an in-process cache that every admin write clears: editions in #39, sessions and people in #61, news, videos, partners and documents in #45, organisations in #55
