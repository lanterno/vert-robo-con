# 75 · Remove TinaCMS

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

TinaCMS is installed, but no page reads its content, and `bun run dev` rewrites tracked files under `tina/`. Removing it first keeps M1 simple.

## Scope

- [x] Remove `tinacms` and `@tinacms/cli`, the `tina/` folder, `public/admin/` and `src/content/settings/site.json`
- [x] `dev` and `build` become plain `astro dev` and `astro build`. Drop `build:static`, and make `.github/workflows/deploy.yml` run `bun run build`
- [x] Remove `tina` from `tsconfig.json`, and the `@content/*` path alias if nothing uses it
- [x] Update the README's commands and editing sections

## Done when

- `bun run build` produces the same 9 pages as before
- `bun run dev` leaves the working tree clean

Done in 97eedef, 35cd306 and 755edaf. `bun run build` produces the same
9 pages, and every file in `dist/` is byte for byte what it was before,
apart from `admin/.gitignore`, which only existed to hold Tina's admin
bundle. `bun run dev` serves the home page and leaves the tree clean.

_Split from #10 on Oct 30, so it ships with the static site._
