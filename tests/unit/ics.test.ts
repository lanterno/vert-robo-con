import { describe, expect, it } from 'vitest';
import { getEdition, getSession, sessionIcs } from '@/lib/content';

/** The calendar file for a session (#29). */
const edition = getEdition(2026)!;
const session = getSession(2026, 'panel-finding-methane-leaks-sooner')!;
const file = sessionIcs({ session, edition, url: 'https://example.test/summits/2026/sessions/x', speakerNames: ['Ruth Calloway'] });
const lines = file.split('\r\n');
const value = (key: string) => lines.find((l) => l.startsWith(`${key}:`))?.slice(key.length + 1);

describe('a session calendar file', () => {
  it('is a well-formed calendar with one event', () => {
    expect(lines[0]).toBe('BEGIN:VCALENDAR');
    expect(lines.at(-2)).toBe('END:VCALENDAR');
    expect(file.endsWith('\r\n')).toBe(true);
    expect(file.split('BEGIN:VEVENT')).toHaveLength(2);
    // Every line ends CRLF, and none is a bare LF.
    expect(file.replace(/\r\n/g, '')).not.toContain('\n');
  });

  it('puts the session at its UTC instant', () => {
    expect(value('DTSTART')).toBe('20260519T150000Z');
    expect(value('DTEND')).toBe('20260520T155000Z'.replace('0520', '0519'));
    expect(value('UID')).toBe('panel-finding-methane-leaks-sooner-2026@vert-robo-con.example');
  });

  it('is the same file every time, so a re-download is not a new event', () => {
    const again = sessionIcs({ session, edition, url: 'https://example.test/summits/2026/sessions/x', speakerNames: ['Ruth Calloway'] });
    expect(again).toBe(file);
  });

  it('names the session, its speakers and its page', () => {
    expect(value('SUMMARY')).toBe('Panel: Finding methane leaks sooner');
    expect(file).toContain('With Ruth Calloway.');
    expect(file).toContain('https://example.test/summits/2026/sessions/x');
  });

  it('escapes the characters that mean something in a calendar file', () => {
    const tricky = sessionIcs({
      session: { ...session, title: 'Robots; drones, and "ice"', summary: 'One line\nAnother' },
      edition,
      url: 'https://example.test/x',
    });
    const summary = tricky.split('\r\n').find((l) => l.startsWith('SUMMARY:'));
    expect(summary).toBe('SUMMARY:Robots\; drones\\, and "ice"');
    expect(tricky).toContain('One line\\nAnother');
  });

  it('folds long lines at 75 octets, without splitting a character', () => {
    const long = sessionIcs({
      session: { ...session, title: `Measuring ${'é'.repeat(80)} ice` },
      edition,
      url: 'https://example.test/x',
    });
    for (const line of long.split('\r\n')) {
      expect(new TextEncoder().encode(line).length, `too long: ${line}`).toBeLessThanOrEqual(75);
    }
    // Unfolding puts it back together, accents intact.
    expect(long.replace(/\r\n /g, '')).toContain(`SUMMARY:Measuring ${'é'.repeat(80)} ice`);
  });
});
