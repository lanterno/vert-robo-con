/** News posts, newest first; undated placeholder posts lead, as on NewsV3. */
import { NEWS } from '@/data/news';
import type { NewsPost } from './types';

export function getNews(): NewsPost[] {
  return [...NEWS].sort((a, b) => (b.date ?? '9999').localeCompare(a.date ?? '9999'));
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return NEWS.find((p) => p.slug === slug);
}
