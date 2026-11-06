import { describe, expect, it } from 'vitest';
import { creditedAs, getAuthors, getPeople, getPerson, getTeam, initials } from '@/lib/content';

/** The people the site knows about (#33). */
describe('initials, for when there is no portrait', () => {
  it('takes the first and last names', () => {
    expect(initials('Tamsin Ocampo')).toBe('TO');
    expect(initials('Anaïs Brekke')).toBe('AB');
    expect(initials('Mary Jane Watson-Clark')).toBe('MW');
  });

  it('skips a title', () => {
    expect(initials('Dr. Mireille Vos')).toBe('MV');
    expect(initials('Prof Hollis Wexford')).toBe('HW');
  });

  it('gives one letter for one name', () => {
    expect(initials('Prince')).toBe('P');
  });

  it('never returns punctuation from a placeholder', () => {
    expect(initials('[SPEAKER NAME]')).toBe('');
    expect(initials('Kenji "Ken" Albescu')).toBe('KA');
  });
});

describe('roles', () => {
  it('give one person every role they hold', () => {
    const mireille = getPerson('mireille-vos');
    expect(mireille?.roles.map((r) => r.kind).sort()).toEqual(['author', 'speaker', 'team']);
  });

  it('credit an author as the paper does, and leave their name alone', () => {
    const mireille = getPerson('mireille-vos')!;
    expect(mireille.name).toBe('Mireille Vos');
    expect(creditedAs(mireille, 2025)).toBe('Dr. Mireille Vos');
    // Someone credited under their own name gets it back unchanged.
    expect(creditedAs(getPerson('elif-brandvold')!, 2025)).toBe('Elif Brandvold');
  });

  it('list the authors in credited order', () => {
    expect(getAuthors(2025).map((p) => p.slug)).toEqual([
      'elif-brandvold',
      'mireille-vos',
      'noor-halloran',
      'chidinma-varga',
      'kenji-albescu',
      'marguerite-osterhout',
    ]);
    expect(getAuthors(2099)).toEqual([]);
  });

  it('give the team their bios and links from the board', () => {
    const elif = getPerson('elif-brandvold');
    expect(elif?.bio).toContain('mailing list');
    expect(elif?.links?.[0]?.href).toContain('vert-robo-con.example');
    expect(getTeam().length).toBeGreaterThan(0);
  });

  it('include every person the boards name, each with a portrait', () => {
    // The boards list 39 people. One of them, the consulting coordinator, is
    // not in the summit data, so she is added in src/data/people.ts; without
    // her the contact page has no coordinator card.
    expect(getPerson('imogen-calder')?.roles.some((r) => r.kind === 'team')).toBe(true);
    expect(getTeam()).toHaveLength(7);
    expect(getPeople()).toHaveLength(39);
    for (const p of getPeople()) expect(p.photo, `${p.slug} has no portrait`).toBeDefined();
  });

  it('point every link at the demo domain, never a real site', () => {
    for (const p of getPeople()) {
      for (const l of p.links ?? []) expect(l.href, `${p.slug}: ${l.href}`).toContain('vert-robo-con.example');
    }
  });
});
