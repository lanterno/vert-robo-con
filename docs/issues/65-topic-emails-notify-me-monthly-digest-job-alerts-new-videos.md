# 65 · Topic emails: notify-me, monthly digest, job alerts, new videos

**State:** open · **Milestone:** M7 · After the summit · **Labels:** frontend, backend

---

**Design:** HomeV3, JobsV3, WatchV3, NewsV3

- [ ] Topics with double opt-in: summit news, the monthly digest, job alerts (with saved filters), new videos
- [ ] Monthly digest: built from the month's news, jobs and videos. An admin previews it and sends it
- [ ] Job alerts: daily or weekly, matched against saved filters
- [ ] One-click unsubscribe per topic, and from everything
- [ ] Sends are throttled to the provider's rate, and bounces are suppressed

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #15, #16, #14
