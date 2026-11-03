# 53 · Join the network: request, manual approval, Slack invite

**State:** open · **Milestone:** M4 · Pitch calls and moderation · **Labels:** frontend, backend

---

**Design:** HomeV3 join sheet, MyVRCV3, AdminQueueV3, AdminDashboardV3

- [ ] Frontend: the join sheet (name, email, organisation, role, interests, why) and the email-only digest option
- [ ] Backend: the request lands in the queue, and an admin approves it by hand
- [ ] The Slack invite link appears only in the approval email, never on a page
- [ ] A daily job warns admins 5 days before the link expires (30 days or 400 uses). The link is rotated in Settings

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #50, #46
