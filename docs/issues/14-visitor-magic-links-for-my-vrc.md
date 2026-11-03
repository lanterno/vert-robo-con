# 14 · Visitor magic links for My VRC

**State:** open · **Milestone:** M2 · Foundations · **Labels:** backend

---

Visitors never get passwords. Their email address is their identity.

## Scope

- [ ] `POST /api/me/link` sends a sign-in link and always answers the same way, so it doesn't reveal whether an address is known
- [ ] Tokens are 32 random bytes, stored only as a hash. They are single-use and expire in 30 minutes
- [ ] The session lasts 30 days on a separate cookie from the admin one
- [ ] Rate limits: per address, and per IP address
- [ ] Every confirmation email (registration, pitch, job, map suggestion) carries a link that signs the visitor straight in, using the same tokens

## Done when

- Tests cover an expired token, a reused token, and two tabs racing for one token

**Depends on:** #11
