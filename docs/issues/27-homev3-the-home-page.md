# 27 · HomeV3: the home page

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Route:** `/` · **Design:** HomeV3, PhoneV3 (Home tab)

- [x] Hero, summit card with the live edition state, and map stats from the organisations data
- [x] Get-involved tiles, latest news, and the video series
- [x] The join sheet opens a "coming soon" state until #53 ships
- [x] Phone layout per PhoneV3

**Depends on:** #25, #26

## Done

In 246a2e9, 03c6c7c, b5967dc, 77fb93e and 5b33d84.

- **Figures from the data:** the map tile and the four "places robots
  work" tabs count `organizations.json`. Sky 37, Field 36 and Water 31
  match the board. Factory is 4, not the board's 9: no rule gives 9
  from this dataset, and the board's own Factory examples belong to a
  group of 4. See `src/data/domains.ts`.
- **The summit tile** shows the edition's state from its dates at
  build time, through `editionChip`. If registration's date passes
  before M3 ships, move the date in `src/data/editions.ts`, as #3
  decided.
- **Coming soon:** the "notify me" spots (M3), the digest (#65), and
  the join sheet (#53).
- **Departures from the board,** each for #24's "blue only for things
  you can act on": "cooler planet." is dark green; the state chip and
  the Adaptation / Mitigation tags have no blue tone.
- **The news row** shows the newest video, essay and announcement,
  rather than three fixed posts.
