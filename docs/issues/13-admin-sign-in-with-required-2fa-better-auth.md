# 13 · Admin sign-in with required 2FA (better-auth)

**State:** open · **Milestone:** M2 · Foundations · **Labels:** backend

---

## Scope

- [ ] Add better-auth with its Drizzle adapter, and the `twoFactor`, `passkey` and `admin` plugins
- [ ] Apart from the default admin, admins are invite-only. An invite link expires in 72 hours, and the new admin sets a password and then 2FA before seeing anything
- [ ] 2FA is required for every admin and cannot be turned off. Two methods are offered: a passkey or an authenticator app (TOTP). 10 recovery codes are shown once
- [ ] Roles: `owner` and `admin`. Both can do everything, except that only the owner adds or removes admins
- [ ] Any admin can reset another admin's 2FA. The reset is logged, and both people get an email
- [ ] Sessions: an HttpOnly, Secure, SameSite=Lax cookie, 12-hour idle timeout, with sign-out everywhere on a password or 2FA change
- [ ] Rate limits on sign-in, 2FA and recovery-code attempts
- [ ] Every admin action is written to `audit_events` (who, what, when, from which IP)
- [ ] **Default admin (decided in #4):** the seed creates one `owner` account with username `admin` and password `admin`, flagged `mustChangePassword`
  - At the first sign-in the admin must set a new password and then set up 2FA before seeing anything else. `admin` is refused as the new password
  - Until that is done, every other admin page and admin API answers with a redirect to the change-password screen
  - The app logs a warning at startup while the default password is still active, and AdminDashboardV3 shows a banner
  - The default admin then invites the other admins

## Done when

- An unauthenticated or non-2FA session cannot reach any `/admin` page or admin API
- Tests cover the default admin's forced password change and 2FA setup, invite, enrolment, sign-in, a recovery-code sign-in, a 2FA reset, and an owner-only action refused for an admin

**Depends on:** #11
