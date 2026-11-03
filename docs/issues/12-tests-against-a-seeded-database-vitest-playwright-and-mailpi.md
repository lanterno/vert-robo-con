# 12 · Tests against a seeded database: Vitest, Playwright and Mailpit

**State:** open · **Milestone:** M2 · Foundations · **Labels:** testing

---

## Scope

- [ ] Vitest for unit tests, and integration tests against a real Postgres
- [ ] Playwright end-to-end tests against the built app with a seeded database and a local mail catcher (Mailpit), so tests can open magic links
- [ ] Run the axe and link checks from #76 against the server app as well as the static pages

## Rules for test data

- Fixtures are synthetic: fictional people from `summits-data.ts`, `@example.org` addresses
- 2FA secrets and recovery codes for test admins are generated at test time and never printed, logged or committed

**Depends on:** #11, #76
