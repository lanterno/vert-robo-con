/**
 * The news feed (#34), as RSS 2.0.
 *
 * Only posts with a date are included: an undated post is a placeholder
 * waiting for its date, and a feed reader has nowhere to put it.
 */
import type { NewsPost } from './types';

/** Escapes the five characters XML reserves. */
function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** "2026-03-12" -> "Thu, 12 Mar 2026 00:00:00 GMT", the format RSS wants. */
export function rfc822(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${days[d.getUTCDay()]}, ${pad(d.getUTCDate())} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} 00:00:00 GMT`;
}

export interface FeedOptions {
  posts: NewsPost[];
  /** The site's address, such as "https://crn.elghareeb.space". */
  site: string;
  title: string;
  description: string;
}

export function newsFeed({ posts, site, title, description }: FeedOptions): string {
  const base = site.replace(/\/$/, '');
  const dated = posts.filter((p) => p.date !== undefined);
  const items = dated.map((post) => {
    const url = `${base}/news/${post.slug}`;
    return [
      '    <item>',
      `      <title>${esc(post.title)}</title>`,
      `      <link>${esc(url)}</link>`,
      `      <guid isPermaLink="true">${esc(url)}</guid>`,
      `      <pubDate>${rfc822(post.date!)}</pubDate>`,
      `      <description>${esc(post.summary)}</description>`,
      `      <category>${esc(post.type)}</category>`,
      '    </item>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${esc(title)}</title>`,
    `    <link>${esc(`${base}/news`)}</link>`,
    `    <description>${esc(description)}</description>`,
    '    <language>en</language>',
    `    <atom:link href="${esc(`${base}/news/rss.xml`)}" rel="self" type="application/rss+xml" />`,
    ...(dated[0]?.date ? [`    <lastBuildDate>${rfc822(dated[0].date)}</lastBuildDate>`] : []),
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}
