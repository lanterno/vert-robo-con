# VRC roadmap: from today's site to the V3 designs

Vert Robo Con (VRC) is a fictional organisation; every name, figure and address in this plan is demo content.

## The goal

Today the VRC site is a brochure. People can read about past summits and browse the map, but they can't register, pitch, apply or join on it, and every content change needs a developer. The V3 designs turn it into the place where the community does all of that, and where a small organising team runs the summit from one admin.

One developer builds it, one milestone at a time. Everything the next summit depends on comes first, and everything else follows after the summit.

## What changes for each group

| Who | Today | After this roadmap |
| --- | --- | --- |
| Visitors | Read about past summits and browse the map | A faster site in the new look that works on phones: the summit and its program, recordings, research, news, people, jobs, and a filterable map with open data downloads |
| Attendees | Can't register on the site | Register in a minute, get a calendar invite, a reminder and the join link, save sessions to a personal agenda, and manage it all in My VRC |
| Founders and researchers | Can't pitch on the site | Pitch to the summit, save a draft and finish later, and follow the review in My VRC |
| Community members | Follow an outside link to join | Ask to join and get the invite once approved, choose which emails to get, post and find jobs, and suggest organisations for the map |
| The organising team | Ask a developer for every change | Set up each edition, review every submission in one queue, build the program, and see what needs attention on a dashboard, behind a secure sign-in |

## Product principles

- **Everything happens on the site.** No outside forms, spreadsheets or shared files.
- **No passwords for visitors.** They sign in with a link sent by email.
- **People own their data.** Anyone can download or delete what we hold about them, and analytics use no cookies.
- **Built for a small team.** One admin for everything, and no extra tools to run, learn or pay for.
- **The summit first.** Anything the next summit doesn't need waits until after it.
- **Demo data only.** All content and test data is synthetic.

## Milestones

The milestones ship in this order. Each one is a [GitHub milestone](https://github.com/lanterno/vert-robo-con/milestones) with the same name, and [#74](https://github.com/lanterno/vert-robo-con/issues/74) lists every issue.

| Milestone | What people get |
| --- | --- |
| M0 · Decisions | The choices that shape the product. Only privacy is still open |
| M1 · Public site without a database | The new public site, live for every visitor |
| M2 · Foundations | Nothing visible yet: sign-in, email and storage, ready for the features that need them |
| M3 · Registration and the admin core | Registration for the next summit, My VRC, and the first admin screens |
| M4 · Pitch calls and moderation | Pitching, joining the network and the contact form, all reviewed in one queue |
| M5 · Program and summit emails | The program with a personal agenda, reminders and join links |
| M6 · Summit | A calm, watched summit |
| M7 · After the summit | Recordings, then everything that could wait |

### M1 · Public site without a database

**Visitors** get the whole public site in the V3 look: home, the summit and past programs, recordings, the research reader, the map with its data downloads, people, news, get involved, jobs, contact and privacy. Every page works on phones, old links keep working, and pages show a proper preview when shared.

Forms that aren't built yet show their state, such as "Coming soon", instead of sending people to an outside tool. Content still changes through the developer at this point.

**Ready when:** every page has been checked on desktop and phone and passes the automated accessibility and link checks, and the new site replaces the old one.

**Tracked in:** #75, #76, #24–#38

### M2 · Foundations

Nothing changes for visitors yet. This milestone gives the product what the interactive features need: a place to keep submissions, secure sign-in for the team, sign-in links for visitors, email that arrives, spam protection, and servers with backups and monitoring.

**Ready when:** the test site runs end to end, nobody on the team can sign in without two-factor authentication, and a backup has been restored by following the written runbook.

**Tracked in:** #9–#23

### M3 · Registration and the admin core

**Attendees** can register for the next summit. They get a confirmation with a calendar invite and a sign-in link, and in My VRC they can see, cancel, download or delete their registration.

**The team** sets each edition's details and registration window without a developer, sees and exports registrations, manages admins, and checks that the system is healthy. The site moves to its own server, and the map stops loading tiles from third parties.

Before registration opens: someone outside the project reviews the sign-in code, the final privacy text is published, emails land in inboxes rather than spam, and the default admin password has been changed.

**Ready when:** registration is open on the new server.

**Tracked in:** #39–#44, #46–#49, #77

### M4 · Pitch calls and moderation

**Founders and researchers** pitch through a short multi-step form, can save it and come back, and follow the outcome in My VRC.

**Community members** ask to join. The team approves each request by hand, and the invite arrives by email, never on a public page.

**Anyone** can use the contact form or send a consulting enquiry, and gets a receipt with a reference number.

**The team** reviews every kind of submission in one queue, scores pitches together, and sends all decisions at once.

**Ready when:** a test pitch goes from the form through review to a decision email, and shows its status in My VRC.

**Tracked in:** #50–#54

### M5 · Program and summit emails

**Attendees** browse the program, save sessions to a personal agenda and calendar feed, get a reminder and their join link, and see what's on now and next during the summit.

**The team** builds the program on a day grid, turns accepted pitches into sessions, and sees the day's priorities on the full dashboard.

**Ready when:** a full rehearsal passes: register, get the reminder and the join link, open My VRC, download your data, delete it. Registration also holds up under ten times the expected peak.

**Tracked in:** #61, #62, #66, #67, #69

### M6 · Summit

First a buffer for late program changes, then a freeze: in the run-up to the summit only content changes and urgent fixes go live. During the summit the developer watches uptime and email delivery, and checks that every attendee received their join link.

**Tracked in:** #70

### M7 · After the summit

Recordings come first: each session links its video, and speakers' pages show where they appear. Then, in this order:

1. The team edits news, videos, people, partners and documents themselves (#45)
2. The community suggests organisations and corrections for the map, and the team moderates them (#55, #56)
3. A jobs board, and applications for internships (#57, #58)
4. The smaller forms: sponsors, speaker recommendations, volunteers, programme interest, research topics and reports of concern (#59), then an end-to-end check of every submission type (#60)
5. My VRC shows every submission and email preferences (#63), data download and retention cover everything (#64), and topic emails with a monthly digest (#65)
6. Printable PDFs of the program, the white paper and the sponsor deck (#68)
7. The old tools are switched off (#72), then a retrospective and a maintenance routine (#73)

**Tracked in:** #71, #45, #55–#60, #63–#65, #68, #72, #73

## Open decisions

- **Privacy (#5):** the legal entity, the legal basis and how long data is kept. It's needed before registration opens, because no form may collect personal data until it's settled.
- **When registration opens (#3):** the designs show registration opening together with the new site, but on this plan it arrives two milestones later, in M3. At the end of M1, choose between keeping this order, or building registration first and launching it in today's look. The opening date is an admin setting, so either choice is a setting, not a code change.
- **Old form responses (#72):** what happens to responses collected by the old tools. Decided after the summit.

## Decisions made

| Question | Answer | Issue |
| --- | --- | --- |
| How it's built | One web app, one database and one server, with no CMS or extra tools | #1 |
| Who builds it | One developer | #2 |
| Edition and call dates | Set in the admin, so they can move without a developer | #3 |
| The first admin | A default admin account that must set a new password and two-factor authentication at its first sign-in, then invites the rest of the team | #4, #13 |
| Email provider and domain | Chosen when the server is set up | #6, #18 |
| Copy | The copy on the design canvas ships as it is | #7 |
| Analytics | Cloudflare Web Analytics, which uses no cookies | #8, #38 |

## How it's built

One TypeScript web app serves the public site, My VRC and the admin, with one database on one server. Visitors sign in with email links, and the team signs in with a password and two-factor authentication. There is no separate CMS, newsletter tool or sign-in service to run. The details are in [`ARCHITECTURE.md`](../ARCHITECTURE.md).

## Page by page

| Page (design board) | First version, read-only | Interactive features |
| --- | --- | --- |
| HomeV3 | M1 | Join the network, M4 |
| SummitV3 | M1 | "Register" and the live edition state, M3 |
| ProgramV3 | M1, past editions | Personal agenda, calendar feed and join links, M5 |
| RegisterV3 | — | M3 |
| GetInvolvedV3 | M1 | Pitch calls, M4; the smaller forms, M7 |
| MyVRCV3 | — | Registrations, M3; pitches and join requests, M4; everything else, M7 |
| PhoneV3 | M1 | Follows each desktop page |
| MapV3 | M1, with data downloads | Self-hosted map tiles, M3; suggestions, M7 |
| ResearchV3 | M1, the reader | Suggest an edit, M7 |
| WatchV3 | M1 | New-video emails, M7 |
| JobsV3 | M1, layout only | Listings and applications, M7 |
| ContactV3 | M1, FAQ and email link | Contact and consulting forms, M4 |
| NewsV3 | M1 | Monthly digest signup, M7 |
| PeopleV3 | M1 | — |
| PrivacyV3 | M1, draft | Final text before registration opens (#5) |
| AdminEditionV3, AdminRegistrationsV3, AdminUsersV3, AdminSettingsV3, AdminSystemV3 | — | M3 |
| AdminDashboardV3 | — | First version M3, full version M5 |
| AdminQueueV3, AdminPitchesV3 | — | M4 |
| AdminProgramV3 | — | M5 |
| AdminContentV3, AdminMapV3 | — | M7 |

StackV3 is a reference board for an earlier stack proposal; #1 replaces it.

## Risks

| Risk | Effect on people | How we handle it |
| --- | --- | --- |
| One developer | Features arrive later than hoped | Summit-critical work first; everything else waits until after the summit |
| Only one person knows the system | Outages and fixes wait for that person | Automated tests, and a runbook someone else could follow, proven by a restore that uses only the runbook (#20, #23) |
| Registration isn't ready when the designs promise | People can't register when they expect to | Decide at the end of M1; the opening date is an admin setting |
| One server | An outage takes the site down | Frequent backups, a tested restore, and a read-only copy of the public pages served while the app is down (#20) |
| Email lands in spam | Sign-in links, receipts and join links don't arrive | Email authentication set up with the server, and an inbox test before launch (#18, #49) |
| The default admin password is public | Anyone could sign in to a fresh install | Change it right after every fresh install (#13, #49) |
| An admin loses their two-factor device | They're locked out of the admin | Recovery codes, another admin can reset it, and a recovery step in the runbook (#23) |
| Privacy text isn't ready | Registration can't open | Settle #5 before M3 starts |
| The community invite link is passed around | Unapproved people join | The link appears only in approval emails, and it is rotated (#53) |

## Not planned

- paid or in-person tickets, check-in and badges
- a public member directory
- file uploads for CVs and decks; links only
- importing old social media posts
- running the Field Skills Course and the Schools Programme themselves; only their on/off switches are in scope
- running our own geocoding server
