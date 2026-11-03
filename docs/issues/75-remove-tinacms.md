# 75 · Remove TinaCMS

**State:** open · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

TinaCMS is installed, but no page reads its content, and `bun run dev` rewrites tracked files under `tina/`. Removing it first keeps M1 simple.

## Scope

- [ ] Remove `tinacms` and `@tinacms/cli`, the `tina/` folder, `public/admin/` and `src/content/settings/site.json`
- [ ] `dev` and `build` become plain `astro dev` and `astro build`. Drop `build:static`, and make `.github/workflows/deploy.yml` run `bun run build`
- [ ] Remove `tina` from `tsconfig.json`, and the `@content/*` path alias if nothing uses it
- [ ] Update the README's commands and editing sections

## Done when

- `bun run build` produces the same 9 pages as before
- `bun run dev` leaves the working tree clean

_Split from #10 on Oct 30, so it ships with the static site._
