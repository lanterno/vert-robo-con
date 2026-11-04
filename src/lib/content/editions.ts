/**
 * Editions of the summit, and where each one is in its timeline (#26).
 */
import { EDITIONS } from '@/data/editions';
import type { Edition, EditionState } from './types';

const DAY_MS = 86_400_000;

/** Every edition, newest first. */
export function getEditions(): Edition[] {
  return [...EDITIONS].sort((a, b) => b.year - a.year);
}

export function getEdition(year: number): Edition | undefined {
  return EDITIONS.find((e) => e.year === year);
}

/** The edition people can register for or look forward to: the newest one. */
export function getCurrentEdition(): Edition {
  const [newest] = getEditions();
  if (!newest) throw new Error('No editions in src/data/editions.ts');
  return newest;
}

/** Midnight UTC at the start of a calendar date such as "2027-04-20". */
function utcDay(date: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m) throw new Error(`Not a date: ${date}`);
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function instant(iso: string): number {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) throw new Error(`Not an instant: ${iso}`);
  return t;
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/**
 * The boundaries of an edition's timeline, as instants. The same rules as the
 * timeline in AdminEditionV3:
 *
 * - live runs from midnight UTC on the first summit day to midnight UTC after
 *   the last one
 * - registration closes at `closesAt`, or, if that isn't set, when the summit
 *   ends, so there is no "closed" gap
 * - "closing soon" starts `closingSoonDays` before registration closes
 * - each boundary is held between the one before it and the start of the
 *   summit, so the states never overlap or run backwards
 *
 * An edition with no registration window is upcoming until it goes live.
 */
export function editionTimeline(edition: Edition) {
  const first = edition.days[0];
  const last = edition.days[edition.days.length - 1];
  if (!first || !last) throw new Error(`Edition ${edition.year} has no days`);
  const liveStart = utcDay(first.date);
  const liveEnd = utcDay(last.date) + DAY_MS;

  const reg = edition.registration;
  if (!reg) {
    return { upcomingEnd: liveStart, openEnd: liveStart, closingEnd: liveStart, liveStart, liveEnd };
  }
  const opens = instant(reg.opensAt);
  const closes = reg.closesAt ? instant(reg.closesAt) : liveEnd;
  const upcomingEnd = Math.min(opens, liveStart);
  const openEnd = clamp(closes - reg.closingSoonDays * DAY_MS, upcomingEnd, liveStart);
  const closingEnd = clamp(closes, openEnd, liveStart);
  return { upcomingEnd, openEnd, closingEnd, liveStart, liveEnd };
}

/**
 * Where `edition` is at `now`. It depends only on the instant, never on the
 * time zone of the machine running it.
 */
export function editionState(edition: Edition, now: Date): EditionState {
  const t = now.getTime();
  const b = editionTimeline(edition);
  if (t < b.upcomingEnd) return 'upcoming';
  if (t < b.openEnd) return 'open';
  if (t < b.closingEnd) return 'closing';
  if (t < b.liveStart) return 'closed';
  if (t < b.liveEnd) return 'live';
  return 'concluded';
}

/** Which summit day it is, counting from 1, or undefined outside the summit. */
export function liveDay(edition: Edition, now: Date): number | undefined {
  const index = edition.days.findIndex((d) => {
    const start = utcDay(d.date);
    return now.getTime() >= start && now.getTime() < start + DAY_MS;
  });
  return index >= 0 ? index + 1 : undefined;
}

/** Can people register right now? */
export function isRegistrationOpen(state: EditionState): boolean {
  return state === 'open' || state === 'closing';
}
