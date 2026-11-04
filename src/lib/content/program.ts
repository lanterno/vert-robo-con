/**
 * Each edition's program. 2025 and 2026 come from today's data; 2027's is
 * built in the admin in M5 (#61), so it has none yet.
 *
 * Today's data names speakers only in recordings and descriptions, so a
 * session's speakers are the people in its recordings, or else the speakers
 * of that edition named in its title or description. #29 can store them
 * directly.
 */
import { SUMMIT_2025_PROGRAM, SUMMIT_2026_PROGRAM, type ProgramDay as LegacyDay } from '@/lib/summits-data';
import { getEdition } from './editions';
import { getSpeakers } from './people';
import { slugify } from './slug';
import type { ProgramDay, Session } from './types';

const LEGACY: Record<number, LegacyDay[]> = { 2025: SUMMIT_2025_PROGRAM, 2026: SUMMIT_2026_PROGRAM };

function build(year: number): ProgramDay[] | undefined {
  const legacy = LEGACY[year];
  const edition = getEdition(year);
  if (!legacy || !edition) return undefined;
  const speakers = getSpeakers(year);

  return legacy.map((day) => ({
    day: day.day,
    date: edition.days[day.day - 1]?.date ?? '',
    theme: day.theme,
    sessions: day.sessions.map((s): Session => {
      const [start = '', end] = s.time.replace(/\s*UTC$/, '').split(/\s*-\s*/);
      const fromVideos = s.videos.flatMap((v) => (v.speakers ?? []).map(slugify));
      const text = `${s.title} ${s.description ?? ''}`;
      // In the order the text names them.
      const named = speakers
        .filter((p) => text.includes(p.name))
        .sort((a, b) => text.indexOf(a.name) - text.indexOf(b.name))
        .map((p) => p.slug);
      return {
        slug: slugify(s.title),
        title: s.title,
        time: start,
        ...(end ? { end } : {}),
        kind: s.type,
        ...(s.description ? { description: s.description } : {}),
        speakers: [...new Set(fromVideos.length ? fromVideos : named)],
        videos: s.videos.map((v) => v.id),
      };
    }),
  }));
}

const CACHE = new Map<number, ProgramDay[] | undefined>();

export function getProgram(year: number): ProgramDay[] | undefined {
  if (!CACHE.has(year)) CACHE.set(year, build(year));
  return CACHE.get(year);
}
