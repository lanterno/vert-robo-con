# 44 · AdminUsersV3: admins, 2FA status and audit log

**State:** open · **Milestone:** M3 · Registration and the admin core · **Labels:** frontend, backend

---

**Design:** AdminUsersV3

- [ ] List admins with their 2FA methods and last sign-in
- [ ] The owner invites and removes admins
- [ ] Any admin resets another admin's 2FA, with a reason that goes into the audit log
- [ ] Audit log viewer with filters by admin, action and date

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #42
