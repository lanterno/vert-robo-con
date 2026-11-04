import { describe, expect, it } from 'vitest';
import {
  getEditions,
  getNews,
  getPartners,
  getPeople,
  getPerson,
  getProgram,
  getSettings,
  getSpeakers,
  getVideo,
  getVideos,
} from '@/lib/content';

/**
 * The content itself (#26): every reference resolves, every slug is unique,
 * every date parses. These keep a typo in a data file from becoming a broken
 * page.
 */
const unique = (xs: string[]) => new Set(xs).size === xs.length;
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

describe('editions', () => {
  const editions = getEditions();

  it('are newest first, one per year', () => {
    const years = editions.map((e) => e.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    expect(unique(years.map(String))).toBe(true);
  });

  it('have their days in order, as real dates', () => {
    for (const e of editions) {
      expect(e.days.length, `${e.year} has days`).toBeGreaterThan(0);
      for (const d of e.days) expect(isDate(d.date), `${e.year} ${d.date}`).toBe(true);
      const dates = e.days.map((d) => d.date);
      expect(dates, `${e.year} days in order`).toEqual([...dates].sort());
    }
  });

  it('have registration and call instants that parse', () => {
    for (const e of editions) {
      const instants = [e.registration?.opensAt, e.registration?.closesAt, ...(e.calls ?? []).flatMap((c) => [c.opensAt, c.closesAt])];
      for (const i of instants.filter((x): x is string => x !== undefined)) {
        expect(Number.isNaN(Date.parse(i)), `${e.year} ${i}`).toBe(false);
        expect(i.endsWith('Z'), `${e.year} ${i} is UTC`).toBe(true);
      }
    }
  });
});

describe('people', () => {
  const people = getPeople();

  it('each have one slug, and every role', () => {
    expect(unique(people.map((p) => p.slug))).toBe(true);
    for (const p of people) expect(p.roles.length, p.slug).toBeGreaterThan(0);
    expect(getPerson('hollis-wexford')?.roles.some((r) => r.kind === 'speaker' && r.year === 2026)).toBe(true);
  });

  it('list each edition’s keynotes first', () => {
    for (const year of [2025, 2026]) {
      const speakers = getSpeakers(year);
      expect(speakers.length, `${year} has speakers`).toBeGreaterThan(0);
      const flags = speakers.map((p) => p.roles.some((r) => r.kind === 'speaker' && r.year === year && r.keynote));
      expect(flags, `${year} keynotes lead`).toEqual([...flags].sort((a, b) => Number(b) - Number(a)));
    }
  });
});

describe('programs', () => {
  it('exist for 2025 and 2026, and not yet for 2027', () => {
    expect(getProgram(2025)?.length).toBe(3);
    expect(getProgram(2026)?.length).toBe(3);
    expect(getProgram(2027)).toBeUndefined();
  });

  it('point only at people and videos that exist', () => {
    for (const year of [2025, 2026]) {
      for (const day of getProgram(year) ?? []) {
        expect(isDate(day.date), `${year} day ${day.day}`).toBe(true);
        for (const s of day.sessions) {
          expect(s.time, `${s.slug} has a start time`).toMatch(/^\d{2}:\d{2}$/);
          expect(s.end, `${s.slug} has an end time`).toMatch(/^\d{2}:\d{2}$/);
          expect(s.end > s.time, `${s.slug} ends after it starts`).toBe(true);
          for (const slug of s.speakers) expect(getPerson(slug), `${year} ${s.slug} → ${slug}`).toBeDefined();
          if (s.recording) expect(getVideo(s.recording.video), `${year} ${s.slug} → ${s.recording.video}`).toBeDefined();
        }
        expect(unique(day.sessions.map((s) => s.slug)), `${year} day ${day.day} slugs`).toBe(true);
      }
    }
  });

  it('give every session a slug unique across its edition, for its own page', () => {
    for (const year of [2025, 2026]) {
      const slugs = (getProgram(year) ?? []).flatMap((d) => d.sessions.map((s) => s.slug));
      expect(slugs.filter((s, i) => slugs.indexOf(s) !== i), `${year} repeated slugs`).toEqual([]);
    }
  });

  it('name the speakers of 2026’s panels', () => {
    const methane = getProgram(2026)?.[0]?.sessions.find((s) => s.title.includes('methane'));
    expect(methane?.speakers).toEqual(['ruth-calloway', 'tobias-hartnell', 'selin-aydemir', 'gregor-pazdera']);
  });
});

describe('videos', () => {
  it('have unique slugs, real speakers, and no recording behind them', () => {
    const videos = getVideos();
    expect(unique(videos.map((v) => v.slug))).toBe(true);
    for (const v of videos) {
      for (const slug of v.speakers) expect(getPerson(slug), `${v.slug} → ${slug}`).toBeDefined();
      expect(v.youtubeId, `${v.slug} is demo content`).toBeUndefined();
    }
  });
});

describe('news', () => {
  const news = getNews();

  it('has unique slugs and real dates, newest first after the undated', () => {
    expect(unique(news.map((p) => p.slug))).toBe(true);
    const dated = news.filter((p) => p.date);
    for (const p of dated) expect(isDate(p.date!), p.slug).toBe(true);
    expect(dated.map((p) => p.date)).toEqual(dated.map((p) => p.date).sort().reverse());
    expect(news.findIndex((p) => p.date)).toBe(news.filter((p) => !p.date).length);
  });

  it('links only within the site', () => {
    for (const p of news) for (const l of p.links) expect(l.href, `${p.slug}: ${l.title}`).toMatch(/^\//);
  });
});

it('partners exist for past editions', () => {
  expect(getPartners(2025).length).toBeGreaterThan(0);
  expect(getPartners(2026).length).toBeGreaterThan(0);
  expect(getPartners(2027)).toEqual([]);
});

it('settings list each internship track once', () => {
  const ids = getSettings().internshipTracks.map((t) => t.id);
  expect(unique(ids)).toBe(true);
});
