/**
 * The site's navigation, shared by the header, the footer, the phone tab bar
 * and the "More" sheet, with the copy from the V3 boards.
 *
 * A link is one of three kinds:
 * - `href`: a page on the site
 * - `sheet`: opens a sheet on the current page, such as the join sheet
 * - `soon`: a page from a later milestone. It shows as text with a "Coming
 *   soon" chip, never as a link to a page that isn't there yet
 */
import type { IconName } from '@/lib/icons';

export type NavLink = {
  label: string;
  /** One line under the label, in menus and the "More" sheet. */
  desc?: string;
  icon?: IconName;
} & ({ href: string } | { sheet: string } | { soon: true });

/** The sheet every "Join" control opens. Built in #53; "coming soon" until then. */
export const JOIN_SHEET = 'join-sheet';
/** The sheet the phone tab bar's "More" opens. */
export const MORE_SHEET = 'more-sheet';

/** The latest edition with a published program. */
const PROGRAM_YEAR = 2026;

export const PRIMARY: { label: string; href: string }[] = [
  { label: 'Summits', href: '/summits' },
  { label: 'Watch', href: '/watch' },
  { label: 'Research', href: '/research' },
  { label: 'Map', href: '/map' },
];

export const MENUS: { id: string; label: string; items: NavLink[] }[] = [
  {
    id: 'community',
    label: 'Community',
    items: [
      { label: 'Join the network', desc: 'Slack community or email updates', sheet: JOIN_SHEET },
      { label: 'Jobs & internships', desc: 'Roles across the field', href: '/jobs' },
      { label: 'Get involved', desc: 'Pitch, sponsor, volunteer, nominate a speaker', href: '/get-involved' },
      { label: 'People', desc: 'Team, advisors and speakers', href: '/people' },
      { label: 'Code of conduct', desc: 'How we treat each other', href: '/code-of-conduct' },
      { label: 'Deployment code', desc: 'Principles for robots in the field', href: '/deployment-code' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    items: [
      { label: 'Mission and approach', desc: 'Why the network exists', href: '/#field' },
      { label: 'Principles', desc: 'How we judge a robot project', href: '/principles' },
      { label: 'Consulting', desc: 'Advice from members who have done the work', href: '/contact#consulting' },
      { label: 'News', desc: 'Essays, announcements and episodes', href: '/news' },
      { label: 'Contact', desc: 'Questions, press, partnerships', href: '/contact' },
      { label: 'Privacy', desc: 'Cookieless analytics, consent on every form', href: '/privacy' },
    ],
  },
];

export const FOOTER: { title: string; label: string; links: NavLink[] }[] = [
  {
    title: 'SUMMIT',
    label: 'Summit',
    links: [
      { label: 'Register / Notify me', href: '/summits/2027' },
      { label: 'Program', href: `/summits/${PROGRAM_YEAR}/program` },
      { label: 'Sponsor the summit', href: '/get-involved#sponsor' },
      { label: 'Past editions', href: '/summits' },
    ],
  },
  {
    title: 'LEARN',
    label: 'Learn',
    links: [
      { label: 'White paper', href: '/research/white-paper/2025' },
      { label: 'Watch', href: '/watch' },
      { label: 'News', href: '/news' },
      { label: 'RSS', href: '/news/rss.xml' },
      { label: 'Map data (CSV · JSON)', href: '/map#data' },
    ],
  },
  {
    title: 'COMMUNITY',
    label: 'Community',
    links: [
      { label: 'Join', sheet: JOIN_SHEET },
      { label: 'Jobs', href: '/jobs' },
      { label: 'Internships', href: '/jobs#internships' },
      { label: 'Get involved', href: '/get-involved' },
      { label: 'Code of conduct', href: '/code-of-conduct' },
    ],
  },
  {
    title: 'ABOUT',
    label: 'About',
    links: [
      { label: 'Team', href: '/people' },
      { label: 'Consulting', href: '/contact#consulting' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      // My VRC arrives with sign-in in M3 (#14, #41).
      { label: 'My VRC', soon: true },
    ],
  },
];

export const TABS: { label: string; icon: IconName; href?: string; sheet?: string }[] = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'Summit', icon: 'calendar', href: '/summits' },
  { label: 'Watch', icon: 'watch', href: '/watch' },
  { label: 'Map', icon: 'map-pin', href: '/map' },
  { label: 'More', icon: 'grid', sheet: MORE_SHEET },
];

export const MORE: NavLink[] = [
  { label: 'Research', desc: 'The white paper and how to write the next edition', icon: 'document', href: '/research' },
  { label: 'White paper reader', desc: 'Read the 2025 edition, sized for your phone', icon: 'book', href: '/research/white-paper/2025' },
  { label: 'Get involved', desc: 'Pitch, sponsor, volunteer or recommend a speaker', icon: 'user-plus', href: '/get-involved' },
  { label: 'Jobs & internships', desc: 'Open roles from across the network', icon: 'briefcase', href: '/jobs' },
  { label: 'People', desc: 'Team, advisors and speakers', icon: 'users', href: '/people' },
  { label: 'Code of conduct', desc: 'How we treat each other in the network and at the summit', icon: 'shield', href: '/code-of-conduct' },
  { label: 'News', desc: 'Essays and updates from the network', icon: 'news', href: '/news' },
  { label: 'Contact', desc: 'Pick a topic and write to us. We respond within 24–48 hours.', icon: 'mail', href: '/contact' },
  {
    label: 'My VRC',
    desc: 'Registrations, agenda, submissions and your Slack request status, from the link in your email. No password.',
    icon: 'user',
    soon: true,
  },
  { label: 'Privacy', desc: 'Cookieless analytics. Download or delete your data from My VRC.', icon: 'lock', href: '/privacy' },
];

/** True when `path` is `href` or a page under it; the home page matches only itself. */
export function isCurrent(path: string, href: string): boolean {
  const clean = (p: string) => p.replace(/\/+$/, '') || '/';
  const p = clean(path);
  const h = clean(href.split('#')[0] ?? href);
  return h === '/' ? p === '/' : p === h || p.startsWith(`${h}/`);
}
