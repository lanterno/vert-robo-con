import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { editionState, editionTimeline, getEdition, liveDay } from '@/lib/content/editions';
import { editionDates, formatDate, formatLongDate } from '@/lib/content/format';
import type { Edition } from '@/lib/content/types';

/**
 * editionState (#26): every boundary, a millisecond either side, and the
 * same answers whatever time zone the machine is in.
 */

const at = (iso: string) => new Date(iso);
const before = (iso: string) => new Date(Date.parse(iso) - 1);

const base: Edition = {
  year: 2099,
  name: 'Test edition',
  dek: '',
  days: [
    { date: '2099-04-20', label: 'Day 1' },
    { date: '2099-04-21', label: 'Day 2' },
    { date: '2099-04-22', label: 'Day 3' },
  ],
  format: 'Online',
  price: 'Free',
  program: 'not-started',
  recordings: 'not-applicable',
  registration: { opensAt: '2098-12-07T00:00:00Z', closingSoonDays: 7 },
};
const withReg = (reg: Partial<NonNullable<Edition['registration']>> | undefined): Edition => {
  if (reg === undefined) {
    const { registration: _unused, ...rest } = base;
    return rest;
  }
  return { ...base, registration: { ...base.registration!, ...reg } };
};

// Each case: an instant and the state from it onwards. The state just before
// each instant is the previous case's.
function expectTimeline(edition: Edition, steps: [string, string][]) {
  steps.forEach(([iso, state], i) => {
    expect(editionState(edition, at(iso)), `at ${iso}`).toBe(state);
    if (i > 0) expect(editionState(edition, before(iso)), `just before ${iso}`).toBe(steps[i - 1]![1]);
  });
}

// Each zone with its offset from UTC in December, as getTimezoneOffset gives it.
const ZONES: [string, number][] = [
  ['UTC', 0],
  ['Pacific/Kiritimati', -840],
  ['Pacific/Pago_Pago', 660],
  ['Asia/Kolkata', -330],
  ['America/New_York', 300],
  ['Europe/Berlin', -60],
];
const originalTz = process.env['TZ'];
afterAll(() => {
  if (originalTz === undefined) delete process.env['TZ'];
  else process.env['TZ'] = originalTz;
});

describe.each(ZONES)('in %s', (zone, offset) => {
  beforeEach(() => {
    process.env['TZ'] = zone;
  });

  it('really runs in that time zone', () => {
    expect(new Date('2098-12-07T00:00:00Z').getTimezoneOffset()).toBe(offset);
  });

  it('runs upcoming, open, closing soon, live, concluded when registration has no close', () => {
    // Closes when the summit ends, so "closing soon" starts 7 days before
    // that and is cut short by the summit starting; there is no closed gap.
    expectTimeline(base, [
      ['2098-01-01T00:00:00Z', 'upcoming'],
      ['2098-12-07T00:00:00Z', 'open'],
      ['2099-04-16T00:00:00Z', 'closing'],
      ['2099-04-20T00:00:00Z', 'live'],
      ['2099-04-23T00:00:00Z', 'concluded'],
    ]);
  });

  it('has a closed gap when registration closes before the summit', () => {
    expectTimeline(withReg({ closesAt: '2099-04-10T12:00:00Z' }), [
      ['2098-01-01T00:00:00Z', 'upcoming'],
      ['2098-12-07T00:00:00Z', 'open'],
      ['2099-04-03T12:00:00Z', 'closing'],
      ['2099-04-10T12:00:00Z', 'closed'],
      ['2099-04-20T00:00:00Z', 'live'],
      ['2099-04-23T00:00:00Z', 'concluded'],
    ]);
  });

  it('skips closing soon when its threshold is zero', () => {
    expectTimeline(withReg({ closesAt: '2099-04-10T12:00:00Z', closingSoonDays: 0 }), [
      ['2098-12-07T00:00:00Z', 'open'],
      ['2099-04-10T12:00:00Z', 'closed'],
      ['2099-04-20T00:00:00Z', 'live'],
    ]);
  });

  it('is closing soon from the moment it opens when the window is shorter than the threshold', () => {
    expectTimeline(withReg({ opensAt: '2099-04-08T00:00:00Z', closesAt: '2099-04-10T00:00:00Z' }), [
      ['2099-01-01T00:00:00Z', 'upcoming'],
      ['2099-04-08T00:00:00Z', 'closing'],
      ['2099-04-10T00:00:00Z', 'closed'],
    ]);
  });

  it('never runs backwards when the dates are in the wrong order', () => {
    // Closes before it opens: it goes straight from upcoming to closed.
    const e = withReg({ opensAt: '2099-03-01T00:00:00Z', closesAt: '2099-02-01T00:00:00Z' });
    expectTimeline(e, [
      ['2099-01-01T00:00:00Z', 'upcoming'],
      ['2099-03-01T00:00:00Z', 'closed'],
      ['2099-04-20T00:00:00Z', 'live'],
    ]);
    const b = editionTimeline(e);
    expect(b.upcomingEnd).toBeLessThanOrEqual(b.openEnd);
    expect(b.openEnd).toBeLessThanOrEqual(b.closingEnd);
    expect(b.closingEnd).toBeLessThanOrEqual(b.liveStart);
  });

  it('opening after the summit starts means upcoming until it goes live', () => {
    expectTimeline(withReg({ opensAt: '2099-05-01T00:00:00Z' }), [
      ['2099-01-01T00:00:00Z', 'upcoming'],
      ['2099-04-20T00:00:00Z', 'live'],
      ['2099-04-23T00:00:00Z', 'concluded'],
    ]);
  });

  it('is upcoming until live when there is no registration window', () => {
    expectTimeline(withReg(undefined), [
      ['2099-01-01T00:00:00Z', 'upcoming'],
      ['2099-04-20T00:00:00Z', 'live'],
      ['2099-04-23T00:00:00Z', 'concluded'],
    ]);
  });

  it('goes by the instant, not the local date', () => {
    // Already Dec 7 in Kiritimati (UTC+14), still Dec 6 in UTC: not open yet.
    expect(editionState(base, at('2098-12-07T00:00:00+14:00'))).toBe('upcoming');
    // Still Dec 6 in Pago Pago (UTC-11), already Dec 7 in UTC: open.
    expect(editionState(base, at('2098-12-06T13:00:00-11:00'))).toBe('open');
  });

  it('counts summit days in UTC', () => {
    expect(liveDay(base, before('2099-04-20T00:00:00Z'))).toBeUndefined();
    expect(liveDay(base, at('2099-04-20T00:00:00Z'))).toBe(1);
    expect(liveDay(base, at('2099-04-21T23:59:59Z'))).toBe(2);
    expect(liveDay(base, at('2099-04-22T12:00:00Z'))).toBe(3);
    expect(liveDay(base, at('2099-04-23T00:00:00Z'))).toBeUndefined();
  });

  it('formats dates without shifting a day', () => {
    expect(formatDate('2026-12-07T00:00:00Z')).toBe('December 7, 2026');
    expect(formatDate('2027-04-20')).toBe('April 20, 2027');
    expect(formatLongDate('2026-12-07')).toBe('Monday, December 7, 2026');
    expect(editionDates(base)).toBe('April 20–22, 2099');
  });
});

describe('the 2027 edition', () => {
  const e = getEdition(2027)!;

  it('opens registration on Monday, December 7, 2026, as decided in #3', () => {
    expect(formatLongDate(e.registration!.opensAt)).toBe('Monday, December 7, 2026');
    expect(editionState(e, before('2026-12-07T00:00:00Z'))).toBe('upcoming');
    expect(editionState(e, at('2026-12-07T00:00:00Z'))).toBe('open');
  });

  it('runs April 20–22, 2027', () => {
    expect(editionDates(e)).toBe('April 20–22, 2027');
    expect(editionState(e, at('2027-04-21T15:00:00Z'))).toBe('live');
    expect(editionState(e, at('2027-04-23T00:00:00Z'))).toBe('concluded');
  });

  it('opens the startup pitch call on December 8', () => {
    expect(e.calls?.find((c) => c.id === 'startup')?.opensAt).toBe('2026-12-08T00:00:00Z');
  });
});
