# 29 · ProgramV3: program pages for past editions

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Routes:** `/summits/[year]/program`, `/summits/[year]/sessions/[slug]` · **Design:** ProgramV3

- [x] A day-by-day schedule with track and topic filters. Times show in the visitor's time zone, with UTC alongside
- [x] An `.ics` file per session
- [x] Session pages with speakers and the recording, if there is one
- [x] Phone layout

The 2027 features (saved agenda, calendar feed, join links) come in #62.

**Depends on:** #25, #26

## Done

In fa61f71, e1522fa, 42580e8, 3c15071 and a5bf5fa.

- **The sessions came from the board.** `src/data/program.ts` was
  extracted from ProgramV3 rather than retyped, so the copy is exact.
  Its times and recording lengths match what the repo already had; the
  tracks, abstracts and sentence-case titles are new. Session kinds are
  now the four ProgramV3 filters by.
- **Times** are written in UTC and the reader's own time is added
  beside them, converted from each session's own instant: a May
  session reads UTC+2 in Berlin, not today's UTC+1. A reader already
  on UTC sees one time. The board's UTC/local and 12h/24h toggles
  aren't built: the page shows both at once, which is what #29 asks
  for and needs no control.
- **Filters** work on a page that already holds every session, so the
  whole program is there without JavaScript and the filters hide
  themselves until the script runs.
- **Sessions are pages,** at `/summits/[year]/sessions/[slug]`, as
  #29's routes say, rather than the board's drawer. The summit pages
  and the person drawer already linked there.
- **Calendar files** are at the same path with `.ics`. Stable across
  downloads, so a re-download isn't a new event.
- **Waiting for #62:** starred sessions, the personal agenda, the
  calendar feed, join links and the Now/Next strip, all 2027 features.
