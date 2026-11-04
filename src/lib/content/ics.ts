/**
 * A calendar file for one session (#29), to RFC 5545.
 *
 * Times are written as UTC instants, so the event lands at the right moment
 * in the reader's own time zone.
 */
import type { Edition, Session } from './types';

/** Escapes the characters that have a meaning in a calendar file. */
function esc(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/** "2026-05-19" + "15:00" -> "20260519T150000Z". */
function stamp(date: string, time: string): string {
  return `${date.replace(/-/g, '')}T${time.replace(':', '')}00Z`;
}

/**
 * Long lines are folded at 75 octets, as the spec requires, counting bytes
 * rather than characters so a non-ASCII name can't split badly.
 */
function fold(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let start = 0;
  while (start < bytes.length) {
    const limit = out.length === 0 ? 75 : 74;
    let end = Math.min(start + limit, bytes.length);
    // Don't split inside a multi-byte character.
    while (end > start && end < bytes.length && (bytes[end]! & 0b1100_0000) === 0b1000_0000) end--;
    out.push((out.length ? ' ' : '') + new TextDecoder().decode(bytes.slice(start, end)));
    start = end;
  }
  return out.join('\r\n');
}

export interface IcsOptions {
  session: Session;
  edition: Edition;
  /** The session's page, as an absolute address. */
  url: string;
  /** Who is speaking, for the description. */
  speakerNames?: string[];
}

export function sessionIcs({ session, edition, url, speakerNames = [] }: IcsOptions): string {
  const day = edition.days[session.day - 1];
  if (!day) throw new Error(`Session ${session.slug} is on day ${session.day}, which ${edition.year} doesn't have`);

  const description = [session.summary, speakerNames.length ? `With ${speakerNames.join(', ')}.` : '', url]
    .filter(Boolean)
    .join('\n\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vert Robo Con//Summit//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${session.slug}-${edition.year}@vert-robo-con.example`,
    // The edition's dates are the only timestamps the site has, so the file
    // is stamped with the session's start rather than the moment of download:
    // the same session always produces the same file.
    `DTSTAMP:${stamp(day.date, session.time)}`,
    `DTSTART:${stamp(day.date, session.time)}`,
    `DTEND:${stamp(day.date, session.end)}`,
    `SUMMARY:${esc(session.title)}`,
    `DESCRIPTION:${esc(description)}`,
    `URL:${esc(url)}`,
    `LOCATION:${esc(`${edition.name} · ${edition.format}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  // Calendar files use CRLF throughout, and end with one.
  return `${lines.map(fold).join('\r\n')}\r\n`;
}
