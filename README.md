# Vert Robo Con

A demo website for the **Vert Robo Con** (VRC), a fictional community of people who build robots for climate work. Tagline: *Robots for a cooler planet*. Preview: [crn.elghareeb.space](https://crn.elghareeb.space).

**Stack:** Astro 5 · Tailwind v3 · Bun · TypeScript (strict) · GitHub Pages.

## Demo content

Everything on this site is made up. All people, organisations, events, statistics and images are fictional and synthetic, created for this project. No third-party content is included: no real names, photos, logos, copied text, videos or links to real documents. Email addresses and external links use the reserved `vert-robo-con.example` domain.

The code is MIT-licensed (see [`LICENSE`](LICENSE)).

## Quick start

Use [Bun](https://bun.sh), not npm/yarn/pnpm. The lockfile is `bun.lock` and CI uses Bun.

```sh
bun install      # install deps
bun run dev      # dev server at http://localhost:4321
bun run build    # build to dist/, what the Pages workflow runs
bun run preview  # preview the built dist/ locally
bun run check    # type-check the Astro files and the tests
bun run test     # unit tests, then the smoke, accessibility, link and component checks
```

## Checks

`bun run test` runs the unit tests (Vitest, `tests/unit/`, no browser), then
Playwright against the **built** site, so it checks what Pages serves.
`bun run test:unit` and `bun run test:e2e` run one each. Build first, and
install the browser once:

```sh
bunx playwright install chromium
bun run build && bun run test
```

Every test runs twice, at desktop and phone widths, over the routes in
[`tests/routes.ts`](tests/routes.ts) — add a route there when you add a page.

| Check | What fails it |
| :--- | :--- |
| `tests/unit/*.test.ts` | An edition's state wrong at any boundary or in any time zone, or a broken reference in the content |
| `tests/smoke.spec.ts` | A route that doesn't return 200, has no `h1`, or throws in the browser |
| `tests/a11y.spec.ts` | An axe violation under WCAG 2.1 A or AA, including text contrast below 4.5:1. Text on a gradient, which axe can't judge, is checked by `tests/gradient-contrast.ts` |
| `tests/gradient-contrast.spec.ts` | The gradient check itself giving the wrong answer on fixture pages |
| `tests/components.spec.ts` | A shared component's keyboard path, focus handling or phone layout breaking, on `/components` |
| `tests/links.spec.ts` | A link to an outside form, spreadsheet or file-sharing host |

The link check is what keeps "everything happens on the site" true: a feature
that isn't built yet shows its state, such as "Coming soon", rather than
sending people to an outside tool.

`.github/workflows/checks.yml` runs all of it on every pull request, and
`deploy.yml` runs it before publishing. There is no linter or formatter yet.

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
│   ├── components/        # Today's Astro components, replaced as pages are rebuilt
│   │   ├── ui/            # V3 building blocks: Button, Chip, Bento, Sheet, VideoFacade
│   │   └── site/          # V3 page chrome: Header, Footer, TabBar, PersonDrawer
│   ├── data/              # Content files: editions, news, settings, the map dataset
│   ├── layouts/           # SiteLayout for V3 pages; BaseLayout for today's
│   ├── lib/               # Cross-cutting data, the source of truth
│   │   ├── content/       # The content layer: the only way pages read content (#26)
│   │   ├── site-nav.ts    # Every navigation link, for the header, footer and tab bar
│   │   ├── constants.ts   # Links, site and summit metadata
│   │   ├── summits-data.ts# Summits, speakers, programs, partners, team
│   │   ├── mapData.ts     # Loads the map dataset at build time
│   │   └── types.ts       # Shared types for the map
│   ├── pages/             # File-based routes; /components shows the V3 components
│   ├── scripts/           # Browser code for sheets, menus and the person drawer
│   └── styles/global.css  # Tailwind + utility classes
├── tests/                 # Playwright smoke, accessibility, link and component checks
├── scripts/               # preview-strict.mjs, the server the checks run against
├── project/               # The 26 V3 design boards, plus canvas.json, their index
├── docs/
│   ├── ROADMAP.md         # Plan from today's site to the V3 designs
│   └── issues/            # The 77 implementation issues, one file each
└── ARCHITECTURE.md        # Today's site and the approved target architecture
```

When adding links or summit data, edit `src/lib/` rather than hardcoding values in pages.

## The map

The `/map` page reads the fictional dataset in `src/data/organizations.json` at build time; there is no external spreadsheet and no geocoding step. The coordinates are city locations. To change the map, edit the JSON file and rebuild.

The map itself is MapLibre GL, bundled rather than loaded from a CDN, on OpenStreetMap's tiles. [#77](docs/issues/77-serve-the-map-basemap-from-our-own-server-pmtiles.md) moves the basemap onto our own server. The dataset is served in three formats, all under CC BY 4.0:

| Address | Format |
| :--- | :--- |
| `/data/organizations.json` | The dataset as it is stored, one object per organisation |
| `/data/organizations.csv` | One row per organisation, coordinates split into latitude and longitude |
| `/data/organizations.geojson` | A `FeatureCollection`, longitude first, carrying the licence and citation |

## Deployment

`.github/workflows/deploy.yml` runs the checks, builds with `bun run build` and publishes `dist/` to GitHub Pages on every push to `main`, and once a day so the build-time edition states stay current. The custom domain `crn.elghareeb.space` is set in `public/CNAME`.

`astro.config.mjs` sets `output: 'static'`: there is no SSR, no API routes and no server. Anything that needs data is baked in at build time.

## Editing content

Edit the files in the repo; there is no CMS. The team edits content in the admin from M7 (#45).

- Page copy lives in the route files under `src/pages/`
- The navigation lives in `src/components/Header.astro`
- Summit data, speakers, partners and the organising team live in `src/lib/summits-data.ts`
- Links, site metadata, footer links and figures live in `src/lib/constants.ts`
- Colours and fonts live in `tailwind.config.mjs`. The colour notes there say what each token is for: blue only for things you can act on, bright green only for dots and icons, and a grey chip for a status such as "Coming soon"
- Map organisations live in `src/data/organizations.json`

## Further reading

- [`ARCHITECTURE.md`](ARCHITECTURE.md): today's site and the approved target architecture
- [`docs/ROADMAP.md`](docs/ROADMAP.md): plan from today's site to the V3 designs
- [`docs/issues/`](docs/issues/README.md): the 77 implementation issues, one file each, grouped by milestone
- [`project/`](project): the 26 V3 design boards the build works from
