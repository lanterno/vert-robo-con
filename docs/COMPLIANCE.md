# Compliance

Everything the site has to get right about personal data, security and
access, in one place. [`docs/ROADMAP.md`](ROADMAP.md) says what gets built
and when; this says what it has to satisfy, and who answers the questions
that aren't engineering ones.

Vert Robo Con is a fictional organisation and all its content is synthetic.
The decisions below are **sensible defaults drawn from common practice**, so
the build isn't blocked waiting for answers. They are not legal advice. A
real deployment replaces the controller details in "Who we are" and has a
lawyer check the Privacy page before any form collects data from a real
person; both are tracked under [Still to do](#still-to-do).

## Where we are

| | |
| --- | --- |
| **Law we build to** | UK GDPR and EU GDPR, plus PECR/ePrivacy for email and cookies. Hosting is in the EU |
| **Personal data today** | None. No form on the site collects anything yet; the first is registration in M3 |
| **Cookies today** | None. Analytics is cookieless (#8), so there is no banner |
| **Accessibility** | WCAG 2.1 AA, checked on every page at two widths on every pull request (#76) |

The build is unblocked: [#5](issues/05-decide-legal-entity-legal-basis-and-retention-periods-for-th.md)
has working answers, recorded below and used by the Privacy page.

## Decisions

### Who we are

The data controller. **A real deployment must replace this**; the values
below are synthetic, in the same style as the rest of the demo content.

| | |
| --- | --- |
| Controller | Vert Robo Con e.V. |
| Address | [REGISTERED ADDRESS] — synthetic; a real deployment puts its own here |
| Privacy contact | hello@vert-robo-con.example |
| We reply within | 30 days, the limit GDPR sets for a request about someone's own data |

### Legal basis and retention, per purpose

The defaults: a form someone fills in to get something is **contract**;
answering someone who wrote to us is **legitimate interests**; marketing
email is always **consent**. Nothing uses "legitimate interests" where the
person would reasonably expect to be asked.

| What | Legal basis | Why that one | Kept for |
| --- | --- | --- | --- |
| Summit registration | Contract | They asked for a place; we send the confirmation, calendar invite and join link to provide it | 24 months after the edition |
| Join requests | Contract | They asked to join the community; the invite is how we deliver it | 12 months after a decision |
| Pitches | Contract | They entered a call we run, and we owe them an outcome | 24 months after the edition |
| Internship applications | Contract (steps before a contract) | They applied for a placement | 12 months after the decision, so we can revisit near misses |
| Map suggestions | Legitimate interests | Keeping a public dataset accurate. The organisation data isn't personal; the suggester's address is | Address: 12 months after review. Organisation entry: while it is on the map |
| Job posts | Legitimate interests | Running a board the network asked for | 12 months after the listing closes |
| Sponsor, volunteer, project and speaker forms | Legitimate interests | Replying to someone who contacted us | 12 months after we reply |
| White paper contributions | Legitimate interests | Crediting and following up on a contribution | 24 months after the next edition |
| Code of conduct reports | Legitimate interests (safety) | Protecting people at the summit and in the community. Access is limited to the owner | 36 months after the report closes, because patterns matter |
| Contact and consulting messages | Legitimate interests | Answering an enquiry they started | 12 months after we reply |
| Topic emails: summit news, digest, job alerts, new videos | **Consent** | Marketing email. Double opt-in, one-click unsubscribe, and the consent record kept as proof | Until withdrawn. The consent record: 24 months after that |
| Admin accounts | Contract | Running the service | While they are an admin |
| Audit log | Legitimate interests | Security, and answering "who changed this" | 12 months |
| Server and email delivery logs | Legitimate interests | Keeping the service up and mail arriving | 30 days |
| Analytics | Legitimate interests | Cloudflare Web Analytics counts visits with no cookies and no cross-site tracking, so there is nothing to consent to | Aggregates only; no personal data reaches us |

Three rules follow from the table, and the build has to honour them:

- **Marketing is never bundled.** Registering for the summit does not
  subscribe anyone to anything. The topic checkboxes are separate, unticked,
  and each is its own consent (#40, #65).
- **Legitimate interests can be objected to.** Every email we send on that
  basis says how to stop it, and My VRC can delete the record (#63, #64).
- **A retention period is a job, not a promise.** The nightly job in #64
  enforces every period in this table and logs the counts.

### Who processes it

Each needs a data processing agreement (Art 28) before it handles real data;
see [Still to do](#still-to-do).

| Processor | Where | What it sees | When |
| --- | --- | --- | --- |
| Hetzner | Germany or Finland | The site, its database and encrypted backups | Always |
| Amazon SES | eu-central-1, Frankfurt | Email addresses and the messages we send | Only when we email |
| Cloudflare | Global | Page counts. No cookies, no personal data | On public pages |
| YouTube | Global | Nothing until someone presses play, through youtube-nocookie.com | Only on play |
| Slack | Global | Whatever someone gives it when they join | Only if they join Slack |
| Second backup provider | To be chosen in #20 | Encrypted backups it cannot read | Always |

**Transfers out of the EU.** Cloudflare, YouTube and Slack are US companies.
Each must be covered by the EU–US Data Privacy Framework or by standard
contractual clauses, confirmed when the DPA is signed. Hetzner and SES keep
data in the EU, which is why they carry everything that matters.

### Cookies

| Where | What |
| --- | --- |
| Public pages | None at all |
| My VRC | One strictly necessary cookie holding the sign-in session, 30 days (#14) |
| Admin | Strictly necessary sign-in cookies, admins only (#13) |

No consent banner, because nothing here needs consent. Keeping it that way
is a constraint on every future change: anything that would add a tracking
cookie needs a banner, and that is a decision, not an implementation detail.

### Rights, and how someone uses them

Every right is self-service, which is the point of My VRC: no one has to ask
us, and we cannot be slow.

| Right | How | Built in |
| --- | --- | --- |
| See it | My VRC lists everything held for an address | #41, #63 |
| Fix it | Edit a registration, application or listing | #41, #63 |
| Delete it | One item or everything, with backups ageing out on their own schedule | #64 |
| Take it with you | Download everything as one JSON file | #64 |
| Object / withdraw consent | One-click unsubscribe, and email preferences in My VRC | #65, #63 |

A request that arrives by email instead is answered within 30 days. The
runbook (#23) carries the steps.

## Still to do

Nothing here blocks M1 or M2. The first three block **M3**, because that is
when the first form collects real data.

| | What | Who | By |
| --- | --- | --- | --- |
| C1 | Replace the controller name and address with the real entity | The organisation | Before M3 |
| C2 | Have a lawyer read the Privacy page against these decisions | The organisation | Before M3 |
| C3 | Sign a DPA with Hetzner, Amazon SES, Cloudflare and the backup provider, and confirm each transfer basis | Whoever sets up the servers (#18, #20) | Before M3 |
| C4 | Write the record of processing activities (Art 30), from the table above | Developer | Before M3 |
| C5 | Write the breach procedure into the runbook: assess, notify the authority within 72 hours, tell people without delay if the risk is high | Developer (#23) | M2 |
| C6 | Screen for a DPIA and write down the answer. Expected: not required, since there is no large-scale or sensitive profiling | Developer | Before M3 |
| C7 | Decide a minimum age for registration and the community, and say it on the form | The organisation | Before M3 |
| C8 | Outside review of the sign-in and magic-link code | Arranged by the organisation (#49) | Before M3 |
| C9 | Decide what happens to responses the old tools collected (#72) | The organisation | After the summit |
| C10 | Re-read this page each year, and whenever a processor or a form changes | Developer (#73) | Yearly |

## What already holds

These are decided and built, and should not quietly regress.

- **No third-party scripts.** The site loads none, so nothing can track a
  visitor without us adding it (checked by a test on the map page, the only
  page that ever loaded one).
- **Cookieless analytics** (#8), with the token only in the build's
  environment, so a fork or a local build sends nothing.
- **Videos load nothing until play**, through youtube-nocookie.com.
- **No outside forms.** Every form is on the site, so no third party ever
  receives a submission. A link check fails the build if one appears (#76).
- **Accessibility** is WCAG 2.1 AA, enforced on every page at two widths,
  including contrast on gradients, which the usual tooling skips (#24, #76).
- **Admin access needs two factors**, cannot opt out, and every action is
  logged (#13).
- **Sign-in links are single-use**, expire in 30 minutes, and are stored
  only as hashes (#14).
- **Backups are encrypted**, kept in a second region and a second provider,
  and the restore is drilled, not assumed (#20).
