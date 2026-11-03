# 51 · Pitch calls: startup and research pitches

**State:** open · **Milestone:** M4 · Pitch calls and moderation · **Labels:** frontend, backend

---

**Design:** GetInvolvedV3, MyVRCV3

- [ ] Backend: a call record per edition and track, with open and close dates edited in the admin, never hard-coded (the startup call opens Dec 8 by default, #3); pitches stored with references like `PIT-2027-018`
- [ ] Frontend: a 4-step form with "Save and finish later" (the draft is stored server-side and reached through the magic link)
- [ ] The sender sees status, can edit until the deadline, and can withdraw in My VRC
- [ ] If the call must open before the full form is ready, a one-step version ships first (see #3)

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #50, #39

---

**Comment — lanterno, 2026-10-28**

**Requirement from #3:** each call's open and close dates (startup pitches open Dec 8 by default) live in the database and are edited in the admin. They are not hard-coded in pages or config.
