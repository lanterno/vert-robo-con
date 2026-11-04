/**
 * Everyone on the site: the organising team, speakers by edition, and later
 * advisors and white paper authors (#33). One person, one slug, however many
 * roles they hold.
 */
import { SESSIONS } from '@/data/program';
import { BIOS, LINKS, WHITE_PAPER_AUTHORS } from '@/data/people';
import { ORGANIZERS, SPEAKERS_2025, SPEAKERS_2026, type Speaker } from '@/lib/summits-data';
import { slugify } from './slug';
import type { Person } from './types';

function build(): Person[] {
  const bySlug = new Map<string, Person>();
  const add = (slug: string, base: Omit<Person, 'roles'>, role: Person['roles'][number]) => {
    const person = bySlug.get(slug) ?? { ...base, roles: [] };
    if (!person.photo && base.photo) person.photo = base.photo;
    if (!person.bio && base.bio) person.bio = base.bio;
    person.roles.push(role);
    bySlug.set(slug, person);
  };

  for (const o of ORGANIZERS) {
    const slug = slugify(o.name);
    add(slug, { slug, name: o.name, ...(o.photoUrl ? { photo: o.photoUrl } : {}) }, { kind: 'team', title: o.role ?? '', org: o.organization ?? '' });
  }
  const speaker = (s: Speaker) => {
    const slug = slugify(s.name);
    add(
      slug,
      { slug, name: s.name, ...(s.photoUrl ? { photo: s.photoUrl } : {}), ...(s.bio ? { bio: s.bio } : {}) },
      { kind: 'speaker', year: Number(s.summitYear), title: s.title, org: s.organization, ...(s.isKeynote ? { keynote: true } : {}) },
    );
  };
  SPEAKERS_2025.forEach(speaker);
  SPEAKERS_2026.forEach(speaker);

  // Anyone who speaks in a session is a speaker at that edition, even if the
  // summit data's speaker list leaves them out: the program is what happened.
  for (const [year, sessions] of Object.entries(SESSIONS)) {
    for (const session of sessions) {
      for (const slug of session.speakers) {
        const person = bySlug.get(slug);
        if (!person || person.roles.some((r) => r.kind === 'speaker' && r.year === Number(year))) continue;
        const known = person.roles.find((r) => r.kind === 'team' || r.kind === 'speaker' || r.kind === 'advisor');
        person.roles.push({
          kind: 'speaker',
          year: Number(year),
          title: known?.title ?? '',
          org: known?.org ?? '',
        });
      }
    }
  }

  for (const a of WHITE_PAPER_AUTHORS) {
    // The paper credits some names differently, such as "Dr. Mireille Vos".
    add(a.slug, { slug: a.slug, name: a.credited }, { kind: 'author', edition: a.edition, credited: a.credited });
  }

  // Bios and links come from PeopleV3; see src/data/people.ts.
  for (const person of bySlug.values()) {
    const bio = BIOS[person.slug];
    if (bio && !person.bio) person.bio = bio;
    const link = LINKS[person.slug];
    if (link) person.links = [{ label: 'Profile', href: link }];
  }
  return [...bySlug.values()];
}

const PEOPLE = build();

export function getPeople(): Person[] {
  return PEOPLE;
}

export function getPerson(slug: string): Person | undefined {
  return PEOPLE.find((p) => p.slug === slug);
}

/** People who spoke at `year`, keynotes first, then by name. */
export function getSpeakers(year: number): Person[] {
  const spoke = (p: Person) => p.roles.some((r) => r.kind === 'speaker' && r.year === year);
  const keynote = (p: Person) => p.roles.some((r) => r.kind === 'speaker' && r.year === year && r.keynote);
  return PEOPLE.filter(spoke).sort((a, b) => Number(keynote(b)) - Number(keynote(a)) || a.name.localeCompare(b.name));
}

/** The organising team, in the order the summit data lists them. */
export function getTeam(): Person[] {
  return PEOPLE.filter((p) => p.roles.some((r) => r.kind === 'team'));
}

/** The white paper's authors, in credited order. */
export function getAuthors(edition: number): Person[] {
  return WHITE_PAPER_AUTHORS.map((a) => PEOPLE.find((p) => p.slug === a.slug)).filter(
    (p): p is Person => p !== undefined && p.roles.some((r) => r.kind === 'author' && r.edition === edition),
  );
}

/** How a person is credited on the white paper, if differently. */
export function creditedAs(person: Person, edition: number): string {
  const role = person.roles.find((r) => r.kind === 'author' && r.edition === edition);
  return (role?.kind === 'author' ? role.credited : undefined) ?? person.name;
}

/**
 * Someone's initials, for when there is no portrait: the first letter of
 * their first and last names. Titles such as "Dr." are skipped, and anything
 * in brackets or quotes, so a placeholder name doesn't produce punctuation.
 */
export function initials(name: string): string {
  const words = name
    .replace(/\[[^\]]*\]|"[^"]*"|\([^)]*\)/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !/^(dr|prof|mr|ms|mrs)\.?$/i.test(w))
    .filter((w) => /\p{L}/u.test(w));
  const first = words[0]?.match(/\p{L}/u)?.[0] ?? '';
  const last = words.length > 1 ? (words.at(-1)?.match(/\p{L}/u)?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}
