/**
 * People as the person drawer shows them: a role line, tags, and where they
 * appear in the programs and recordings.
 */
import type { DrawerPerson } from './PersonDrawer.astro';
import { getProgram, getVideos, type Person } from '@/lib/content';

const DAY_NAMES: Record<number, string> = { 1: 'DAY 1', 2: 'DAY 2', 3: 'DAY 3' };

/** "Glaciologist · Example University", from the role that fits `year` best. */
export function roleLine(p: Person, year?: number): string {
  const role =
    p.roles.find((r) => r.kind === 'speaker' && r.year === year) ??
    p.roles.find((r) => r.kind === 'team') ??
    p.roles.find((r) => r.kind === 'speaker' || r.kind === 'advisor');
  if (!role || role.kind === 'author') return '';
  return [role.title, role.org].filter(Boolean).join(' · ');
}

function tags(p: Person): string[] {
  const out: string[] = [];
  for (const r of p.roles) {
    if (r.kind === 'team') out.push('Organising team');
    if (r.kind === 'advisor') out.push('Advisor');
    if (r.kind === 'speaker') out.push(`${r.keynote ? 'Keynote' : 'Speaker'} · ${r.year}`);
    if (r.kind === 'author') out.push(`White paper ${r.edition}`);
  }
  return [...new Set(out)];
}

function appears(p: Person): NonNullable<DrawerPerson['appears']> {
  const out: NonNullable<DrawerPerson['appears']> = [];
  for (const year of [2026, 2025]) {
    for (const day of getProgram(year) ?? []) {
      for (const s of day.sessions) {
        if (!s.speakers.includes(p.slug)) continue;
        out.push({
          title: s.title,
          meta: `SUMMIT ${year} · ${DAY_NAMES[day.day] ?? `DAY ${day.day}`} · ${s.time} UTC`,
          href: `/summits/${year}/sessions/${s.slug}`,
          kind: 'session',
        });
      }
    }
  }
  for (const v of getVideos()) {
    if (!v.speakers.includes(p.slug)) continue;
    out.push({ title: v.title, meta: `RECORDING · ${v.duration}`, href: `/watch/${v.slug}`, kind: 'video' });
  }
  return out;
}

export function toDrawerPeople(people: Person[], year?: number): DrawerPerson[] {
  return people.map((p) => ({
    slug: p.slug,
    name: p.name,
    roleLine: roleLine(p, year),
    ...(p.photo ? { photo: p.photo } : {}),
    tags: tags(p),
    bio: p.bio ?? `${p.name} has no profile text yet.`,
    appears: appears(p),
    ...(p.links ? { links: p.links } : {}),
  }));
}
