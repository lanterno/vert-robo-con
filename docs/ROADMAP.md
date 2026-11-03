# VRC roadmap: from today's site to the V3 designs

Vert Robo Con (VRC) is a fictional organisation; every name, figure and address in this plan is demo content.

## The goal

Today the VRC site is a brochure. People can read about past summits and browse the map, but they can't register, pitch, apply or join on it, and every content change needs a developer. The V3 designs turn it into the place where the community does all of that, and where a small organising team runs the summit from one admin.

One developer builds it, one milestone at a time. Everything the next summit depends on comes first, and everything else follows after the summit.

## What changes for each group

| Who | Today | After this roadmap |
| --- | --- | --- |
| Visitors | Read about past summits and browse the map | A faster site in the new look that works on phones: the summit and its program, recordings, research, news, people, jobs, and a filterable map with open data downloads |
| Attendees | Can't register on the site | Hear when registration opens, register in a minute, get a calendar invite, a reminder and the join link, save sessions to a personal agenda, and manage it all in My VRC |
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

The milestones ship in this order. [`docs/issues/`](issues/README.md) has every issue, grouped by milestone, and [#74](issues/74-plan-from-today-s-site-to-the-v3-designs.md) lists them in build order.

| Milestone | What people get |
| --- | --- |
| M0 · Decisions | The choices that shape the product. Only privacy is still open |
| M1 · Public site without a database | The new public site, live for every visitor |
| M2 · Foundations | Nothing visible yet: sign-in, email and storage, ready for the features that need them |
| M3 · Registration and the admin core | Summit sign-ups, registration for the next summit, My VRC, and the first admin screens |
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

**Anyone** can sign up for summit news. They confirm their address, then hear when registration opens, when the pitch calls open, and when the program is published. Every email has a one-click unsubscribe.

**Attendees** can register for the next summit. They get a confirmation with a calendar invite and a sign-in link, and in My VRC they can see, cancel, download or delete their registration.

**The team** sets each edition's details and registration window without a developer, sees and exports registrations, manages admins, and checks that the system is healthy. The site moves to its own server, and the map stops loading tiles from third parties.

Before registration opens: someone outside the project reviews the sign-in code, the final privacy text is published, emails land in inboxes rather than spam, and the default admin password has been changed.

**Ready when:** registration is open on the new server.

**Tracked in:** #39–#44, #46–#49, #77

**Tracked here:**

- [ ] Summit sign-ups: an email address and the "Summit news" topic, with double opt-in, one-click unsubscribe and the spam check. The "notify me" forms on the home, summit, register and contact pages, and "Remind me" on the pitch cards, use it. Until M7 they offer only this topic, and sign-ups for other topics (videos, news, jobs, the footer digest) show "Coming soon"
- [ ] An automatic "Registration is open" email to everyone signed up, when the registration window opens
- [ ] "Download my data" and "Delete everything" in My VRC include the sign-up
- [ ] A banner across the site, set in Settings or on an edition, to announce registration (AdminSettingsV3, AdminEditionV3)

### M4 · Pitch calls and moderation

**Founders and researchers** pitch through a short multi-step form, can save it and come back, and follow the outcome in My VRC.

**Community members** ask to join. The team approves each request by hand, and the invite arrives by email, never on a public page.

**Anyone** can use the contact form or send a consulting enquiry, and gets a receipt with a reference number.

**The team** reviews every kind of submission in one queue, scores pitches together, and sends all decisions at once.

**Ready when:** a test pitch goes from the form through review to a decision email, and shows its status in My VRC.

**Tracked in:** #50–#54

**Tracked here:**

- [ ] An automatic email to summit sign-ups when each pitch call opens
- [ ] "Ask the authors" on the research pages opens the contact form with the research topic chosen (ResearchV3)

### M5 · Program and summit emails

**Attendees** browse the program, save sessions to a personal agenda and calendar feed, get a reminder and their join link, and see what's on now and next during the summit.

**The team** builds the program on a day grid, turns accepted pitches into sessions, and sees the day's priorities on the full dashboard.

**Ready when:** a full rehearsal passes: register, get the reminder and the join link, open My VRC, download your data, delete it. Registration also holds up under ten times the expected peak.

**Tracked in:** #61, #62, #66, #67, #69

**Tracked here:**

- [ ] An automatic email to summit sign-ups when the program is published
- [ ] Upcoming deadlines on the dashboard, from the edition and call dates (AdminDashboardV3)

### M6 · Summit

First a buffer for late program changes, then a freeze: in the run-up to the summit only content changes and urgent fixes go live. During the summit the developer watches uptime and email delivery, and checks that every attendee received their join link.

**Tracked in:** #70

### M7 · After the summit

Recordings come first: each session links its video, and speakers' pages show where they appear. Then, in this order:

1. The team edits news, videos, people, partners and documents themselves (#45)
2. The community suggests organisations and corrections for the map, and the team moderates them (#55, #56)
3. A jobs board, and applications for internships (#57, #58)
4. The smaller forms: sponsors, speaker recommendations, volunteers, programme interest, research topics and reports of concern (#59), then an end-to-end check of every submission type (#60)
5. My VRC shows every submission and email preferences (#63), data download and retention cover everything (#64), and the other topic emails: the monthly digest, job alerts and new videos (#65)
6. Printable PDFs of the program, the white paper and the sponsor deck (#68)
7. The old tools are switched off (#72), then a retrospective and a maintenance routine (#73)

**Tracked in:** #71, #45, #55–#60, #63–#65, #68, #72, #73

**Tracked here:**

- [ ] "Propose a project", with the smaller forms (GetInvolvedV3)
- [ ] "Book an intro call" after a consulting enquiry (ContactV3). An outside booking page would break "Everything happens on the site", so settle how it books before building it
- [ ] Version history with restore for editions and map organisations (AdminEditionV3, AdminMapV3)
- [ ] Making registration questions required or optional, and versions of the consent wording (AdminEditionV3)
- [ ] The map snapshot on the dashboard (AdminDashboardV3)
- [ ] Transcript downloads for recordings (ProgramV3, WatchV3)

## Open decisions and checkpoints

Privacy is the only question with no answer yet. The other two are settled, with a date to look at them again.

- **Privacy (#5), open:** the legal entity, the legal basis and how long data is kept. It's needed before registration opens, because no form may collect personal data until it's settled.
- **When registration opens (#3), checkpoint at the end of M1:** Dec 7 for registration and Dec 8 for the startup pitch call. The designs show registration opening together with the new site, while on this plan it arrives two milestones later, in M3. If registration isn't ready by then, the fallback is to launch the site on Dec 7 and open both on Jan 11. The dates are admin settings, so either way it is a setting, not a code change.
- **Old form responses (#72), after the summit:** what happens to responses collected by the old tools.

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
| Summit sign-ups | In M3, so people hear when registration and the pitch calls open. The other topic emails stay in M7 | — |

## How it's built

One TypeScript web app serves the public site, My VRC and the admin, with one database on one server. Visitors sign in with email links, and the team signs in with a password and two-factor authentication. There is no separate CMS, newsletter tool or sign-in service to run. The details are in [`ARCHITECTURE.md`](../ARCHITECTURE.md).

## Working on it

This section is for whoever picks up the build, whether a person or an agent.

### Where things are decided

- **The issue says what to build.** Each one lists its routes, its design boards, a checklist, and what it depends on. They are in [`docs/issues/`](issues/README.md), one file each; `#N` anywhere in these docs means the file there that starts with that number. Smaller work with no issue is listed under its milestone as "Tracked here", and its line in "The designs, stage by stage" is its spec.
- **[`ARCHITECTURE.md`](../ARCHITECTURE.md) says how.** Where a design board disagrees with it, the architecture wins.
- **The design canvas shows the look, the copy and every state.** Build only the parts the issue asks for, not everything on the board.
- **This file says the order**, and which parts of each board belong to which milestone ("The designs, stage by stage" below).

### Where to start

Work through the milestones in order. Within a milestone, follow each issue's "Depends on" line. M1 goes like this:

1. #75 removes TinaCMS, and #76 adds the checks that every later pull request runs
2. #24 adds the design tokens and fonts, then #25 the shared components. #26, the data layer, can be built alongside them
3. The pages, #27–#37, in any order
4. #38 (redirects, 404, sitemap and analytics), once the home page is in

M2 starts with #10 (server mode) and #11 (the database), and the rest follow their dependencies. Two decisions fall along the way: when registration opens (#3), at the end of M1, and privacy (#5), before M3 starts.

### Taking a piece of work

- **Read three things first:** the issue (or the "Tracked here" item), its design boards, and each board's lines below. Build what the current milestone's line says.
- **Later parts wait.** Parts from later milestones show their state, such as "Coming soon", and never link to a form or file outside the site.
- **Some things stay out.** Don't build anything under "Not planned" or "Taken out of the designs".
- **Every page** works on a phone, passes the accessibility and link checks (#76), and uses synthetic data only.
- **When it's done,** tick the issue's checklist in its file under [`docs/issues/`](issues/README.md), set its state to closed, and tick it in #74. For work tracked here, tick its box in this file. All of it goes in the same commit as the work.
- **Commits** have one goal each. Tests go in their own commit, right after the code they cover. Frontend and backend changes never share a commit. Messages follow the existing style, `type(scope): Sentence`, for example `docs: Rewrite the roadmap for one developer`.

### Reading the designs

- **The boards are in the repo,** under [`project/`](../project), one file per board: `project/<Board>.dc.html`. Read the whole file. Boards run to 700–1,100 lines, mostly inline styles, and the details are spread throughout. Nothing has to be fetched to build a page.
- **[`project/canvas.json`](../project/canvas.json)** is the board index: every board's file name, its title, its size, and which of the two canvas pages it belongs to — `v3` for the public site and My VRC, `admin` for the admin.
- **The canvas** is at <https://claude.ai/artifact/QAypGFVvBEvBA8EhqBXGTx>, and is public. It is the nicer way to look at a board, but `project/` is the copy that is built from. If the two disagree, re-export the board rather than building from the canvas.
- **The boards load fonts from Google** and expect a `support.js` that only the canvas provides. Both are canvas scaffolding, not the spec: #24 self-hosts the fonts, and the site ships no third-party font requests.
- **The canvas-control bar:** the grey "Canvas control" bar at the top of a board is not part of the page. It switches between the states the page has to handle, such as opens soon, open, closed, errors and empty. Each one is a state to build and test.
- **Phone layouts:** PhoneV3 shows the phone layout. Every other page follows the same patterns at phone width.
- **Copy and placeholders:** the copy ships as it is (#7). Text in `[BRACKETS]` is a placeholder. Fill it from the synthetic data (#26), or leave it as a placeholder; never invent real-looking facts.

## The designs, stage by stage

The V3 design canvas has 15 public boards and 11 admin boards. Most boards ship in pieces: a first version when the page or screen is built, then each interactive part in the milestone that builds the feature behind it. Until a part ships, the page shows its state, such as "Coming soon", and never sends people to an outside tool.

The boards were first drawn for an earlier stack: Payload, listmonk, authentik, a tailnet and site rebuilds. On November 4, 2026 they were brought in line with this plan; "Taken out of the designs" below lists what went. If a board still disagrees with [`ARCHITECTURE.md`](../ARCHITECTURE.md), the architecture wins.

### Public pages

**HomeV3**, and the phone's Home tab
- M1: the hero, the summit card with the edition state, map stats, ways in, principles and the latest news (#27)
- M3: "notify me" for summit news (tracked here)
- M4: the join sheet, for Slack or email-only updates (#53)
- M7: "notify me" for the other topics: the digest, new videos and job alerts (#65)

**SummitV3**
- M1: the summit overview and edition pages, with speakers and the person drawer, partners, and recaps of past editions. The edition state comes from its dates (#28)
- M3: "Register free" and the registration states: opens soon, open, closing soon (#40); "notify me" and the pitch cards' "Remind me", for summit news (tracked here)
- M4: the startup and research pitch cards open (#51)
- M5: the live state, with what's on now and next and "Open my agenda" (#62)
- M7: recordings in editing, then published (#71); the sponsor and speaker forms (#59)

**ProgramV3**
- M1: past programs with day tabs, filters, search, time zones, session pages and an `.ics` file per session (#29)
- M5: the 2027 program, provisional and then published; starred sessions saved to the registration, a personal calendar feed, join links for registrants, and the Now/Next strip (#61, #62); "email me when the program is published", for summit news (tracked here)
- M7: recordings on each session (#71) and the program as a PDF (#68); transcript downloads (tracked here)

**RegisterV3**
- M3: the form, its confirmation with calendar links, and the opens-soon, closing-soon and closed states (#40); "notify me when registration opens" (tracked here)

**GetInvolvedV3**
- M1: who it's for, sponsor tiers, the FAQ, volunteer roles, and community projects with their status (#35)
- M4: the startup and research pitch forms with "Save and finish later" (#51), and the join sheet (#53)
- M7: sponsor interest, recommend a speaker, volunteer, and register interest in a programme (#59); "Propose a project" (tracked here); the sponsor deck as a PDF (#68)

**MapV3**, and the phone's Map tab
- M1: the map on MapLibre with filters, search, organisation cards, a keyboard-friendly list, and CSV, JSON and GeoJSON downloads with "How to cite" (#32)
- M3: the basemap served from our own server (#77)
- M4: the join sheet (#53)
- M7: the data moves into the database (#55); "Suggest an organisation" and "Suggest an edit" (#56)

**ResearchV3**
- M1: the white paper reader and the three codes, with contents, deep links and citations in APA and BibTeX (#31)
- M4: "Ask the authors", through the contact form (tracked here)
- M7: suggest an edit, propose a research topic, join the research team, and report a concern (#59); the white paper as a PDF (#68)

**WatchV3**
- M1: the library with shelves and filters, video pages with the privacy-enhanced player, and the series (#30)
- M7: the 2027 recordings, marked "Recording in editing" until each is published (#71); "email me new videos" (#65); transcript downloads (tracked here)

**JobsV3**
- M1: the layout, an empty state, and the internship tracks with their status (#36)
- M7: listings with filters and "Post a job", reviewed before they appear (#57); internship applications with a link to a CV (#58); job alerts (#65)

**ContactV3**
- M1: the FAQ, routing by topic, and the email fallback (#37)
- M3: on the summit topic, "notify me" (tracked here) and "Email me my manage link" (#14)
- M4: the contact form and the 2-step consulting enquiry (#54)
- M7: "Book an intro call" after a consulting enquiry (tracked here)

**NewsV3**
- M1: the list, the posts, redirects from old `/blog/` links, and RSS (#34)
- M7: the digest sign-up (#65); the team writes posts in the admin (#45)

**PeopleV3**
- M1: the team, speakers by edition and white paper authors, with the person drawer (#33)
- M7: "Appears in" links to the 2027 recordings (#71); the team edits people in the admin (#45)

**PrivacyV3**
- M1: the draft page (#37)
- Before registration opens in M3: the final text (#5). The draft names Umami and listmonk; the final text names Cloudflare Web Analytics (#8) and the app's own emails instead

### My VRC and phone

**MyVRCV3**
- M3: sign-in by emailed link, a new link when it expires, and the registration: view, cancel, re-confirm, add to calendar, download my data, delete everything (#14, #41)
- M4: pitch status with edit and withdraw (#51), and the join request (#53)
- M5: the personal agenda and its calendar feed (#62)
- M7: map suggestions, job posts, internship applications and email preferences (#63); download and delete cover everything (#64)

**PhoneV3**: each page's phone layout ships with that page, and the tab bar with the shared components in M1 (#25). The register sheet comes with registration in M3, and the agenda with the program in M5.

### Admin

**AdminDashboardV3**
- M3: registrations today and in total, with a chart by day; warnings for failed jobs, old backups and bounces (#48)
- M5: the Today view, with queue counts and the oldest item, days until the summit, Slack link expiry and recent admin activity (#67); upcoming deadlines (tracked here)
- M7: the map snapshot (tracked here)

**AdminEditionV3**
- M3: editions with dates, the daily window, format, price and the registration window, a timeline of the states, and a diff before saving (#39); the edition's banner (tracked here)
- M4: the open, close and decision dates of each pitch call (#51)
- M5: the program state, draft and then published (#61)
- M7: the recordings state (#71); version history with restore, required or optional registration questions, and versions of the consent wording (tracked here)

**AdminRegistrationsV3**
- M3: search, filters, details, re-sending the link, cancelling on someone's behalf, and an audited CSV export (#43)
- M5: the reminder and join-link emails, with a delivery report and a re-send to anyone missed (#66)

**AdminPitchesV3**: M4. Any admin scores pitches on the rubric, sees the average and spread, and holds decisions until they are released together. Accepted pitches can then become sessions (#52)

**AdminQueueV3**
- M4: one queue for join requests, contact messages and consulting enquiries, with approve, reject with a reason, ask for changes, and close (#50, #53, #54)
- M7: map suggestions (#56), job posts (#57), internship applications (#58) and the smaller forms (#59)

**AdminProgramV3**: M5. A day grid with drafts and clash warnings, a provisional marker and publish, accepted pitches turned into sessions, and "Copy the 2026 structure" (#61)

**AdminMapV3**: M7. The organisations move into the database, and the downloads are generated from them (#55). Suggestions are reviewed field by field, pins can be nudged, and places are geocoded once, on approval (#56). Version history with restore (tracked here)

**AdminContentV3**: M7. News, videos and series, people, partners and documents, with drafts, scheduled publishing and image upload (#45)

**AdminSettingsV3**
- M3: switches for the programmes, each internship track, the research team and geocoding; the contact address for each topic; the Slack invite link (#46); the site-wide banner (tracked here)
- The Slack link is first used in M4 (#53), and geocoding in M7 (#56)

**AdminUsersV3**: M3. Admins with their 2FA methods, invites and removals by the owner, 2FA resets with a reason, and the audit log (#44)

**AdminSystemV3**
- M3: background jobs with retry, email template previews with a test send, the last backup, and the running version with recent deploys (#47)
- M5: the delivery report for the summit emails (#66)

### Taken out of the designs

These were removed from the boards because the plan rules them out. Older notes or issues may still mention them; don't build them.

- **The public member directory:** the "List me in the public member directory" checkbox on the join sheet and its line on PrivacyV3. It is listed under "Not planned" below
- **File uploads:** pitch decks, project PDFs and CVs. Visitors send links instead (#58)
- **Site builds:** the build queue, release rollback from the admin, and the build status on admin screens. Admin changes go live at once, and a rollback restarts the previous version from the runbook (#19). The admin's "Builds, email & backups" screen is now "Jobs, email & backups" (#47)
- **Outside tools:** the "External tools" tab, which opened listmonk, Umami, Beszel and Uptime Kuma, and every mention of listmonk and Umami. The app sends its own topic emails (#65), and uptime alerts come from Uptime Kuma at another provider (#21)
- **The tailnet:** an admin reachable only on a private network. The admin is protected by sign-in with two-factor authentication (#13)
- **YouTube sync:** syncing video details from YouTube. Videos are edited in the admin (#45)
- **Runbook routines in the admin:** patch-day and restore-drill checklists. They live in the runbook (#23, #73)
- **The stack overview:** StackV3, which drew the earlier stack. #1 replaces it, and [`ARCHITECTURE.md`](../ARCHITECTURE.md) describes the stack now

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
