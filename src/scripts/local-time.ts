/**
 * Times are written in UTC on the server, because the site is built once and
 * served to everyone. This adds the reader's own time beside them (#29).
 *
 * Mark each one `<time data-utc="2026-05-19T15:00:00Z">`, and add
 * `data-utc-end` for a range. Each time is converted from its own instant,
 * so a summit in May gets that date's offset, not today's. With no
 * JavaScript the UTC time stands on its own, which is what the page says.
 */
const pad = (n: number) => String(n).padStart(2, '0');
const hhmm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

/** The reader's time zone, such as "Europe/Berlin". */
export function zoneName(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/** True when the reader is on UTC the whole year, so there is nothing to add. */
export function readerIsUtc(): boolean {
  // Two dates six months apart, so a zone that is UTC only in winter counts
  // as different.
  const year = new Date().getUTCFullYear();
  return new Date(Date.UTC(year, 0, 1)).getTimezoneOffset() === 0 && new Date(Date.UTC(year, 6, 1)).getTimezoneOffset() === 0;
}

export function initLocalTimes(): void {
  const times = [...document.querySelectorAll<HTMLTimeElement>('time[data-utc]')];
  if (times.length === 0 || readerIsUtc()) return;

  for (const el of times) {
    const iso = el.dataset['utc'];
    if (!iso) continue;
    const start = new Date(iso);
    if (Number.isNaN(start.getTime())) continue;
    const endIso = el.dataset['utcEnd'];
    const end = endIso ? new Date(endIso) : undefined;
    const local = end && !Number.isNaN(end.getTime()) ? `${hhmm(start)}–${hhmm(end)}` : hhmm(start);
    el.textContent = `${local} · ${el.dataset['utcText'] ?? ''} UTC`.replace('  ', ' ');
  }

  for (const note of document.querySelectorAll<HTMLElement>('[data-zone-note]')) {
    note.textContent = `Times are in UTC and your time (${zoneName()}).`;
  }
}
