# Vert Robo Con

A demo website for the **Vert Robo Con** (VRC), a fictional community of people who build robots for climate work. Tagline: *Robots for a cooler planet*. Preview: [crn.elghareeb.space](https://crn.elghareeb.space).

**Stack:** Astro 5 · Tailwind v3 · Bun · TypeScript (strict) · GitHub Pages. TinaCMS is installed, but no page reads its content.

## Demo content

Everything on this site is made up. All people, organisations, events, statistics and images are fictional and synthetic, created for this project. No third-party content is included: no real names, photos, logos, copied text, videos or links to real documents. Email addresses and external links use the reserved `vert-robo-con.example` domain.

The code is MIT-licensed (see [`LICENSE`](LICENSE)).

## Quick start

Use [Bun](https://bun.sh), not npm/yarn/pnpm. The lockfile is `bun.lock` and CI uses Bun.

```sh
bun install            # install deps
bun run dev            # dev server at http://localhost:4321
bun run build:static   # CI build (Astro only, no Tina secrets needed)
bun run preview        # preview the built dist/ locally
```

| Command | Purpose |
| :--- | :--- |
| `bun run dev` | Runs `tinacms dev -c "astro dev"`. The Tina editor is at `/admin/index.html` |
| `bun run build` | Full build including the TinaCMS admin (needs `TINA_CLIENT_ID` + `TINA_TOKEN`) |
| `bun run build:static` | What `.github/workflows/deploy.yml` runs: Astro only |

`bun run dev` rewrites tracked files under `tina/`. Discard those changes with `git checkout -- tina/` and delete `tina/__generated__/types.js`.

There is **no test suite, no type-check script, no linter and no formatter** yet. `bun astro check` needs `@astrojs/check`, which isn't a dependency, so it stops and asks to install it with npm. Checks come with [#76](https://github.com/lanterno/vert-robo-con/issues/76).

## Pages

| Route | Page |
| :--- | :--- |
| `/` | Homepage: hero, community figures, call to action |
| `/consulting` | Consulting services |
| `/research` | The network's white paper |
| `/summits` | Summits overview: organising team, past editions |
| `/summits/2025` | Summit 2025 archive: program, speakers, partners, recording placeholders |
| `/summits/2026` | Summit 2026 archive: program, speakers, partners |
| `/map` | Map of fictional organisations (Leaflet, full viewport) |
| `/data/organizations.json` | The map dataset as a JSON download |
| `/slack` | Joining the community workspace |
| `/404` | Not-found page |

## Repository layout

```
.
├── public/                # Static assets, copied as-is into dist/
│   └── images/            # Synthetic SVG artwork, avatars and partner wordmarks
├── src/
│   ├── components/        # Reusable Astro components
│   ├── content/settings/  # TinaCMS site settings (JSON); no page reads them
│   ├── data/
│   │   └── organizations.json  # Fictional map dataset
│   ├── layouts/           # BaseLayout (Header + Footer + global SEO)
│   ├── lib/               # Cross-cutting data, the source of truth
│   │   ├── constants.ts   # Links, site and summit metadata
│   │   ├── summits-data.ts# Summits, speakers, programs, partners, team
│   │   ├── mapData.ts     # Loads the map dataset at build time
│   │   └── types.ts       # Shared types for the map
│   ├── pages/             # File-based routes
│   └── styles/global.css  # Tailwind + utility classes
├── tina/config.ts         # TinaCMS schema (page + siteSettings collections)
├── docs/                  # Roadmap and its timeline image
└── ARCHITECTURE.md        # Today's site and the approved target architecture
```

When adding links or summit data, edit `src/lib/` rather than hardcoding values in pages.

## The map

The `/map` page reads the fictional dataset in `src/data/organizations.json` at build time; there is no external spreadsheet and no geocoding step. The coordinates are city locations. To change the map, edit the JSON file and rebuild. The same data is served at `/data/organizations.json`.

## Deployment

`.github/workflows/deploy.yml` builds with `bun run build:static` and publishes `dist/` to GitHub Pages on every push to `main`. The custom domain `crn.elghareeb.space` is set in `public/CNAME`.

`astro.config.mjs` sets `output: 'static'`: there is no SSR, no API routes and no server. Anything that needs data is baked in at build time.

## Editing content

Edit the files in the repo. The TinaCMS editor saves to `src/content/`, but no page reads from there, so its edits don't change the site. TinaCMS is removed in [#75](https://github.com/lanterno/vert-robo-con/issues/75).

- Page copy lives in the route files under `src/pages/`
- The navigation lives in `src/components/Header.astro`
- Summit data, speakers, partners and the organising team live in `src/lib/summits-data.ts`
- Links, site metadata, footer links and figures live in `src/lib/constants.ts`
- Map organisations live in `src/data/organizations.json`

## Further reading

- [`ARCHITECTURE.md`](ARCHITECTURE.md): today's site and the approved target architecture
- [`docs/ROADMAP.md`](docs/ROADMAP.md): plan from today's site to the V3 designs
- [Issue #74](https://github.com/lanterno/vert-robo-con/issues/74): every implementation issue, by milestone
