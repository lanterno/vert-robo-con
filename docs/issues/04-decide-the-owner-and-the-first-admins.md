# 4 · Decide: the owner and the first admins

**State:** closed · **Milestone:** M0 · Decisions · **Labels:** decision

---

> **Decided Oct 29:** no named owner yet. A default `admin` account must change its password and set up 2FA at its first sign-in, then invites the other admins (#13).

Admins all have the same rights, per the earlier decision. The **owner** is the one person who can add and remove admins, and any admin can reset another admin's 2FA.

## Done when

- [ ] The owner is named
- [ ] 2–3 first admins are named; they are invited in the #13 rollout
- [ ] A second person who can recover the owner account is named for the runbook

---

**Comment — lanterno, 2026-10-28**

**Decision (Oct 29):** no named owner or admins for now. The seed creates one default admin with username `admin` and password `admin`. That admin must change the password and set up 2FA at first sign-in, and then adds the other admins. Implemented in #13.

Accepted risk: the default password is public, because the repo is public. Anyone can sign in with it until the first sign-in changes it, so do that first sign-in right after every fresh deploy.
