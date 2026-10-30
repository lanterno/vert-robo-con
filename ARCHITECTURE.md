# Architecture

How the Vert Robo Con (VRC) site works today, and the target architecture approved in [#1](https://github.com/lanterno/vert-robo-con/issues/1) on Oct 29, 2026. VRC is a fictional community; see "Demo content" in the [README](README.md). [`docs/ROADMAP.md`](docs/ROADMAP.md) has the plan and dates for getting from one to the other.

## Today

A static Astro 5 site with no server, database or tests.

| Part | What it is |
| --- | --- |
| Build | Astro 5 with `output: 'static'`, built with Bun. 9 pages, all rendered at build time |
| Hosting | GitHub Pages on a preview domain. `.github/workflows/deploy.yml` runs `bun run build:static` on every push to `main` |
| Content | TypeScript and JSON in the repo: `src/lib/summits-data.ts`, `src/lib/constants.ts`, `src/data/organizations.json`. Changing content means a commit and a rebuild |
| Styling | Tailwind CSS v3 with the `vrc-*` colour tokens, and fonts from Google Fonts |
| Map | Leaflet and its marker-cluster plugin loaded from unpkg, with tiles from CARTO and Esri. The data is the JSON file, also served at `/data/organizations.json` |
| Types | TypeScript on Astro's strict preset, plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` and `noPropertyAccessFromIndexSignature` |
| TinaCMS | Installed, with a schema in `tina/config.ts`, but no page reads its content. Removed in [#75](https://github.com/lanterno/vert-robo-con/issues/75) |

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
| Web app | Astro 5 in server mode (`@astrojs/node`) serves the public pages, My VRC (`/me`), the admin (`/admin`) and the JSON endpoints | [#10](https://github.com/lanterno/vert-robo-con/issues/10) |
| Interactive parts | React islands on React Aria Components for forms, the map, admin tables and the program builder. Everything else is server-rendered HTML | [#1](https://github.com/lanterno/vert-robo-con/issues/1) |
| Database | Postgres 17, schema and migrations in Drizzle, with a synthetic seed | [#11](https://github.com/lanterno/vert-robo-con/issues/11) |
| Background jobs | A worker process from the same codebase, running pg-boss on Postgres | [#16](https://github.com/lanterno/vert-robo-con/issues/16) |
| Admin sign-in | better-auth. Admins are invite-only and need a password plus 2FA (passkey or authenticator app), with recovery codes | [#13](https://github.com/lanterno/vert-robo-con/issues/13) |
| Visitor sign-in | Email magic links only, never passwords | [#14](https://github.com/lanterno/vert-robo-con/issues/14) |
| Email | One mailer over SMTP. The provider is set in the server configuration (`SMTP_*`), not in code; development uses Mailpit | [#15](https://github.com/lanterno/vert-robo-con/issues/15) |
| Map | MapLibre GL. It keeps today's hosted raster tiles while the site is on GitHub Pages, then switches to a self-hosted PMTiles basemap on the server | [#32](https://github.com/lanterno/vert-robo-con/issues/32), [#77](https://github.com/lanterno/vert-robo-con/issues/77) |
| Analytics | Cloudflare Web Analytics | [#8](https://github.com/lanterno/vert-robo-con/issues/8), [#38](https://github.com/lanterno/vert-robo-con/issues/38) |
| Servers | A Hetzner server running Docker Compose with `caddy`, `app`, `worker` and `postgres`, plus a small staging server | [#18](https://github.com/lanterno/vert-robo-con/issues/18), [#19](https://github.com/lanterno/vert-robo-con/issues/19) |
| Backups and monitoring | restic backups with a restore drill, and Uptime Kuma at another provider | [#20](https://github.com/lanterno/vert-robo-con/issues/20), [#21](https://github.com/lanterno/vert-robo-con/issues/21) |
| Tests | Checks on the static build first, then Vitest, Playwright end to end on a seeded database, and axe accessibility checks | [#76](https://github.com/lanterno/vert-robo-con/issues/76), [#12](https://github.com/lanterno/vert-robo-con/issues/12) |

### Data flow

- **One data layer.** Pages get content only through the functions in `src/lib/content/*` ([#26](https://github.com/lanterno/vert-robo-con/issues/26)). They read the repo data files first, and switch to Postgres one content type at a time: editions in [#39](https://github.com/lanterno/vert-robo-con/issues/39), sessions and people in [#61](https://github.com/lanterno/vert-robo-con/issues/61), the rest in [#45](https://github.com/lanterno/vert-robo-con/issues/45) and [#55](https://github.com/lanterno/vert-robo-con/issues/55).
- **No rebuilds.** Pages read Postgres on each request through a small in-process cache, and every admin write clears it.
- **Dates drive state.** An edition's state (upcoming, open, closing soon, live, concluded) is computed from the dates stored for it, so nothing has to be scheduled. Admins change the dates in the admin ([#39](https://github.com/lanterno/vert-robo-con/issues/39)).
- **Forms write to Postgres.** Every submission lands in one moderation queue in the admin ([#50](https://github.com/lanterno/vert-robo-con/issues/50)), and the worker sends the emails that follow.

### Trust boundaries

- **Public internet to Caddy.** The firewall allows only SSH (keys only), HTTP and HTTPS. Caddy terminates TLS, and the app, worker and Postgres are reachable only inside the Compose network ([#18](https://github.com/lanterno/vert-robo-con/issues/18), [#19](https://github.com/lanterno/vert-robo-con/issues/19)).
- **Admin area.** `/admin` needs an admin session with 2FA. A fresh install seeds one default `admin` account, and its password and 2FA must be set at the first sign-in.
- **My VRC.** `/me` needs a session from a magic link, and shows only that email address's own data.
- **Public forms.** Rate limits and spam checks run on every form ([#17](https://github.com/lanterno/vert-robo-con/issues/17)).
- **Configuration and secrets.** The site URL, SMTP credentials, DNS and other secrets live in the server configuration, set when the server is set up ([#18](https://github.com/lanterno/vert-robo-con/issues/18)). None of them go into the repo, issues, logs or CI output.
- **Third parties.** The site loads no third-party scripts or fonts apart from the Cloudflare Web Analytics beacon, and no third-party map tiles once [#77](https://github.com/lanterno/vert-robo-con/issues/77) ships.

### What it doesn't run

There is no CMS, no separate newsletter tool, no sign-in proxy and no private network in front of the admin. Earlier plans used Payload, listmonk, authentik and a tailnet, and a later proposal used Django. One TypeScript app means four fewer services to run, patch and back up, and today's Astro pages carry over. The cost is more code to own: the admin screens, topic emails and job handling.

### Risks

- **The app is a single point of failure for public pages.** Uptime alerts, a one-command rollback to the previous image ([#19](https://github.com/lanterno/vert-robo-con/issues/19)), and a nightly static snapshot that Caddy serves if the app is down ([#20](https://github.com/lanterno/vert-robo-con/issues/20)).
- **better-auth is a young library.** An outside review of the auth and magic-link code is part of the launch checklist ([#49](https://github.com/lanterno/vert-robo-con/issues/49)).
