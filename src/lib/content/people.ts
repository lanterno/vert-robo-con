/**
 * Everyone on the site: the organising team, speakers by edition, and later
 * advisors and white paper authors (#33). One person, one slug, however many
 * roles they hold.
 */
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
