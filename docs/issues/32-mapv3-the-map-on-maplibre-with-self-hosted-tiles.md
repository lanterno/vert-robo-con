# 32 · MapV3: the map on MapLibre with self-hosted tiles

**State:** open · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

**Route:** `/map` · **Design:** MapV3, PhoneV3 (Map tab)

- [ ] MapLibre GL replaces Leaflet. On GitHub Pages it keeps today's raster tiles; the self-hosted PMTiles basemap follows in #77, once the site runs on our server
- [ ] Clustered pins, and filters by robot type, application, country and deployed status, with the legend counts from the data
- [ ] An organisation card and a list view that work by keyboard as an alternative to the map
- [ ] Download links for CSV, JSON and GeoJSON under CC BY 4.0, and a "How to cite" block
- [ ] Reads from `src/data/organizations.json` until #55 moves the data into Postgres
- [ ] Phone layout

**Depends on:** #25
