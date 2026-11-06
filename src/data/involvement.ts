/**
 * The ways to take part, from GetInvolvedV3. Demo content.
 *
 * Whether the two programmes are open is a setting an admin changes (#46),
 * so their status lives in src/data/settings.ts; what they are stays here.
 * "[TIER N]" and "[DATE]" are the canvas's placeholders, kept as they are
 * (#7).
 */
export interface SponsorTier {
  name: string;
  /** Already taken for the coming edition. */
  taken: boolean;
  perks: string[];
}

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    name: '[TIER 1]',
    taken: true,
    perks: [
      'Welcome slot in the opening session',
      'Logo on the summit page, stream and recordings',
      'Named sponsor of one session',
      'Features in the monthly digest',
      'Intros to startups and labs you choose',
    ],
  },
  {
    name: '[TIER 2]',
    taken: false,
    perks: [
      'Named sponsor of one session',
      'Logo on the summit page and stream',
      'A feature in the monthly digest',
      'Thanks in the session intros',
      'Credit on the session recording',
    ],
  },
  {
    name: '[TIER 3]',
    taken: false,
    perks: [
      'Logo on the summit page',
      'Thanks in the opening remarks',
      'Listing in the summit recap',
      'Credit on the recordings',
      'A thank-you post to the network',
    ],
  },
];

export const SPONSOR_FAQ: { question: string; answer: string }[] = [
  {
    question: 'Can we sponsor a single session?',
    answer: 'Yes, if it fits the program. Name the session or topic when you express interest and we’ll suggest options.',
  },
  { question: 'Is it online only?', answer: 'Yes. The 2027 summit runs online, April 20–22, 2027, and is free and open to everyone.' },
  {
    question: 'Do you offer in-kind sponsorship?',
    answer: 'Tell us what you’d like to offer and pick “Not sure yet” as the tier. We’ll reply with what’s possible.',
  },
  { question: 'When do we need to decide?', answer: 'By [DATE] to be listed on the program page and in the session intros.' },
];

export type ProjectKicker = 'Community' | 'Research' | 'Education';

export interface Project {
  id: string;
  name: string;
  kicker: ProjectKicker;
  description: string;
  /** A project whose status an admin sets, by the key in the settings. */
  programme?: 'schools' | 'fieldSkills';
}

export const PROJECTS: Project[] = [
  {
    id: 'repair',
    name: 'Fix-it Circle',
    kicker: 'Community',
    description: 'Monthly online sessions where members bring a broken sensor, rover or drone and work out the fix together.',
  },
  {
    id: 'parts',
    name: 'Open Parts Library',
    kicker: 'Community',
    description: 'A shared list of spare parts, drawings and suppliers for common field robots, kept up to date by members.',
  },
  {
    id: 'notes',
    name: 'Field note template',
    kicker: 'Research',
    description: 'A shared template for writing up a deployment for the white paper. Read it and suggest changes, section by section.',
  },
  {
    id: 'schools',
    name: 'Schools kit',
    kicker: 'Education',
    description: 'Classroom projects on robots and the climate that teachers can run with simple kits. Start date [DATE].',
    programme: 'schools',
  },
  {
    id: 'hub',
    name: 'Learning hub',
    kicker: 'Education',
    description: 'Short online lessons on running and repairing field robots, planned for a later stage.',
    programme: 'fieldSkills',
  },
];
