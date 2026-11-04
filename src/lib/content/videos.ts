/**
 * Recordings and episodes. Every video here is demo content with no
 * recording behind it: none has a YouTube id, so the player shows a
 * placeholder (VideoFacade). The "Robots in the Field" series joins in #30.
 */
import { SUMMIT_2025_VIDEOS, SUMMIT_2026_VIDEOS, type Video as LegacyVideo } from '@/lib/summits-data';
import { slugify } from './slug';
import type { Video } from './types';

const fromLegacy = (edition: number) => (v: LegacyVideo): Video => ({
  slug: v.id,
  title: v.title,
  ...(v.description ? { description: v.description } : {}),
  duration: v.duration,
  kind: v.type,
  edition,
  speakers: (v.speakers ?? []).map(slugify),
});

const VIDEOS: Video[] = [...SUMMIT_2025_VIDEOS.map(fromLegacy(2025)), ...SUMMIT_2026_VIDEOS.map(fromLegacy(2026))];

export function getVideos(): Video[] {
  return VIDEOS;
}

export function getVideo(slug: string): Video | undefined {
  return VIDEOS.find((v) => v.slug === slug);
}
