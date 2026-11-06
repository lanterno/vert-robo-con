/** Site settings: the programme and internship switches, the map licence. */
import { INTERNSHIP_TRACKS, INTERNSHIP_TERMS, type InternshipTrack } from '@/data/internships';
import { PROJECTS, type Project } from '@/data/involvement';
import { SETTINGS } from '@/data/settings';
import type { Availability, Settings } from './types';

export function getSettings(): Settings {
  return SETTINGS;
}

export { INTERNSHIP_TERMS };

/** Each internship track with the status an admin set for it (#46). */
export function getInternshipTracks(): (InternshipTrack & { status: Availability })[] {
  return INTERNSHIP_TRACKS.map((track) => ({
    ...track,
    status: SETTINGS.internshipTracks.find((t) => t.id === track.id)?.status ?? 'later',
  }));
}

/** Each project with its status: the two programmes take theirs from settings. */
export function getProjects(): (Project & { status: Availability })[] {
  return PROJECTS.map((project) => ({
    ...project,
    status: project.programme ? SETTINGS.programmes[project.programme] : 'open',
  }));
}
