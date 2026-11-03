# 22 · CI/CD: checks on every PR, staging on main, production on tag

**State:** open · **Milestone:** M2 · Foundations · **Labels:** infra, testing

---

## Scope

- [ ] On every PR: typecheck, lint, unit and integration tests, Playwright, axe, and the link check. This replaces the static-site checks from #76
- [ ] On push to `main`: build and push the image to GHCR, then deploy to staging
- [ ] On a `v*` tag: deploy to production after a manual approval in a GitHub environment
- [ ] Deploy keys and server secrets are GitHub environment secrets, never written to logs
- [ ] Keep `.github/workflows/deploy.yml` (GitHub Pages) as the fallback until #72 retires it

**Depends on:** #12, #19
