# 16 · Background jobs with pg-boss and the worker process

**State:** open · **Milestone:** M2 · Foundations · **Labels:** backend

---

## Scope

- [ ] Run pg-boss in the `worker` process. Retries use backoff, and failed jobs are kept for inspection
- [ ] Typed job definitions in `src/worker/jobs/*`, each with its own tests
- [ ] Scheduled jobs (cron). The first is the nightly static snapshot (#20). Slack-link checks (#53), retention (#64), job-post expiry (#57) and digests (#65) add theirs later
- [ ] The worker sends a heartbeat to Uptime Kuma (#21)
- [ ] AdminSystemV3 (#47) reads queue counts and failed jobs

**Depends on:** #11
