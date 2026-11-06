# 5 · Decide: legal entity, legal basis and retention periods for the Privacy page

**State:** closed · **Milestone:** M0 · Decisions · **Labels:** decision, content

---

No form may collect personal data until this exists, so it blocks launch (#49).

## Needs answers

- [x] The legal entity and address that act as data controller
- [x] The legal basis for each purpose: registration, pitches, join requests, jobs, contact, newsletter topics
- [x] Retention periods. Proposal: registrations 24 months after the edition, pitches 24 months, contact messages 12 months, job posts 12 months after closing. The retention jobs in #64 use these
- [x] The processors list: hosting, email provider, backups
- [ ] A legal review of the draft PrivacyV3 text

**Needed by:** the end of M2, so the final Privacy text is ready before registration (M3, #49).

---

**Comment — lanterno, 2026-10-28**

**Decision (Oct 29):** to be discussed later. Leaving this open.

Note: no form that collects personal data can go live without it, so this still blocks registration at launch (#40, #49).

---

## Decided: sensible defaults, recorded in the compliance roadmap

The answers are in [`docs/COMPLIANCE.md`](../COMPLIANCE.md), which also says
why each was chosen. They are defaults drawn from common practice, not legal
advice, and they unblock the build.

- **Legal basis**, by the rule that a form someone fills in to get something
  is contract, answering someone who wrote to us is legitimate interests,
  and marketing email is always consent. Registration, join requests,
  pitches and internships are contract; the enquiry forms, map suggestions,
  job posts and code of conduct reports are legitimate interests; every
  topic email is consent, with double opt-in and one-click unsubscribe.
- **Retention:** registrations and pitches 24 months after the edition;
  join requests, internships, job posts, map suggestion addresses, enquiry
  forms and contact messages 12 months; code of conduct reports 36 months,
  because patterns matter; audit log 12 months; server logs 30 days.
- **Processors:** Hetzner, Amazon SES, Cloudflare, YouTube, Slack and a
  second backup provider, each with where it sits and what it sees. The
  three US ones need a transfer basis confirmed when their DPA is signed.
- **Controller:** a synthetic entity, as the rest of the demo content is. A
  real deployment replaces the name and address.

The Privacy page now shows all of this instead of placeholders.

**Still open, and no longer blocking the build:** the real controller
address (C1), a lawyer's read of the page (C2), and signed DPAs (C3). All
three are needed before the first form collects data in M3, and are tracked
in the compliance roadmap.
