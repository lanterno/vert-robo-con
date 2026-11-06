/**
 * The internship tracks, from JobsV3. Demo content.
 *
 * Whether a track is open is a setting an admin changes (#46), so it lives
 * in src/data/settings.ts; what each track is stays here.
 */
export interface InternshipTrack {
  id: 'map' | 'summit' | 'writing' | 'own';
  name: string;
  description: string;
  /** What someone needs to bring, if anything. */
  needs?: string;
}

export const INTERNSHIP_TRACKS: InternshipTrack[] = [
  {
    id: 'map',
    name: 'Map data',
    description: 'Check and update entries on the organization map, and follow up on suggestions from members.',
    needs: 'Care with detail and some spreadsheet experience',
  },
  {
    id: 'summit',
    name: 'Summit production',
    description: 'Help run the online summit: speaker briefings, captions, the live stream and cutting recordings afterwards.',
    needs: 'Any event or video work you can show us',
  },
  {
    id: 'writing',
    name: 'Writing & editing',
    description: 'Edit field notes and news posts, and help prepare the next edition of the white paper.',
    needs: 'Writing you can show us',
  },
  {
    id: 'own',
    name: 'Your own idea',
    description: 'Tell us what you want to learn and what you would work on. We will say honestly whether we can support it.',
  },
];

/** How long a placement runs, shown on every track. */
export const INTERNSHIP_TERMS = '6–12 weeks · part time · remote';
