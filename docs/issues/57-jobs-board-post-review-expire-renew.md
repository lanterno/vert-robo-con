# 57 · Jobs board: post, review, expire, renew

**State:** open · **Milestone:** M7 · After the summit · **Labels:** frontend, backend

---

**Design:** JobsV3, MyVRCV3, AdminQueueV3

- [ ] Frontend: listings with filters (type, remote, country, salary range) and the "Post a job" form
- [ ] Backend: posts are reviewed in the queue before they appear, with references like `JOB-0219`
- [ ] A daily job expires posts at their closing date and emails the poster a renewal link 3 days before
- [ ] The poster edits, renews or closes through the magic link

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #50, #36
