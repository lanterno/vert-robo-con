/**
 * Each edition's program, from src/data/program.ts. 2027's is built in the
 * admin in M5 (#61), so it has none yet.
 */
import { SESSIONS } from '@/data/program';
import { getEdition } from './editions';
import type { ProgramDay, Session } from './types';

/** Every session of an edition, in time order, or undefined if unpublished. */
export function getSessions(year: number): Session[] | undefined {
  const rows = SESSIONS[year];
  if (!rows) return undefined;
  return [...rows]
    .map((s) => ({ ...s, year }))
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
}

export function getSession(year: number, slug: string): Session | undefined {
  return getSessions(year)?.find((s) => s.slug === slug);
}

/** An edition's program, day by day. */
export function getProgram(year: number): ProgramDay[] | undefined {
  const sessions = getSessions(year);
  const edition = getEdition(year);
  if (!sessions || !edition) return undefined;

  return edition.days.map((d, i) => ({
    day: i + 1,
    date: d.date,
    theme: THEMES[year]?.[i] ?? '',
    sessions: sessions.filter((s) => s.day === i + 1),
  }));
}

/** Each day's theme, from ProgramV3's day tabs. */
const THEMES: Record<number, string[]> = {
  2026: ['Leaks, soil & carbon', 'Floods, storms & greenhouses', 'Skills & what comes next'],
  2025: ['Wetlands & water agencies', 'Ice & city heat', 'Keeping robots running'],
};

/** Every track in an edition's program, in the order they first appear. */
export function getTracks(year: number): string[] {
  const tracks = (getSessions(year) ?? []).map((s) => s.track).filter((t): t is string => t !== undefined);
  return [...new Set(tracks)];
}
