# 18 · Provision and configure the production and staging servers (including email and DNS)

**State:** open · **Milestone:** M2 · Foundations · **Labels:** infra

---

## Scope

- [ ] Production: a Hetzner dedicated or cloud server, Ubuntu 24.04, in FSN1 or HEL1. Staging: a small cloud server. Sign Hetzner's data processing agreement
- [ ] Harden both:
  - SSH keys only, no root login
  - ufw allowing only 22, 80 and 443
  - unattended security upgrades and fail2ban
- [ ] Docker Engine and the Compose plugin
## Email and DNS (configured at server setup, not in code)

- [ ] Choose the email provider (for example Amazon SES or Postmark), request production sending, and sign its data processing agreement
- [ ] Put the SMTP settings from #15 and the Cloudflare Web Analytics token from #38 in the server's `.env`. They are never committed or printed
- [ ] DNS for vert-robo-con.example:
  - A/AAAA records for production and staging
  - SPF, DKIM and DMARC covering the email provider and the hello@ mailbox
- [ ] Point the provider's bounce and complaint webhook at `/api/mail/events`
- [ ] Send a test email from each server and check that it lands in the inbox

## Access

- [ ] Record who holds access in the runbook (#23). Keys and passwords are never recorded there

**Depends on:** #1
