# 39 · AdminEditionV3: editions, dates and registration window

**State:** open · **Milestone:** M3 · Registration and the admin core · **Labels:** frontend, backend

---

**Design:** AdminEditionV3

- [ ] Backend: an edition record with dates, time zone, daily window, format (online), price (free), capacity (none) and the registration window. Validation keeps the dates in order
- [ ] Backend: seed the 2027 edition: April 20–22, 2027, online, free, registration from Dec 7 (#3). Nothing about edition dates is hard-coded: the dates, daily window and registration window live here and are edited in the admin
- [ ] This is the first content in Postgres: `getEdition()` and `getEditions()` (#26) switch from the repo data to queries, behind the cache
- [ ] Frontend: the edition list and editor, with a timeline preview of the states and a diff before saving
- [ ] Every save clears the content cache and is audited

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #13, #26

---

**Comment — lanterno, 2026-10-28**

**Requirement from #3:** nothing about edition dates may be hard-coded. The edition's dates, daily window and registration window live in the database and are edited here. `editionState()` (#26) reads them. The 2027 seed (Apr 20–22, registration from Dec 7) only supplies the starting values.
