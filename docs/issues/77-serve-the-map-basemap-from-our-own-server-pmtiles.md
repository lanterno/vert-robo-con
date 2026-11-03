# 77 · Serve the map basemap from our own server (PMTiles)

**State:** open · **Milestone:** M3 · Registration and the admin core · **Labels:** frontend, infra

---

While the site is on GitHub Pages, the MapV3 map (#32) keeps today's hosted raster tiles. Once the site runs on our own server, the basemap moves there, so the map loads nothing from third parties (#1).

## Scope

- [ ] Build a PMTiles basemap extract for the zoom levels the map uses, and note its size and source in the runbook (#23)
- [ ] Caddy serves it with range requests and long cache headers
- [ ] MapLibre switches to it, and the CSP drops the old tile hosts (#19)
- [ ] The attribution line matches the new source

**Depends on:** #32, #19
