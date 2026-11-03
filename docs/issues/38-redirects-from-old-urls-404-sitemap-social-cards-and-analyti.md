# 38 · Redirects from old URLs, 404, sitemap, social cards and analytics

**State:** open · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

## Scope

- [ ] Redirects from every current URL to its new page, including `/consulting`, `/slack`, `/research`, `/map` and `/summits/*`. On GitHub Pages they are redirect pages (a meta refresh and a canonical link). Once the site runs on the server, Caddy answers them with 301s (#19). A test asserts each one
- [ ] A 404 page in the V3 look, with search-free suggestions
- [ ] `sitemap.xml`, `robots.txt`, canonical URLs, and Open Graph and Twitter cards per page type
- [ ] Cloudflare Web Analytics (decided in #8): the beacon in the base layout, with its token read from config, not hard-coded. It is allowed in the CSP (#19) and mentioned in the Privacy draft (#37). If the domain is later proxied through Cloudflare, its server-side analytics need no script, and the beacon can go
- [ ] Remove the old components and pages that nothing uses any more

**Depends on:** #27

---

**Comment — lanterno, 2026-10-28**

**Added by the decision in #8:** add Cloudflare Web Analytics.
- [ ] Add the Cloudflare Web Analytics beacon to the base layout, with its token read from config (not hard-coded in the repo)
- [ ] Allow `static.cloudflareinsights.com` (script) and `cloudflareinsights.com` (connect) in the CSP (#19)
- [ ] Mention it in the Privacy page draft (#37)

If the domain is later proxied through Cloudflare, its server-side analytics need no script at all, and the beacon can be removed.
