# 9 · Rewrite ARCHITECTURE.md and docs/ROADMAP.md for the new plan

**State:** open · **Milestone:** M2 · Foundations · **Labels:** documentation

---

Both files described the Payload, listmonk and authentik plan. On Oct 30 they were rewritten to match #1 and the re-planned milestones. What's left is the README's local setup, which can only be written once #11 and #19 exist.

## Done when

- [x] `ARCHITECTURE.md` describes the one-app shape, its processes, data flow and trust boundaries
- [x] `docs/ROADMAP.md` gives the milestones, gates and dates, and links to the milestones on GitHub
- [ ] `README.md` explains local setup with Docker Compose and the seeded database

---

**Comment — lanterno, 2026-10-30**

`docs/ROADMAP.md` (f58cf18, 754d2f6) and `ARCHITECTURE.md` (35b32cf) are rewritten for the approved architecture and one developer. The roadmap lists its stages and dates and links to #74 for the issues by milestone. The milestone due dates still come from the earlier plan.

`README.md` is corrected for today's static site (233e817). Its Docker Compose and seeded-database setup can only be written once #11 and #19 exist, so this issue stays open until then.
