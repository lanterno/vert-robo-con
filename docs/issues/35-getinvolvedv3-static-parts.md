# 35 · GetInvolvedV3: static parts

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Route:** `/get-involved` · **Design:** GetInvolvedV3

- [x] Who it's for, sponsor tiers, FAQ, and the community projects
- [x] Project and programme status chips (Field Skills Course, Schools Programme, research team open) come from settings in the repo data (#26), then from AdminSettingsV3 once #46 ships
- [x] The pitch call and smaller forms show their state from the edition and settings, and link to the forms when #51 and #59 ship
- [x] Phone layout

**Depends on:** #25, #26

## Done

In 713ca1e, f0f53b3, fde3309 and 111fe37.

- **Status from settings:** the Schools kit and the Learning hub take
  their status from `src/data/settings.ts`, as an admin will set it in
  #46. What each project is lives in `src/data/involvement.ts`.
- **Pitch calls** show their state from the edition's dates: the
  startup call opens Dec 8, 2026, and the research call has no dates
  yet, so it says so.
- **No forms yet.** Pitching opens in #51, the smaller forms in #59,
  and "Propose a project" is tracked in the roadmap for M7. Each shows
  "Coming soon" rather than linking to an outside tool, and a test
  asserts nothing on the page leaves the site.
- **Tier names** stay "[TIER 1]" and the decision date "[DATE]", the
  canvas's placeholders, since no real names were decided (#7).
