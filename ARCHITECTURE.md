# Architecture

How the Vert Robo Con (VRC) site works today, and the target architecture approved in [#1](docs/issues/01-decide-approve-the-target-architecture-one-typescript-app-on.md) on Oct 29, 2026. VRC is a fictional community; see "Demo content" in the [README](README.md). [`docs/ROADMAP.md`](docs/ROADMAP.md) has the plan for getting from one to the other, and [`docs/COMPLIANCE.md`](docs/COMPLIANCE.md) what it has to satisfy about personal data and access.

## Today

A static Astro 5 site with no server or database.

| Part | What it is |
| --- | --- |
| Build | Astro 5 with `output: 'static'`, built with Bun. 115 pages, all rendered at build time |
| Checks | `astro check`, plus Playwright smoke, axe accessibility and outside-link checks against the built site, at desktop and phone widths. Run on every PR and before each deploy ([#76](docs/issues/76-static-site-ci-checks-and-a-daily-rebuild.md)) |
| Hosting | GitHub Pages on a preview domain. `.github/workflows/deploy.yml` runs the checks and `bun run build` on every push to `main`, and once a day |
| Analytics | Cloudflare Web Analytics, with its token from `CF_ANALYTICS_TOKEN` in the build's environment. Without one the beacon isn't added ([#8](docs/issues/08-decide-analytics-at-launch-none-or-self-hosted-and-cookie-fr.md), [#38](docs/issues/38-redirects-from-old-urls-404-sitemap-social-cards-and-analyti.md)) |
| Content | TypeScript and JSON in the repo, read through the content layer in `src/lib/content/` ([#26](docs/issues/26-data-layer-for-public-pages-repo-data-first-postgres-later.md)). Changing content means a commit and a rebuild |
| Styling | Tailwind CSS v3 with the V3 `vrc-*` colour tokens from the design boards, and Bricolage Grotesque, Geist and Geist Mono self-hosted through Fontsource, so no font request leaves the site ([#24](docs/issues/24-v3-design-tokens-and-self-hosted-fonts.md)) |
| Map | MapLibre GL, bundled, with tiles from OpenStreetMap. The data is the JSON file, served at `/data/organizations.json`, `.csv` and `.geojson` |
| Types | TypeScript on Astro's strict preset, plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` and `noPropertyAccessFromIndexSignature` |

## Target

One TypeScript app on one server: the public site, My VRC and the admin are the same Astro codebase, backed by one Postgres database.

```
            visitors and admins (HTTPS)
                         │
┌─ production server ────┼─────────────────────────────────┐
│                        ▼                                 │
│  caddy     TLS, static assets, snapshot if app is down   │
│                        │                                 │
│                        ▼                                 │
│  app       Astro server: public pages, /me, /admin, JSON │
│                        │  reads, writes, queues jobs     │
│                        ▼                                 │
│  postgres  content, submissions, sessions, job queue     │
│                        ▲                                 │
│                        │  takes jobs                     │
│  worker    pg-boss: emails, expiry, retention ───────────┼──► SMTP provider
└──────────────────────────────────────────────────────────┘
   backups: restic ──► a Storage Box, plus a second provider
```

| Part | Choice | Issue |
| --- | --- | --- |
| Web app | Astro 5 in server mode (`@astrojs/node`) serves the public pages, My VRC (`/me`), the admin (`/admin`) and the JSON endpoints | [#10](docs/issues/10-switch-astro-to-server-mode-with-a-health-check-and-the-work.md) |
| Interactive parts | React islands on React Aria Components for forms, the map, admin tables and the program builder. Everything else is server-rendered HTML | [#1](docs/issues/01-decide-approve-the-target-architecture-one-typescript-app-on.md) |
| Database | Postgres 17, schema and migrations in Drizzle, with a synthetic seed | [#11](docs/issues/11-add-postgres-with-drizzle-base-schema-migrations-and-synthet.md) |
| Background jobs | A worker process from the same codebase, running pg-boss on Postgres | [#16](docs/issues/16-background-jobs-with-pg-boss-and-the-worker-process.md) |
| Admin sign-in | better-auth. Admins are invite-only and need a password plus 2FA (passkey or authenticator app), with recovery codes | [#13](docs/issues/13-admin-sign-in-with-required-2fa-better-auth.md) |
| Visitor sign-in | Email magic links only, never passwords | [#14](docs/issues/14-visitor-magic-links-for-my-vrc.md) |
| Email | One mailer over SMTP. The provider is set in the server configuration (`SMTP_*`), not in code; development uses Mailpit | [#15](docs/issues/15-email-sending-mailer-templates-ics-bounces.md) |
| Map | MapLibre GL. It keeps today's hosted raster tiles while the site is on GitHub Pages, then switches to a self-hosted PMTiles basemap on the server | [#32](docs/issues/32-mapv3-the-map-on-maplibre-with-self-hosted-tiles.md), [#77](docs/issues/77-serve-the-map-basemap-from-our-own-server-pmtiles.md) |
| Analytics | Cloudflare Web Analytics | [#8](docs/issues/08-decide-analytics-at-launch-none-or-self-hosted-and-cookie-fr.md), [#38](docs/issues/38-redirects-from-old-urls-404-sitemap-social-cards-and-analyti.md) |
| Servers | A Hetzner server running Docker Compose with `caddy`, `app`, `worker` and `postgres`, plus a small staging server | [#18](docs/issues/18-provision-and-configure-the-production-and-staging-servers-i.md), [#19](docs/issues/19-docker-compose-stack-caddy-app-worker-postgres.md) |
| Backups and monitoring | restic backups with a restore drill, and Uptime Kuma at another provider | [#20](docs/issues/20-backups-restore-drill-and-static-fallback.md), [#21](docs/issues/21-monitoring-and-alerts-uptime-kuma-at-another-provider.md) |
| Tests | Checks on the static build first, then Vitest, Playwright end to end on a seeded database, and axe accessibility checks | [#76](docs/issues/76-static-site-ci-checks-and-a-daily-rebuild.md), [#12](docs/issues/12-tests-against-a-seeded-database-vitest-playwright-and-mailpi.md) |

### Data flow

- **One data layer.** Pages get content only through the functions in `src/lib/content/*` ([#26](docs/issues/26-data-layer-for-public-pages-repo-data-first-postgres-later.md)). They read the repo data files first, and switch to Postgres one content type at a time: editions in [#39](docs/issues/39-admineditionv3-editions-dates-and-registration-window.md), sessions and people in [#61](docs/issues/61-adminprogramv3-the-program-builder.md), the rest in [#45](docs/issues/45-admincontentv3-news-videos-people-partners-and-documents.md) and [#55](docs/issues/55-move-the-map-data-into-postgres-and-serve-the-downloads.md).
- **No rebuilds.** Pages read Postgres on each request through a small in-process cache, and every admin write clears it.
- **Dates drive state.** An edition's state (upcoming, open, closing soon, live, concluded) is computed from the dates stored for it, so nothing has to be scheduled. Admins change the dates in the admin ([#39](docs/issues/39-admineditionv3-editions-dates-and-registration-window.md)).
- **Forms write to Postgres.** Every submission lands in one moderation queue in the admin ([#50](docs/issues/50-adminqueuev3-one-moderation-queue-for-every-submission.md)), and the worker sends the emails that follow.

### Trust boundaries

- **Public internet to Caddy.** The firewall allows only SSH (keys only), HTTP and HTTPS. Caddy terminates TLS, and the app, worker and Postgres are reachable only inside the Compose network ([#18](docs/issues/18-provision-and-configure-the-production-and-staging-servers-i.md), [#19](docs/issues/19-docker-compose-stack-caddy-app-worker-postgres.md)).
- **Admin area.** `/admin` needs an admin session with 2FA. A fresh install seeds one default `admin` account, and its password and 2FA must be set at the first sign-in.
- **My VRC.** `/me` needs a session from a magic link, and shows only that email address's own data.
- **Public forms.** Rate limits and spam checks run on every form ([#17](docs/issues/17-spam-and-abuse-protection-for-every-public-form.md)).
- **Configuration and secrets.** The site URL, SMTP credentials, DNS and other secrets live in the server configuration, set when the server is set up ([#18](docs/issues/18-provision-and-configure-the-production-and-staging-servers-i.md)). None of them go into the repo, issues, logs or CI output.
- **Third parties.** The site loads no third-party scripts or fonts apart from the Cloudflare Web Analytics beacon, and no third-party map tiles once [#77](docs/issues/77-serve-the-map-basemap-from-our-own-server-pmtiles.md) ships.

### What it doesn't run

There is no CMS, no separate newsletter tool, no sign-in proxy and no private network in front of the admin. Earlier plans used Payload, listmonk, authentik and a tailnet, and a later proposal used Django. One TypeScript app means four fewer services to run, patch and back up, and today's Astro pages carry over. The cost is more code to own: the admin screens, topic emails and job handling.

### Risks

- **The app is a single point of failure for public pages.** Uptime alerts, a one-command rollback to the previous image ([#19](docs/issues/19-docker-compose-stack-caddy-app-worker-postgres.md)), and a nightly static snapshot that Caddy serves if the app is down ([#20](docs/issues/20-backups-restore-drill-and-static-fallback.md)).
- **better-auth is a young library.** An outside review of the auth and magic-link code is part of the launch checklist ([#49](docs/issues/49-launch-checklist-review-cutover-and-fallback.md)).
