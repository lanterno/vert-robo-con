# Issues

The 77 implementation issues, exported from GitHub on November 4, 2026 so the plan can be
worked on without network access. These files are now the source of truth: `#N` anywhere in
the docs means the file here whose name starts with that number.

Edit these files as work progresses; nothing syncs back to GitHub.

## M0 · Decisions

| # | Title | State |
| --- | --- | --- |
| [1](01-decide-approve-the-target-architecture-one-typescript-app-on.md) | Decide: approve the target architecture (one TypeScript app on one server) | closed |
| [2](02-decide-who-builds-it-and-how-many-developers.md) | Decide: who builds it, and how many developers | closed |
| [3](03-decide-launch-and-call-dates-registration-dec-7-pitches-dec.md) | Decide: launch and call dates (registration Dec 7, pitches Dec 8, or Jan 11) | closed |
| [4](04-decide-the-owner-and-the-first-admins.md) | Decide: the owner and the first admins | closed |
| [5](05-decide-legal-entity-legal-basis-and-retention-periods-for-th.md) | Decide: legal entity, legal basis and retention periods for the Privacy page | open |
| [6](06-decide-email-provider-and-sending-domain-and-get-dns-access.md) | Decide: email provider and sending domain, and get DNS access | closed |
| [7](07-decide-sign-off-the-drafted-copy-sponsor-tiers-faq-internshi.md) | Decide: sign off the drafted copy (sponsor tiers, FAQ, internships, news authors) | closed |
| [8](08-decide-analytics-at-launch-none-or-self-hosted-and-cookie-fr.md) | Decide: analytics at launch (none, or self-hosted and cookie-free) | closed |

## M1 · Public site without a database

| # | Title | State |
| --- | --- | --- |
| [24](24-v3-design-tokens-and-self-hosted-fonts.md) | V3 design tokens and self-hosted fonts | closed |
| [25](25-shared-components-header-footer-chips-bento-tiles-drawers-sh.md) | Shared components: header, footer, chips, bento tiles, drawers, sheets, phone tab bar | closed |
| [26](26-data-layer-for-public-pages-repo-data-first-postgres-later.md) | Data layer for public pages: repo data first, Postgres later | closed |
| [27](27-homev3-the-home-page.md) | HomeV3: the home page | open |
| [28](28-summitv3-summit-overview-and-edition-pages.md) | SummitV3: summit overview and edition pages | open |
| [29](29-programv3-program-pages-for-past-editions.md) | ProgramV3: program pages for past editions | open |
| [30](30-watchv3-videos-and-series.md) | WatchV3: videos and series | open |
| [31](31-researchv3-white-paper-reader-principles-deployment-code-cod.md) | ResearchV3: white paper reader, principles, deployment code, code of conduct | open |
| [32](32-mapv3-the-map-on-maplibre-with-self-hosted-tiles.md) | MapV3: the map on MapLibre with self-hosted tiles | open |
| [33](33-peoplev3-team-advisors-speakers-and-authors.md) | PeopleV3: team, advisors, speakers and authors | open |
| [34](34-newsv3-news-list-posts-and-rss.md) | NewsV3: news list, posts and RSS | open |
| [35](35-getinvolvedv3-static-parts.md) | GetInvolvedV3: static parts | open |
| [36](36-jobsv3-layout-and-internship-tracks.md) | JobsV3: layout and internship tracks | open |
| [37](37-contactv3-and-privacyv3-static-parts.md) | ContactV3 and PrivacyV3: static parts | open |
| [38](38-redirects-from-old-urls-404-sitemap-social-cards-and-analyti.md) | Redirects from old URLs, 404, sitemap, social cards and analytics | open |
| [75](75-remove-tinacms.md) | Remove TinaCMS | closed |
| [76](76-static-site-ci-checks-and-a-daily-rebuild.md) | Static site: CI checks and a daily rebuild | closed |

## M2 · Foundations

| # | Title | State |
| --- | --- | --- |
| [9](09-rewrite-architecture-md-and-docs-roadmap-md-for-the-new-plan.md) | Rewrite ARCHITECTURE.md and docs/ROADMAP.md for the new plan | open |
| [10](10-switch-astro-to-server-mode-with-a-health-check-and-the-work.md) | Switch Astro to server mode, with a health check and the worker entry point | open |
| [11](11-add-postgres-with-drizzle-base-schema-migrations-and-synthet.md) | Add Postgres with Drizzle: base schema, migrations and synthetic seed | open |
| [12](12-tests-against-a-seeded-database-vitest-playwright-and-mailpi.md) | Tests against a seeded database: Vitest, Playwright and Mailpit | open |
| [13](13-admin-sign-in-with-required-2fa-better-auth.md) | Admin sign-in with required 2FA (better-auth) | open |
| [14](14-visitor-magic-links-for-my-vrc.md) | Visitor magic links for My VRC | open |
| [15](15-email-sending-mailer-templates-ics-bounces.md) | Email sending: mailer, templates, .ics, bounces | open |
| [16](16-background-jobs-with-pg-boss-and-the-worker-process.md) | Background jobs with pg-boss and the worker process | open |
| [17](17-spam-and-abuse-protection-for-every-public-form.md) | Spam and abuse protection for every public form | open |
| [18](18-provision-and-configure-the-production-and-staging-servers-i.md) | Provision and configure the production and staging servers (including email and DNS) | open |
| [19](19-docker-compose-stack-caddy-app-worker-postgres.md) | Docker Compose stack: Caddy, app, worker, Postgres | open |
| [20](20-backups-restore-drill-and-static-fallback.md) | Backups, restore drill and static fallback | open |
| [21](21-monitoring-and-alerts-uptime-kuma-at-another-provider.md) | Monitoring and alerts (Uptime Kuma at another provider) | open |
| [22](22-ci-cd-checks-on-every-pr-staging-on-main-production-on-tag.md) | CI/CD: checks on every PR, staging on main, production on tag | open |
| [23](23-write-the-runbook.md) | Write the RUNBOOK | open |

## M3 · Registration and the admin core

| # | Title | State |
| --- | --- | --- |
| [39](39-admineditionv3-editions-dates-and-registration-window.md) | AdminEditionV3: editions, dates and registration window | open |
| [40](40-registerv3-2027-registration.md) | RegisterV3: 2027 registration | open |
| [41](41-my-vrc-first-version-registrations-calendar-data-download-an.md) | My VRC, first version: registrations, calendar, data download and delete | open |
| [42](42-admin-shell-layout-navigation-and-shared-table-and-form-piec.md) | Admin shell: layout, navigation and shared table and form pieces | open |
| [43](43-adminregistrationsv3-registrations-list.md) | AdminRegistrationsV3: registrations list | open |
| [44](44-adminusersv3-admins-2fa-status-and-audit-log.md) | AdminUsersV3: admins, 2FA status and audit log | open |
| [46](46-adminsettingsv3-site-settings-and-toggles.md) | AdminSettingsV3: site settings and toggles | open |
| [47](47-adminsystemv3-jobs-email-templates-backups-and-version.md) | AdminSystemV3: jobs, email templates, backups and version | open |
| [48](48-admindashboardv3-first-version.md) | AdminDashboardV3, first version | open |
| [49](49-launch-checklist-review-cutover-and-fallback.md) | Launch checklist: review, cutover and fallback | open |
| [77](77-serve-the-map-basemap-from-our-own-server-pmtiles.md) | Serve the map basemap from our own server (PMTiles) | open |

## M4 · Pitch calls and moderation

| # | Title | State |
| --- | --- | --- |
| [50](50-adminqueuev3-one-moderation-queue-for-every-submission.md) | AdminQueueV3: one moderation queue for every submission | open |
| [51](51-pitch-calls-startup-and-research-pitches.md) | Pitch calls: startup and research pitches | open |
| [52](52-adminpitchesv3-pitch-review-and-decisions.md) | AdminPitchesV3: pitch review and decisions | open |
| [53](53-join-the-network-request-manual-approval-slack-invite.md) | Join the network: request, manual approval, Slack invite | open |
| [54](54-contact-form-and-consulting-enquiry.md) | Contact form and consulting enquiry | open |

## M5 · Program and summit emails

| # | Title | State |
| --- | --- | --- |
| [61](61-adminprogramv3-the-program-builder.md) | AdminProgramV3: the program builder | open |
| [62](62-programv3-for-2027-saved-agenda-calendar-feed-join-links-now.md) | ProgramV3 for 2027: saved agenda, calendar feed, join links, Now/Next | open |
| [66](66-summit-emails-reminder-and-join-link.md) | Summit emails: reminder and join link | open |
| [67](67-admindashboardv3-full-today-view.md) | AdminDashboardV3, full Today view | open |
| [69](69-gate-full-rehearsal-and-a-load-test-of-registration.md) | Gate: full rehearsal and a load test of registration | open |

## M6 · Summit

| # | Title | State |
| --- | --- | --- |
| [70](70-summit-week-change-freeze-on-call-and-checks.md) | Summit week: change freeze, on-call and checks | open |

## M7 · After the summit

| # | Title | State |
| --- | --- | --- |
| [45](45-admincontentv3-news-videos-people-partners-and-documents.md) | AdminContentV3: news, videos, people, partners and documents | open |
| [55](55-move-the-map-data-into-postgres-and-serve-the-downloads.md) | Move the map data into Postgres and serve the downloads | open |
| [56](56-map-suggestions-and-adminmapv3-moderation.md) | Map suggestions and AdminMapV3 moderation | open |
| [57](57-jobs-board-post-review-expire-renew.md) | Jobs board: post, review, expire, renew | open |
| [58](58-internship-applications-per-track.md) | Internship applications per track | open |
| [59](59-the-smaller-forms-sponsors-speakers-volunteers-programmes-re.md) | The smaller forms: sponsors, speakers, volunteers, programmes, research, concerns | open |
| [60](60-gate-no-external-forms-left-every-submission-type-tested-end.md) | Gate: no external forms left, every submission type tested end to end | open |
| [63](63-my-vrc-complete-every-submission-and-email-preferences.md) | My VRC, complete: every submission and email preferences | open |
| [64](64-data-export-deletion-and-retention-jobs.md) | Data export, deletion and retention jobs | open |
| [65](65-topic-emails-notify-me-monthly-digest-job-alerts-new-videos.md) | Topic emails: notify-me, monthly digest, job alerts, new videos | open |
| [68](68-generate-pdfs-of-the-program-white-paper-and-sponsor-deck.md) | Generate PDFs of the program, white paper and sponsor deck | open |
| [71](71-2027-recordings-in-editing-publishing-appears-in.md) | 2027 recordings: in editing, publishing, Appears in | open |
| [72](72-switch-off-the-old-tools.md) | Switch off the old tools | open |
| [73](73-retrospective-restore-drill-and-maintenance-routine.md) | Retrospective, restore drill and maintenance routine | open |

## —

| # | Title | State |
| --- | --- | --- |
| [74](74-plan-from-today-s-site-to-the-v3-designs.md) | Plan: from today's site to the V3 designs | open |
