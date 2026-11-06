# 36 · JobsV3: layout and internship tracks

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Route:** `/jobs` · **Design:** JobsV3

- [x] The page layout with an empty state ("No open roles right now")
- [x] Internship tracks with their status from settings in the repo data (#26), then from AdminSettingsV3 once #46 ships
- [x] Listings, filters and "Post a job" come in #57
- [x] Phone layout

**Depends on:** #25, #26

## Done

In 713ca1e, f0f53b3, fde3309 and 111fe37.

- **The jobs section is the board's empty state,** since listings,
  filters and "Post a job" come in #57. Job alerts wait for #65.
- **The four internship tracks** carry the status from the settings:
  three open and one coming soon today. Applying opens in #58.
- The track content lives in `src/data/internships.ts`; only the
  status is a setting, because only the status is what #46 changes.
