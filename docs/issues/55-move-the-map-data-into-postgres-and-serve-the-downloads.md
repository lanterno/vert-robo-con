# 55 · Move the map data into Postgres and serve the downloads

**State:** open · **Milestone:** M7 · After the summit · **Labels:** backend

---

## Scope

- [ ] An `organizations` table. Import the 120 organisations from `src/data/organizations.json`, keeping their coordinates
- [ ] `GET /data/organizations.{csv,json,geojson}` with CC BY 4.0 licence headers and a citation, cached
- [ ] MapV3 reads from the database
- [ ] The repo JSON is read-only for 2 weeks after the import, then removed together with `src/pages/data/organizations.json.ts`

**Depends on:** #11
