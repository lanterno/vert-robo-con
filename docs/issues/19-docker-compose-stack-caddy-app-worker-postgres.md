# 19 · Docker Compose stack: Caddy, app, worker, Postgres

**State:** open · **Milestone:** M2 · Foundations · **Labels:** infra

---

## Scope

- [ ] Write `deploy/compose.yml` with four services:
  - `caddy` (automatic TLS)
  - `app`
  - `worker`
  - `postgres:17` (on a volume, not exposed)
- [ ] Caddy settings:
  - security headers (HSTS, CSP, Referrer-Policy, Permissions-Policy). The CSP allows only the Cloudflare Web Analytics beacon from third parties: `static.cloudflareinsights.com` (script) and `cloudflareinsights.com` (connect), plus the map's tile hosts until #77
  - 301 redirects for the old URLs listed in #38
  - long cache headers on `/_astro/*`
  - gzip and zstd
- [ ] Secrets live in a root-only `.env` on the server. `deploy/.env.example` lists the names with placeholder values
- [ ] Deploy steps: pull image, run migrations, restart `app` and `worker`, then check `/healthz`
- [ ] Rollback restarts the previous image tag with one command

**Depends on:** #18, #10
