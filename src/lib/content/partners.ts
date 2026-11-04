/** Each edition's partners. */
import { SPONSORS_2025, SPONSORS_2026, type Sponsor } from '@/lib/summits-data';
import type { Partner } from './types';

const BY_YEAR: Record<number, Sponsor[]> = { 2025: SPONSORS_2025, 2026: SPONSORS_2026 };

export function getPartners(year: number): Partner[] {
  return (BY_YEAR[year] ?? []).map((s) => ({ slug: s.id, name: s.name, logo: s.logoUrl, href: s.websiteUrl, tier: s.tier }));
}
