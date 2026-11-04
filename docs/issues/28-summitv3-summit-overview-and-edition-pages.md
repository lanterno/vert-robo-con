# 28 · SummitV3: summit overview and edition pages

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Routes:** `/summits`, `/summits/[year]` (2025, 2026, 2027) · **Design:** SummitV3

- [x] The edition state and its call to action come from `editionState()`: upcoming, open with "Register", closing soon, live, concluded. Until registration ships (#40), an open edition shows its registration date instead of a Register button
- [x] Partners by tier, the speakers' strip with the person drawer, and the recap for past editions
- [x] Phone layout

**Depends on:** #25, #26

## Done

In 8bb59e7, 6f46d2c, 3235dbf, 34f1494, 2a1d879 and 02fab9c.

- **State and call to action** come from `editionState()` through
  `editionChip`. Before #40, an open edition says when registration
  opens, with no Register button; the notify and remind spots say
  "Coming soon".
- **Edition pages** are /summits/2025, 2026 and 2027. The 2024 pilot
  appears only among past editions, as #28's route list has no page
  for it. /summits leads with the next edition and lists the rest.
- **Program summary:** past editions list their sessions day by day,
  linking to each session's page, which #29 builds. 2027 shows its
  proposed tracks until the program is published (M5).
- **Speakers** open the person drawer, which lists the sessions each
  person spoke in. The board's speaker search isn't built: #28 doesn't
  ask for it, and 24 speakers fit on one screen.
- **Partners by tier** come straight from the content layer and match
  the board's tiers.
