/**
 * Recordings and episodes (#30), from src/data/videos.ts.
 *
 * No demo video has a recording behind it, so each shows a placeholder
 * instead of contacting a video host (VideoFacade).
 */
import { SERIES, VIDEOS } from '@/data/videos';
import type { Video, VideoTopic } from './types';

/** What each topic is called in Watch. */
export const VIDEO_TOPICS: Record<VideoTopic, string> = {
  air: 'Air',
  land: 'Land',
  sea: 'Sea',
  materials: 'Materials',
};

export function getVideos(): Video[] {
  return VIDEOS;
}

export function getVideo(slug: string): Video | undefined {
  return VIDEOS.find((v) => v.slug === slug);
}

export function getSeries(): typeof SERIES {
  return SERIES;
}

/** The series' episodes, in order. */
export function getEpisodes(): Video[] {
  return VIDEOS.filter((v) => v.series !== undefined).sort((a, b) => (a.series?.episode ?? 0) - (b.series?.episode ?? 0));
}

/** An edition's recordings, in the order they were recorded. */
export function getRecordings(year: number): Video[] {
  return VIDEOS.filter((v) => v.edition === year);
}

/** Every person who appears in a video, by slug, for the speaker filter. */
export function getVideoSpeakers(): string[] {
  return [...new Set(VIDEOS.flatMap((v) => v.speakers))];
}
