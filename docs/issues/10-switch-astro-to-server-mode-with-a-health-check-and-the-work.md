# 10 · Switch Astro to server mode, with a health check and the worker entry point

**State:** open · **Milestone:** M2 · Foundations · **Labels:** backend

---

Today the site is `output: 'static'` on GitHub Pages. M1 rebuilds the public pages as a static site first, and TinaCMS is removed in #75.

## Scope

- [ ] Add `@astrojs/node` in standalone mode and set `output: 'server'`. The pages that stay static keep `export const prerender = true` until they read from the database
- [ ] Add a `GET /healthz` route that checks the database connection
- [ ] Add a `worker` entry point (`src/worker/index.ts`) that the job runner from #16 plugs into
- [ ] Add a multi-stage `Dockerfile` that builds one image, run as `app` or `worker`
- [ ] Load config from environment variables, validated at boot with zod. Commit an `.env.example` with placeholder values only

## Done when

- The public pages from M1 render the same in server mode
- `docker build` produces an image that starts and answers `/healthz`
