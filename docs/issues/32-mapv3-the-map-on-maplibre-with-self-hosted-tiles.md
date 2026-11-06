# 32 · MapV3: the map on MapLibre with self-hosted tiles

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Route:** `/map` · **Design:** MapV3, PhoneV3 (Map tab)

- [x] MapLibre GL replaces Leaflet. On GitHub Pages it keeps today's raster tiles; the self-hosted PMTiles basemap follows in #77, once the site runs on our server
- [x] Clustered pins, and filters by robot type, application, country and deployed status, with the legend counts from the data
- [x] An organisation card and a list view that work by keyboard as an alternative to the map
- [x] Download links for CSV, JSON and GeoJSON under CC BY 4.0, and a "How to cite" block
- [x] Reads from `src/data/organizations.json` until #55 moves the data into Postgres
- [x] Phone layout

**Depends on:** #25

## Done

In 8003437, f2d224a, aee6e0e, 8afae87, 49ca251 and b17ed4d.

- **The basemap is OpenStreetMap's own tiles, not today's.** #32 says
  to keep the Leaflet map's tiles until #77, but those were CARTO's,
  which now answer with an "API key required" image: the basemap was
  broken wherever it was shown, including on the live site. OSM's
  tiles need no key. #77 still replaces them with a basemap on our own
  server.
- **No third-party script.** Leaflet and its cluster plugin were
  loaded from unpkg at runtime; MapLibre is bundled. A test asserts
  the page loads no script from anywhere but the site.
- **The list is the map's equal,** not a fallback: every organisation
  is on the page, it works by keyboard, and the filters drive both. So
  the page is complete without JavaScript.
- **The map is a region, not an image,** because it holds its own zoom
  controls and attribution link, which an image may not contain.
- **Downloads:** CSV and GeoJSON are new; JSON keeps the address and
  shape it already had, since the README documents it and the site
  links to it.
- **Bundling note:** MapLibre finds its worker relative to its own
  module URL, which stops being right once bundled. The worker is
  imported for its URL so the bundler emits it.
- **Coming later:** suggesting an organization (#56), the data moving
  into Postgres (#55), and the self-hosted basemap (#77).
