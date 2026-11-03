# 11 · Add Postgres with Drizzle: base schema, migrations and synthetic seed

**State:** open · **Milestone:** M2 · Foundations · **Labels:** backend

---

## Scope

- [ ] Add Drizzle ORM and drizzle-kit, with a `migrate` command that runs on deploy before the app starts
- [ ] Base tables: `editions`, `settings` (a typed key-value store) and `audit_events`. Content stays in the repo data files (#26) and moves into Postgres with the issues that need it: sessions and people in #61; news, videos, partners and documents in #45; organisations in #55
- [ ] A seed script that loads the editions from the repo data. The data is all synthetic, and the seed is idempotent
- [ ] Local Postgres 17 in `compose.dev.yml`

## Done when

- `bun run db:reset` gives a fresh, seeded database
- Tests run against a throwaway database per run

**Depends on:** #10
