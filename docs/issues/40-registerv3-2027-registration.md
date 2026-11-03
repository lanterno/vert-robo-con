# 40 · RegisterV3: 2027 registration

**State:** open · **Milestone:** M3 · Registration and the admin core · **Labels:** frontend, backend

---

**Route:** `/summits/2027/register` · **Design:** RegisterV3

## Backend

- [ ] `POST /api/registrations`. The server refuses sign-ups outside the registration window
- [ ] A repeat sign-up with the same address re-sends the link instead of creating a duplicate
- [ ] References like `VRC-2027-0142`
- [ ] Store the consent text version and when it was agreed to
- [ ] The confirmation email carries the magic link and an `.ics` file

## Frontend

- [ ] The form island: fields, topic interests, accessibility needs, consent, inline errors
- [ ] A success state with the reference, "check your inbox" and add-to-calendar
- [ ] Closed and not-yet-open states that follow the edition

## Done when

- A Playwright test registers, opens the email in Mailpit, and lands signed in on `/me`

_Backend and frontend parts go in separate commits (and PRs where practical); tests follow in their own commit._

**Depends on:** #39, #14, #15, #17
