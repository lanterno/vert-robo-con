import { describe, expect, it } from 'vitest';
import { editionChip, getDomains, getEdition, getMapStats } from '@/lib/content';

/** What the home page says about the summit and the map (#27). */
describe('editionChip', () => {
  const e = getEdition(2027)!;
  const chip = (iso: string) => editionChip(e, new Date(iso));

  it('says when registration opens, in a neutral chip', () => {
    expect(chip('2026-11-04T12:00:00Z')).toEqual({ state: 'upcoming', tone: 'neutral', label: 'REGISTRATION OPENS DEC 7, 2026' });
  });
  it('is green once registration is open', () => {
    expect(chip('2026-12-07T00:00:00Z')).toMatchObject({ tone: 'green', label: 'REGISTRATION OPEN · FREE' });
  });
  it('counts down the last days', () => {
    expect(chip('2027-04-17T00:00:00Z')).toMatchObject({ state: 'closing', tone: 'amber', label: 'CLOSES IN 3 DAYS · APR 22, 2027' });
    expect(chip('2027-04-19T12:00:00Z').label).toBe('CLOSES IN 1 DAY · APR 22, 2027');
  });
  it('names the summit day while live, then concludes', () => {
    expect(chip('2027-04-21T15:00:00Z')).toMatchObject({ tone: 'green', label: 'LIVE NOW · DAY 2' });
    expect(chip('2027-05-01T00:00:00Z')).toMatchObject({ tone: 'neutral', label: 'CONCLUDED' });
  });
  it('never uses a blue tone', () => {
    const tones = ['2026-01-01', '2026-12-08', '2027-04-18', '2027-04-21', '2028-01-01'].map((d) => chip(`${d}T00:00:00Z`).tone);
    expect(tones).not.toContain('blue');
  });
});

describe('the map figures', () => {
  it('come from the organisations data', () => {
    expect(getMapStats()).toEqual({ organizations: 120, countries: 18, deployed: 70 });
  });

  it('sort organisations into the four places robots work, with the board’s examples in each', () => {
    const counts = Object.fromEntries(getDomains().map((d) => [d.id, d.count]));
    expect(counts).toEqual({ sky: 37, field: 36, water: 31, factory: 4 });
    for (const d of getDomains()) expect(d.examples).toHaveLength(3);
  });
});
