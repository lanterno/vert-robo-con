# 76 · Static site: CI checks and a daily rebuild

**State:** open · **Milestone:** M1 · Public site without a database · **Labels:** infra, testing

---

The site has no checks today, and `bun astro check` stops because `@astrojs/check` isn't installed. M1 needs checks that run against the static build, before there is a server or a database.

## Scope

- [ ] Add `@astrojs/check` and `typescript` as dev dependencies, and a `check` script
- [ ] Playwright smoke tests against the built site: every route loads at desktop and phone widths
- [ ] An `@axe-core/playwright` check on every public page, at both widths
- [ ] A link check that fails on links to external forms, spreadsheets or file-sharing hosts (`docs.google`, `forms.gle`, `drive.google`, `airtable`, `typeform` and so on)
- [ ] Run all of it on every PR, and before the GitHub Pages deploy
- [ ] Rebuild and redeploy the Pages site once a day, so the edition states computed at build time (#26) stay current

## Done when

- A PR that breaks a page, an accessibility rule or the link rule fails CI

_Split from #12 on Oct 30. #12 extends these checks to the server app and adds database tests, and #22 replaces this workflow when the site moves to the server._
