import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { COOKIES, DATA_ROWS, LEGAL_ENTITY, PROCESSORS, REGISTERED_ADDRESS, RIGHTS } from '@/data/privacy';

/**
 * The privacy page against the decisions in docs/COMPLIANCE.md (#5).
 *
 * The two are written by hand in two places, so these checks keep them from
 * drifting apart.
 */
const compliance = readFileSync('docs/COMPLIANCE.md', 'utf8');

describe('every purpose', () => {
  it('says why the law lets us hold it, and for how long', () => {
    expect(DATA_ROWS.length).toBeGreaterThan(0);
    for (const row of DATA_ROWS) {
      expect(row.basis, `${row.id} has a legal basis`).toMatch(/Contract|Legitimate interests|Consent/);
      expect(row.keep, `${row.id} has a retention period`).toMatch(/\d+ months|while/i);
    }
  });

  it('leaves nothing undecided that the compliance roadmap has decided', () => {
    for (const row of DATA_ROWS) {
      expect(row.basis, `${row.id} basis`).not.toMatch(/\[|TBC|TODO/);
      expect(row.keep, `${row.id} retention`).not.toMatch(/\[N\]|TBC|TODO/);
    }
  });

  it('appears in the compliance roadmap, so the two can’t drift', () => {
    for (const row of DATA_ROWS) {
      expect(compliance, `${row.name} is in COMPLIANCE.md`).toContain(row.name);
    }
  });
});

describe('what is still open', () => {
  it('is only the controller’s registered address', () => {
    const placeholders = new Set<string>();
    const scan = (text: string) => {
      for (const m of text.matchAll(/\[[A-Z][A-Z /–]+\]/g)) placeholders.add(m[0]);
    };
    scan(`${LEGAL_ENTITY} ${REGISTERED_ADDRESS}`);
    for (const r of DATA_ROWS) scan(`${r.basis} ${r.keep} ${r.summary} ${r.published} ${r.inMyVrc} ${r.fields.join(' ')}`);
    for (const p of PROCESSORS) scan(`${p.name} ${p.where} ${p.does} ${p.when}`);
    for (const c of COOKIES) scan(`${c.where} ${c.what}`);
    for (const r of RIGHTS) scan(`${r.title} ${r.detail}`);
    expect([...placeholders].sort()).toEqual(['[REGISTERED ADDRESS]']);
  });

  it('is listed as still to do in the compliance roadmap', () => {
    expect(compliance).toContain('Replace the controller name and address with the real entity');
    expect(compliance).toContain('Have a lawyer read the Privacy page');
  });
});

describe('the commitments the build has to keep', () => {
  it('promises no cookies on public pages', () => {
    const publicPages = COOKIES.find((c) => c.where === 'Public pages');
    expect(publicPages?.what).toMatch(/no cookies at all/i);
  });

  it('lists a processor for every place data goes, each with a location', () => {
    expect(PROCESSORS.length).toBeGreaterThanOrEqual(5);
    for (const p of PROCESSORS) {
      expect(p.where, `${p.name} says where it is`).not.toBe('');
      expect(compliance, `${p.name} is in COMPLIANCE.md`).toContain(p.name.replace(' (analytics)', ''));
    }
  });

  it('offers all four rights people have over their own data', () => {
    expect(RIGHTS.map((r) => r.kind).sort()).toEqual(['ACCESS', 'CORRECTION', 'DELETION', 'EXPORT']);
  });
});
