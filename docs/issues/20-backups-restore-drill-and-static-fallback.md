# 20 · Backups, restore drill and static fallback

**State:** open · **Milestone:** M2 · Foundations · **Labels:** infra

---

## Scope

- [ ] Run `pg_dump` every 4 hours, and back up uploads and config nightly. restic sends both to a Hetzner Storage Box in the other region, and a second copy goes to another provider
- [ ] Retention: hourly for 2 days, daily for 30 days, monthly for 12 months
- [ ] The first restore drill is done on staging, and its duration is written down in the runbook
- [ ] A nightly worker job crawls the public pages into a static snapshot. If the app is down, Caddy serves it as a read-only fallback with a banner
- [ ] Each backup sends a heartbeat to Uptime Kuma

**Depends on:** #19
