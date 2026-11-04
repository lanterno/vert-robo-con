# 76 · Static site: CI checks and a daily rebuild

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** infra, testing

---

The site has no checks today, and `bun astro check` stops because `@astrojs/check` isn't installed. M1 needs checks that run against the static build, before there is a server or a database.

## Scope

- [x] Add `@astrojs/check` and `typescript` as dev dependencies, and a `check` script
- [x] Playwright smoke tests against the built site: every route loads at desktop and phone widths
- [x] An `@axe-core/playwright` check on every public page, at both widths
- [x] A link check that fails on links to external forms, spreadsheets or file-sharing hosts (`docs.google`, `forms.gle`, `drive.google`, `airtable`, `typeform` and so on)
- [x] Run all of it on every PR, and before the GitHub Pages deploy
- [x] Rebuild and redeploy the Pages site once a day, so the edition states computed at build time (#26) stay current

## Done when

- A PR that breaks a page, an accessibility rule or the link rule fails CI

Done in b8f13cf, 8b80e82, 98daf03, f121c84, f953a90 and 59a3a09.
Verified by hand: adding a `forms.gle` link fails the link check, and
putting white text back on the bright green fails the accessibility
check. 52 tests pass across 8 routes at two widths.

Two things turned up on the way and were fixed first, because the new
checks would otherwise have been red from the first run: `astro check`
reported 115 errors on today's pages, and axe found contrast and
labelling violations on all 8 of them.

TypeScript is pinned to 6.x. `astro check` needs a programmatic API
that the native 7.0 compiler doesn't ship yet.

_Split from #12 on Oct 30. #12 extends these checks to the server app and adds database tests, and #22 replaces this workflow when the site moves to the server._
