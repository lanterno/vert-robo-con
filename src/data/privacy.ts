/**
 * The privacy page's draft content, from PrivacyV3 (#37).
 *
 * This is a draft. The legal entity, the legal basis for each purpose and
 * how long data is kept are all open in #5, and must be settled before any
 * form collects personal data. Everything still undecided is left as the
 * canvas's placeholder, in brackets, rather than guessed at.
 */

/** What #5 has yet to decide. Shown as written, so a gap is never mistaken for an answer. */
export const LEGAL_BASIS = '[LEGAL BASIS]';
export const LEGAL_ENTITY = '[LEGAL ENTITY]';
export const REGISTERED_ADDRESS = '[REGISTERED ADDRESS]';

export const SHORT_VERSION: string[] = [
  'We only collect what a form asks for, and we say why below.',
  'No tracking cookies, no ads, and we never sell your data.',
  'It lives on our own server in the EU (Hetzner, Germany or Finland).',
  'See, fix, download or delete it any time in My VRC.',
];

export interface DataRow {
  id: string;
  name: string;
  summary: string;
  why: string;
  /** How long it is kept; undecided in #5. */
  keep: string;
  fields: string[];
  published: string;
  inMyVrc: string;
}

export const DATA_ROWS: DataRow[] = [
  {
    id: 'reg',
    name: 'Summit registration',
    summary: 'Name, email, country, and what you plan to attend',
    why: 'To register you, email your confirmation and My VRC link, and plan sessions and captions.',
    keep: '[N] months after the edition',
    fields: ['Full name', 'Email', 'Organization (optional)', 'Role', 'Country', 'Time zone (optional)', 'Days you plan to attend', 'Topics you care about (optional)', 'Accessibility or captioning needs (optional)', 'How you heard about us (optional)', 'Summit email consent', 'Monthly digest (optional)'],
    published: 'Never. There is no public attendee list.',
    inMyVrc: 'Edit or cancel your registration and starred sessions.',
  },
  {
    id: 'join',
    name: 'Join requests',
    summary: 'Name, email, and Slack community or email updates only',
    why: 'An admin reviews each Slack request by hand and emails your invite. Email updates only starts your digest.',
    keep: '[N] months after an admin decides',
    fields: ['Full name', 'Email', 'Role (optional)', 'Country (optional)', 'Interests (optional)', 'Slack community or Email updates only', 'Code of conduct confirmation'],
    published: 'Never.',
    inMyVrc: 'See your request status: Pending approval, then Approved, invite sent.',
  },
  {
    id: 'pitch',
    name: 'Pitches',
    summary: 'Your details, your organization or lab, and your pitch',
    why: 'Admins review and score each pitch, then email you the outcome.',
    keep: '[N] months after the edition',
    fields: ['Full name', 'Email', 'Your role', 'Country', 'Organization, or lab and PI', 'Website', 'Stage and robot type', 'Your pitch answers', 'Deck or video link', 'Pitch deck or project link (optional)'],
    published: 'Only if your pitch is selected: your name, organization and pitch title appear in the program [CONFIRM].',
    inMyVrc: 'Follow your pitch and withdraw it.',
  },
  {
    id: 'intern',
    name: 'Internship applications',
    summary: 'Your details, a track, and a CV or portfolio',
    why: 'Admins review your application and contact you about an interview.',
    keep: '[N] months after the decision',
    fields: ['Track', 'Full name', 'Email', 'School, university or program', 'Country', 'Time zone', 'Hours per week', 'Start window', 'Why this track', 'Portfolio or CV (link)'],
    published: 'Never.',
    inMyVrc: 'Follow your application and withdraw it.',
  },
  {
    id: 'map',
    name: 'Map suggestions',
    summary: 'Details about an organization, plus your email',
    why: 'An admin checks every suggestion before it goes on the map, and may email you a question.',
    keep: 'Your email: [N] months after review. Organization data: while it’s on the map.',
    fields: ['Organization name', 'Website', 'HQ country', 'City (optional)', 'Robot type', 'Application', 'Climate role', 'One-line description', 'Founded (optional)', 'LinkedIn (optional)', 'What changed and how you know (optional)', 'Your email'],
    published: 'The organization details, under CC BY 4.0. Your email never.',
    inMyVrc: 'See your suggestions and whether they were published.',
  },
  {
    id: 'jobs',
    name: 'Job posts',
    summary: 'The job, and your email',
    why: 'An admin reviews each post before it’s published, and we email you when it goes live or ends.',
    keep: '[N] months after the listing closes',
    fields: ['Organization, from the map or new', 'Job title', 'Role type', 'Location', 'Description', 'Apply link or email', 'Salary range (optional)', 'Listing length', 'Your email'],
    published: 'The listing, once approved, until it closes. Your email never.',
    inMyVrc: 'Edit, renew or close your listing.',
  },
  {
    id: 'involve',
    name: 'Sponsor, volunteer, project and speaker forms',
    summary: 'Your contact details and your answers',
    why: 'To reply about sponsorship, volunteering, a project idea or a speaker you recommend.',
    keep: '[N] months after we reply',
    fields: ['Name or contact name', 'Email', 'Organization, tier and edition (sponsors)', 'Role, hours and skills (volunteers)', 'Project name and idea (projects)', 'Speaker’s name, affiliation and topic (recommendations)', 'Message (optional)'],
    published: 'Never.',
    inMyVrc: 'Follow what you sent from the link in your receipt.',
  },
  {
    id: 'research',
    name: 'White paper contributions',
    summary: 'Suggestions, topic proposals and research team applications',
    why: 'To review your contribution, reply, and credit you if you ask.',
    keep: '[N] months after the next edition',
    fields: ['Kind of suggestion and comment', 'Topic, why it matters, your expertise and links', 'Affiliation, areas and hours (research team)', 'Name (optional on suggestions)', 'Email (optional on suggestions)', 'Credit me (optional)'],
    published: 'Only your name in the edition’s credits, if you tick Credit me.',
    inMyVrc: 'Follow proposals and applications.',
  },
  {
    id: 'coc',
    name: 'Code of conduct reports',
    summary: 'What happened, when, where and who was involved',
    why: 'So the moderators can look into it and act under the code of conduct.',
    keep: '[N] months after the report is closed',
    fields: ['What happened', 'When', 'Where', 'People involved (optional)', 'Email, unless you stay anonymous'],
    published: 'Never. Only the moderators [NAMES] read reports.',
    inMyVrc: 'Not listed, to keep reports private. Quote your reference to follow up.',
  },
  {
    id: 'contact',
    name: 'Contact and consulting messages',
    summary: 'Your message, name and email',
    why: 'To reply to you, within 24–48 hours.',
    keep: '[N] months after we reply',
    fields: ['Topic', 'Name', 'Email', 'Organization', 'Publication and deadline (press)', 'Message', 'Engagement type, project and budget (consulting)', 'Website (optional)'],
    published: 'Never.',
    inMyVrc: 'Not listed. Ask us by email to see or delete a message.',
  },
];

export const PROCESSORS: { name: string; where: string; does: string; when: string }[] = [
  { name: 'Hetzner', where: 'Germany or Finland', does: 'Hosts the site, its database and the encrypted backups.', when: 'Always' },
  {
    name: 'Amazon SES',
    where: 'eu-central-1 · Frankfurt',
    does: 'Delivers receipts, My VRC links and the newsletter. Sees your email address and the message.',
    when: 'Only when we email you',
  },
  {
    name: 'Cloudflare (analytics)',
    where: '[LOCATION]',
    does: 'Counts visits with Cloudflare Web Analytics: page views, referring sites, countries and device types. No cookies, no banner.',
    when: 'On public pages',
  },
  {
    name: 'YouTube',
    where: '[LOCATION]',
    does: 'Plays our videos through privacy-enhanced embeds (youtube-nocookie.com). Nothing loads from YouTube until you press play.',
    when: 'Only when you press play',
  },
  {
    name: 'Slack',
    where: '[LOCATION]',
    does: 'Hosts the community. Once an admin approves your request, we email you an invite link. Slack only sees what you give it when you join, and Slack’s own policy applies there.',
    when: 'Only if you join Slack',
  },
  { name: '[SECOND BACKUP PROVIDER]', where: '[LOCATION]', does: 'Keeps a second encrypted copy of the backups.', when: 'Always' },
];

export const COOKIES: { where: string; what: string }[] = [
  { where: 'Public pages', what: 'No cookies at all.' },
  { where: 'My VRC', what: '[CONFIRM: one strictly necessary cookie that keeps your private link session open for [N] days, or none]' },
  { where: 'Admin site', what: 'Strictly necessary sign-in cookies, for admins only.' },
];

export const RIGHTS: { kind: string; title: string; detail: string }[] = [
  { kind: 'ACCESS', title: 'See it', detail: 'Everything we hold for your email address, in one place.' },
  { kind: 'CORRECTION', title: 'Fix it', detail: 'Edit your registration, applications and listings.' },
  { kind: 'DELETION', title: 'Delete it', detail: 'One item, or everything. Backups clear within [N] days.' },
  { kind: 'EXPORT', title: 'Take it with you', detail: 'Download everything as one JSON file.' },
];
