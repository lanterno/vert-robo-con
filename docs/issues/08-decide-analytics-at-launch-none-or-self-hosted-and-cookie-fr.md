# 8 · Decide: analytics at launch (none, or self-hosted and cookie-free)

**State:** closed · **Milestone:** M0 · Decisions · **Labels:** decision

---

> **Decided Oct 29:** Cloudflare Web Analytics, which is cookie-free. Built in #38.

The plan has no analytics. If page counts are wanted, the lightest option that needs no consent banner is a self-hosted, cookie-free counter (Umami or GoatCounter) as one more container.

## Done when

- [ ] "None" or a named tool is chosen. If a tool is chosen, an infra task is added to the Compose stack issue

---

**Comment — lanterno, 2026-10-28**

**Decision (Oct 29):** use Cloudflare Web Analytics. It's cookie-free, so no consent banner is needed. The work is tracked in #38.
