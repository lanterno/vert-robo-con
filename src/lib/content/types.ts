/**
 * The shapes of the site's content, shared by every page (#26).
 *
 * Pages read content only through the functions in src/lib/content/*. In M1
 * those read files in the repo; as each content type moves into Postgres the
 * functions change and the pages don't.
 *
 * All times are UTC. An edition's dates are calendar dates in UTC, and its
 * registration window is a pair of instants, as the admin stores them
 * (AdminEditionV3).
 */

/**
 * Where an edition is, computed from its dates. The order is the timeline in
 * AdminEditionV3: upcoming until registration opens, open, closing soon in the
 * last days, closed once registration ends and before the first day, live
 * through the summit days, and concluded after.
 */
export type EditionState = 'upcoming' | 'open' | 'closing' | 'closed' | 'live' | 'concluded';

export interface Edition {
  year: number;
  /** "Vert Robo Con Summit 2027". */
  name: string;
  /** One line about the edition, from SummitV3. */
  dek: string;
  tagline?: string;
  description?: string;
  /** The online pilot, shown among past editions but without its own page. */
  pilot?: boolean;
  /** Summit days, as UTC calendar dates. */
  days: { date: string; label: string }[];
  /** The daily window in UTC, as HH:MM; unknown for some past editions. */
  window?: { start: string; end: string };
  format: string;
  price: string;
  /** Unset for editions held before registration moved onto the site. */
  registration?: {
    /** ISO instant, UTC. */
    opensAt: string;
    /** ISO instant, UTC. Unset: registration stays open through the summit. */
    closesAt?: string;
    /** "Closing soon" starts this many days before registration closes. */
    closingSoonDays: number;
  };
  /** The pitch calls, each with its own dates (#51). */
  calls?: { id: 'startup' | 'research'; name: string; opensAt?: string; closesAt?: string }[];
  program: 'not-started' | 'draft' | 'published';
  recordings: 'not-applicable' | 'in-editing' | 'published';
  stats?: { attendees?: string; countries?: string; sessions?: string; speakers?: string };
  /** One line about how it went, for the list of past editions. */
  recap?: string;
  /** The tracks planned before the program is published. */
  tracks?: string[];
  /** Time zones shown beside UTC, such as "US Eastern". */
  alsoShow?: string[];
}

/** The kinds of session, as ProgramV3 filters them. */
export type SessionKind = 'keynote' | 'session' | 'pitch' | 'remarks';

/** A session as src/data/program.ts stores it. */
export interface SessionRecord {
  slug: string;
  title: string;
  /** Which day of the edition, counting from 1. */
  day: number;
  /** Start and end on the day, HH:MM in UTC. */
  time: string;
  end: string;
  kind: SessionKind;
  /** Unset for a plenary session. */
  track?: string;
  summary?: string;
  /** Slugs of people (getPeople). */
  speakers: string[];
  /** The recording of it, if one was made. */
  recording?: { duration: string; video: string };
}

export interface Session extends SessionRecord {
  /** The edition it belongs to. */
  year: number;
}

export interface ProgramDay {
  day: number;
  /** UTC calendar date. */
  date: string;
  theme: string;
  sessions: Session[];
}

export type PersonRole =
  | { kind: 'team'; title: string; org: string }
  | { kind: 'advisor'; title: string; org: string }
  | { kind: 'speaker'; year: number; title: string; org: string; keynote?: boolean }
  | { kind: 'author'; edition: number; chapter?: string };

export interface Person {
  slug: string;
  name: string;
  photo?: string;
  bio?: string;
  links?: { label: string; href: string }[];
  roles: PersonRole[];
}

export type VideoKind = 'keynote' | 'panel' | 'talk' | 'pitch' | 'opening' | 'closing' | 'episode' | 'explainer';

export interface Video {
  slug: string;
  title: string;
  description?: string;
  /** "33:40". */
  duration: string;
  kind: VideoKind;
  /** The edition it was recorded at, if any. */
  edition?: number;
  /** The series it belongs to, if any, and its place in it. */
  series?: { slug: string; episode: number };
  speakers: string[];
  /** No demo video has one; see VideoFacade. */
  youtubeId?: string;
}

export type NewsType = 'essay' | 'video' | 'announcement' | 'summit';

export interface NewsPost {
  slug: string;
  type: NewsType;
  title: string;
  /** ISO date, or unset while a post is still a placeholder ([DATE]). */
  date?: string;
  summary: string;
  /** "6 MIN READ", or "[N] MIN READ" while unknown. */
  readTime: string;
  image?: string;
  /** A text cover in a tint, for posts without an image. */
  cover?: { text: string; tint: 'blue' | 'green' };
  featured?: boolean;
  quote?: { text: string; by: string };
  /** Section headings, with body paragraphs; "[ARTICLE TEXT]" is a placeholder. */
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  /** Episode number, for Robots in the Field posts. */
  episode?: number;
  /** Related links at the end of the post. */
  links: { title: string; meta: string; href: string }[];
}

export type PartnerTier = 'platinum' | 'gold' | 'silver' | 'partner' | 'organizing';

export interface Partner {
  slug: string;
  name: string;
  logo: string;
  href: string;
  tier: PartnerTier;
}

/** Something admins switch on and off (AdminSettingsV3, #46). */
export type Availability = 'open' | 'soon' | 'later';

export interface Settings {
  programmes: { fieldSkills: Availability; schools: Availability };
  internshipTracks: { id: 'map' | 'summit' | 'writing' | 'own'; status: Availability }[];
  mapLicence: string;
  geocoding: boolean;
}
