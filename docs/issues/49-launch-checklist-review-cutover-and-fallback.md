# 49 · Launch checklist: review, cutover and fallback

**State:** open · **Milestone:** M3 · Registration and the admin core · **Labels:** infra, testing

---

## Before launch

- [ ] An outside reviewer checks the auth, magic-link and session code, and every finding is fixed or accepted in writing
- [ ] The final Privacy page is published (#5)
- [ ] Inbox placement is tested for the confirmation and magic-link emails on Gmail and Outlook
- [ ] A deploy and a restore have been done using only the runbook (#23)
- [ ] The default `admin` password was changed and 2FA set up right after the first production deploy (#13)
- [ ] The basemap is served from the server (#77)
- [ ] The public URL comes from `SITE_URL` in the server config, not from the code. Remove the hard-coded preview domain from `astro.config.mjs`, `src/lib/constants.ts` and `README.md` (`public/CNAME` goes with the GitHub Pages fallback in #72)

## Cutover

- [ ] Lower the DNS TTL a week before, then point vert-robo-con.example at the server on launch day
- [ ] Keep the GitHub Pages site as a fallback for 30 days
- [ ] Production smoke test: a test registration gets its email and opens My VRC, then it is deleted

**Depends on:** #40, #41, #23, #5, #18
