# 1 · Decide: approve the target architecture (one TypeScript app on one server)

**State:** closed · **Milestone:** M0 · Decisions · **Labels:** decision

---

> **Approved for now (Oct 29).** Since then: the email provider is server configuration chosen at server setup (#15, #18), analytics is Cloudflare Web Analytics (#8, #38), and the map keeps a hosted tile service until the site runs on our server (#77). The current description is [`ARCHITECTURE.md`](../../ARCHITECTURE.md).

Rethought from scratch on Oct 27, 2026. This replaces both the Payload plan in `docs/ROADMAP.md` and the Django proposal. Every other issue in this repo assumes it.

## The shape

- **One codebase, one language: TypeScript.** Astro 5 in server mode (`@astrojs/node`) serves the public site, My VRC (`/me`), the admin (`/admin`) and the JSON endpoints. Today's site is already Astro and TypeScript, so its pages and data carry over.
- **One worker process** from the same codebase runs background jobs with pg-boss on Postgres: emails, geocoding, expiry, retention, Slack-link checks, digests.
- **One database:** Postgres 17, schema and migrations in Drizzle.
- **Auth with better-auth (MIT):**
  - Admins are invite-only and sign in with a password plus required 2FA (passkey or authenticator app) and recovery codes.
  - Visitors only ever get email magic links, never passwords.
- **No rebuilds.** Pages read Postgres on request through a small in-process cache that every admin write clears. The edition state (upcoming → open → closing soon → live → concluded) is computed from its dates on each request, so nothing has to be scheduled.
- **Islands only where needed.** Forms, the map, admin tables and the program builder are React islands built on React Aria Components; everything else is server-rendered HTML.
- **Email:** one mailer over SMTP, Amazon SES by default and swappable. Topics, double opt-in, digests and unsubscribe live in the app.
- **Map:** MapLibre GL with a self-hosted PMTiles basemap. No third-party script or tile hosts.
- **Hosting:**
  - A Hetzner server running Docker Compose with `caddy`, `app`, `worker` and `postgres`, plus a small staging server.
  - restic backups go to a Storage Box, and Uptime Kuma runs at another provider.
- **Tests:** Vitest, Playwright end-to-end tests on a seeded database, and axe accessibility checks. All fixtures are synthetic.

## Why this over the earlier plans

- **Compared with Payload + listmonk + authentik + tailnet:**
  - Four fewer services to run, patch and back up, and one sign-in model.
  - The AdminV3 boards are custom designs, so a CMS admin would have to be bent to match them.
- **Compared with Django:** the same one-app simplicity without a second language, and today's Astro pages carry over.
- **The cost:** more code we own (queue use, topic emails, admin screens). Libraries cover the risky parts (auth, jobs, maps), and CI tests plus a runbook keep it maintainable.

## Risks

- **The app is a single point of failure for public pages.** If it is down, so are they. Mitigations: uptime alerts, one-command rollback to the previous image, and a nightly static snapshot Caddy can serve (#20).
- **better-auth is younger than Django's auth.** That is why an outside review of the auth code is a launch gate (#49).

## Done when

- [x] The owner approves this or names changes
- [x] `ARCHITECTURE.md` and `docs/ROADMAP.md` are rewritten to match (#9)

---

**Comment — lanterno, 2026-10-28**

**Decision (Oct 29):** approved for now. One TypeScript app with Postgres, no CMS. #9 updates the docs to match.
