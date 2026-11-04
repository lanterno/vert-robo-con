/**
 * Dates for display. Everything is formatted in UTC, the time zone content is
 * stored in, so a date never shifts by a day with the visitor's or the build
 * machine's time zone.
 */
import type { Edition } from './types';

const toDate = (value: string) => new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00Z` : value);
const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts });

/** "December 7, 2026". */
export function formatDate(value: string): string {
  return fmt({ month: 'long', day: 'numeric', year: 'numeric' }).format(toDate(value));
}

/** "Dec 7, 2026". */
export function formatShortDate(value: string): string {
  return fmt({ month: 'short', day: 'numeric', year: 'numeric' }).format(toDate(value));
}

/** "Monday, December 7, 2026". */
export function formatLongDate(value: string): string {
  return fmt({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(toDate(value));
}

/** "April 20–22, 2027", "September 30–October 2, 2027", or one day. */
export function formatDateRange(from: string, to: string, month: 'long' | 'short' = 'long'): string {
  const a = toDate(from);
  const b = toDate(to);
  const m = (d: Date) => fmt({ month }).format(d);
  const y = (d: Date) => d.getUTCFullYear();
  if (a.getTime() === b.getTime()) return `${m(a)} ${a.getUTCDate()}, ${y(a)}`;
  if (y(a) !== y(b)) return `${m(a)} ${a.getUTCDate()}, ${y(a)}–${m(b)} ${b.getUTCDate()}, ${y(b)}`;
  if (a.getUTCMonth() !== b.getUTCMonth()) return `${m(a)} ${a.getUTCDate()}–${m(b)} ${b.getUTCDate()}, ${y(a)}`;
  return `${m(a)} ${a.getUTCDate()}–${b.getUTCDate()}, ${y(a)}`;
}

/** An edition's dates, such as "April 20–22, 2027". */
export function editionDates(edition: Edition, month: 'long' | 'short' = 'long'): string {
  const first = edition.days[0]?.date;
  const last = edition.days[edition.days.length - 1]?.date;
  return first && last ? formatDateRange(first, last, month) : '[DATE]';
}
