# 6 · Decide: email provider and sending domain, and get DNS access

**State:** closed · **Milestone:** M0 · Decisions · **Labels:** infra, decision

---

> **Moved to #18 (Oct 29):** the email provider and DNS are server configuration, set up with the server. The code only reads SMTP settings from the environment (#15).

Magic links and receipts depend on email landing in inboxes. Start now, because provider approval and DNS checks take days.

## Done when

- [ ] Provider chosen. Default: Amazon SES in eu-central-1, with Postmark as the fallback. Production access requested (AWS can take up to 96 hours)
- [ ] Someone with access to the vert-robo-con.example DNS is named
- [ ] SPF, DKIM and DMARC are published for the sending domain, covering both the provider and the hello@ mailbox
- [ ] Credentials go into the server's secret store only, never into the repo, an issue or a log

---

**Comment — lanterno, 2026-10-28**

**Decision (Oct 29):** the provider and DNS will be configured later. Leaving this open.

Until then, development and tests send email to a local Mailpit. Production registration (#40) and the launch (#49) still need this, because magic links and receipts are sent by email.

---

**Comment — lanterno, 2026-10-28**

**Changed (Oct 29):** this isn't a development decision. The email provider and DNS are server configuration, set up together with the server, so this moved into #18.

The code reads its SMTP settings from environment variables and has nothing specific to one provider (#15). Development uses Mailpit.
