# 17 · Spam and abuse protection for every public form

**State:** open · **Milestone:** M2 · Foundations · **Labels:** frontend, backend

---

## Scope

- [ ] Shared zod schemas, so the island and the server validate exactly the same rules
- [ ] ALTCHA proof-of-work (self-hosted, no third party) on every public form
- [ ] A hidden honeypot field
- [ ] Per-IP and per-address rate limits, stored in Postgres
- [ ] Origin and CSRF checks on every state-changing route
- [ ] A shared form shell island: inline errors, error summary at the top, focus moved to the first error, and a submit button that can't double-submit

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #10
