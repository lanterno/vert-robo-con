import { describe, expect, it } from 'vitest';
import { getNews, newsFeed, rfc822 } from '@/lib/content';

/** The news feed (#34). */
const feed = newsFeed({ posts: getNews(), site: 'https://example.test/', title: 'VRC news', description: 'Posts' });

describe('the news feed', () => {
  it('is well-formed RSS with a self link', () => {
    expect(feed.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"')).toBe(true);
    expect(feed).toContain('<atom:link href="https://example.test/news/rss.xml" rel="self"');
    // The trailing slash on the site address isn't doubled.
    expect(feed).not.toContain('example.test//');
  });

  it('includes only posts that have a date', () => {
    const items = feed.match(/<item>/g)?.length ?? 0;
    expect(items).toBe(getNews().filter((p) => p.date).length);
    expect(items).toBeLessThan(getNews().length);
  });

  it('writes dates the way RSS wants them', () => {
    expect(rfc822('2026-03-12')).toBe('Thu, 12 Mar 2026 00:00:00 GMT');
    expect(rfc822('2025-01-14')).toBe('Tue, 14 Jan 2025 00:00:00 GMT');
  });

  it('escapes the characters XML reserves', () => {
    const tricky = newsFeed({
      posts: [{ ...getNews()[0]!, date: '2026-01-01', title: 'Robots & "ice" <now>', summary: "It's here" }],
      site: 'https://example.test',
      title: 'VRC',
      description: 'd',
    });
    expect(tricky).toContain('<title>Robots &amp; &quot;ice&quot; &lt;now&gt;</title>');
    expect(tricky).toContain('It&apos;s here');
    // Nothing unescaped leaked through.
    expect(tricky.replace(/&(amp|lt|gt|quot|apos);/g, '')).not.toMatch(/&(?![a-z]+;)/);
  });
});
