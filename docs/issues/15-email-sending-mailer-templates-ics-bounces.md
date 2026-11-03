# 15 · Email sending: mailer, templates, .ics, bounces

**State:** open · **Milestone:** M2 · Foundations · **Labels:** backend

---

## Scope

- [ ] A mailer configured entirely from environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM`). The code has nothing specific to one provider; the provider is chosen when the server is set up (#18)
- [ ] Development and tests send to a local Mailpit through the same SMTP settings
- [ ] Templates as typed functions that render HTML and plain text. Every template is previewable in AdminSystemV3 (#47) with sample data
- [ ] A helper that builds `.ics` attachments for registrations and sessions
- [ ] A `POST /api/mail/events` webhook for bounces and complaints, with the provider's adapter picked by config and off when unset. An address that hard-bounces or complains is suppressed
- [ ] Topic emails carry `List-Unsubscribe` and `List-Unsubscribe-Post` headers
- [ ] Sending goes through the job queue (#16), so a slow provider never blocks a request

**Depends on:** #10
