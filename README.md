# Vert Robo Con

A demo website for the **Vert Robo Con** (VRC), a fictional community of people who build robots for climate work. Tagline: *Robots for a cooler planet*. Preview: [crn.elghareeb.space](https://crn.elghareeb.space).

**Stack:** Astro 5 · Tailwind v3 · TinaCMS · Bun · TypeScript (strict) · GitHub Pages

## Demo content

Everything on this site is made up. All people, organisations, events, statistics and images are fictional and synthetic, created for this project. No third-party content is included: no real names, photos, logos, copied text, videos or links to real documents. Email addresses and external links use the reserved `vert-robo-con.example` domain.

The code is MIT-licensed (see [`LICENSE`](LICENSE)).

## Quick start

Use [Bun](https://bun.sh), not npm/yarn/pnpm. The lockfile is `bun.lock` and CI uses Bun.

```sh
bun install            # install deps
bun run dev            # dev server with TinaCMS at http://localhost:4321
bun run build:static   # CI build (Astro only, no Tina secrets needed)
bun run preview        # preview the built dist/ locally
```

| Command | Purpose |
| :--- | :--- |
| `bun run dev` | Runs `tinacms dev -c "astro dev"`, with the CMS admin at `/admin` |
| `bun run build` | Full build including the TinaCMS admin (needs `TINA_CLIENT_ID` + `TINA_TOKEN`) |
| `bun run build:static` | What `.github/workflows/deploy.yml` runs: Astro only |
| `bun astro check` | TypeScript + Astro diagnostics |

There is **no test suite, no linter and no formatter** configured.

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
| `/slack` | Joining the community workspace |

## Repository layout

```
.
├── public/                # Static assets, copied as-is into dist/
│   └── images/            # Synthetic SVG artwork, avatars and partner wordmarks
├── src/
│   ├── components/        # Reusable Astro components
│   ├── content/settings/  # TinaCMS-managed site settings (JSON)
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
├── docs/                  # Roadmap
└── ARCHITECTURE.md        # Why this stack
```

When adding links or summit data, edit `src/lib/` rather than hardcoding values in pages.

## The map

The `/map` page reads the fictional dataset in `src/data/organizations.json` at build time; there is no external spreadsheet and no geocoding step. The coordinates are city locations. The old `scripts/geocode-orgs.ts` script has been removed. To change the map, edit the JSON file and rebuild.

## Deployment

`.github/workflows/deploy.yml` builds with `bun run build:static` and publishes `dist/` to GitHub Pages on every push to `main`. The custom domain `crn.elghareeb.space` is set in `public/CNAME`.

`astro.config.mjs` sets `output: 'static'`: there is no SSR, no API routes and no server. Anything that needs data is baked in at build time.

## Editing content

**With TinaCMS (visual editor):**

1. `bun run dev` to start the server with TinaCMS
2. Open `http://localhost:4321/admin`
3. Edit with live preview; changes are committed to Git

**Directly in the repo:**

- Page copy lives in the route files under `src/pages/`
- Site-wide settings (nav, footer, social) live in `src/content/settings/site.json`
- Summit data, speakers, partners and the organising team live in `src/lib/summits-data.ts`
- Links, site metadata and figures live in `src/lib/constants.ts`
- Map organisations live in `src/data/organizations.json`

## Further reading

- [`ARCHITECTURE.md`](ARCHITECTURE.md): the reasoning behind the stack
- [`docs/ROADMAP.md`](docs/ROADMAP.md): plan from today's site to the V3 designs
