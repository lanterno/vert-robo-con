# 38 · Redirects from old URLs, 404, sitemap, social cards and analytics

**State:** closed · **Milestone:** M1 · Public site without a database · **Labels:** frontend

---

## Scope

- [x] Redirects from every current URL to its new page, including `/consulting`, `/slack`, `/research`, `/map` and `/summits/*`. On GitHub Pages they are redirect pages (a meta refresh and a canonical link). Once the site runs on the server, Caddy answers them with 301s (#19). A test asserts each one
- [x] A 404 page in the V3 look, with search-free suggestions
- [x] `sitemap.xml`, `robots.txt`, canonical URLs, and Open Graph and Twitter cards per page type
- [x] Cloudflare Web Analytics (decided in #8): the beacon in the base layout, with its token read from config, not hard-coded. It is allowed in the CSP (#19) and mentioned in the Privacy draft (#37). If the domain is later proxied through Cloudflare, its server-side analytics need no script, and the beacon can go
- [x] Remove the old components and pages that nothing uses any more

**Depends on:** #27

---

**Comment — lanterno, 2026-10-28**

**Added by the decision in #8:** add Cloudflare Web Analytics.
- [x] Add the Cloudflare Web Analytics beacon to the base layout, with its token read from config (not hard-coded in the repo)
- [x] Allow `static.cloudflareinsights.com` (script) and `cloudflareinsights.com` (connect) in the CSP (#19)
- [x] Mention it in the Privacy page draft (#37)

If the domain is later proxied through Cloudflare, its server-side analytics need no script at all, and the beacon can be removed.

## Done

In ea6f752, c659291, 38400e9, 7644860, 8f85dd7 and d675172.

- **Only two addresses moved.** /consulting is a topic on the contact
  page and /slack is the join sheet the home page opens; both are
  redirect pages with a refresh, a canonical link, noindex and a
  visible link. Every other old address — /, /research, /map,
  /summits, /summits/2025 and /summits/2026 — is still a page at the
  same place, so it needs no redirect. A test asserts each one.
- **The 404** suggests the pages people actually want, and the test
  fetches each suggestion to prove it exists. No search box: there is
  nothing to search yet.
- **The sitemap** is built from the routes the site has, so a page
  added later is listed without anyone remembering. The 404, anything
  noindex and the redirect pages stay out.
- **Analytics:** the token comes from `CF_ANALYTICS_TOKEN` in the
  build's environment. Without it the beacon isn't added at all, so a
  local build or a fork sends nothing, and a test asserts that. The
  CSP entry is #19's, with the server.
- **Removed:** BaseLayout, the old Header, Footer and
  VideoPlaceholder, and mapData.ts, whose one used function
  duplicated the content layer.
