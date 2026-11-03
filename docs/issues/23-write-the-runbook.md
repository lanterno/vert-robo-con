# 23 · Write the RUNBOOK

**State:** open · **Milestone:** M2 · Foundations · **Labels:** documentation, infra

---

## Sections

- [ ] Deploy, and roll back
- [ ] Restore from backup, with the last drill's timings
- [ ] Rotate each secret (provider keys, session secret, database password) without downtime
- [ ] An admin is locked out of 2FA: another admin resets it, or, if no admin can sign in, the owner-recovery steps from the server shell
- [ ] The Slack invite link leaked or expired
- [ ] Email is landing in spam
- [ ] Who has server access, and who is on call during summit week

Gate: one deploy and one restore have been done from start to finish on staging, following only this document.

**Depends on:** #20
