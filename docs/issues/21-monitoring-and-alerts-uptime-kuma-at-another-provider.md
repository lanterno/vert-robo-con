# 21 · Monitoring and alerts (Uptime Kuma at another provider)

**State:** open · **Milestone:** M2 · Foundations · **Labels:** infra

---

## Scope

- [ ] Uptime Kuma on a small server at a different provider
- [ ] Checks:
  - the home page and `/healthz` every minute
  - certificate expiry
  - heartbeats from backups and the worker
- [ ] Alerts by email and one chat channel to every admin on the on-call list
- [ ] Disk, memory and load alerts on the production server

**Depends on:** #19
