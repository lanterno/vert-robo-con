/**
 * Every edition of the summit, from AdminEditionV3 and SummitV3. Demo content.
 *
 * 2027's registration opens on Dec 7, 2026 and its startup pitch call on
 * Dec 8 (#3); no time of day was chosen, so both open at 00:00 UTC until an
 * admin sets one (#39). Its registration has no closing date yet, so it
 * stays open through the summit.
 */
import type { Edition } from '@/lib/content/types';

export const EDITIONS: Edition[] = [
  {
    year: 2027,
    name: 'Vert Robo Con Summit 2027',
    dek: 'Three free afternoons online about robots that measure, repair and protect the places we all depend on.',
    days: [
      { date: '2027-04-20', label: 'Day 1' },
      { date: '2027-04-21', label: 'Day 2' },
      { date: '2027-04-22', label: 'Day 3' },
    ],
    window: { start: '14:00', end: '17:30' },
    format: 'Online',
    price: 'Free · open to everyone',
    registration: { opensAt: '2026-12-07T00:00:00Z', closingSoonDays: 7 },
    calls: [
      { id: 'startup', name: 'Startup pitch', opensAt: '2026-12-08T00:00:00Z' },
      { id: 'research', name: 'Research pitch' },
    ],
    program: 'not-started',
    recordings: 'not-applicable',
    tracks: ['Leaks & emissions', 'Floods & recovery', 'Farms & soil', 'Keeping robots running'],
    alsoShow: ['US Eastern', 'Central European'],
  },
  {
    year: 2026,
    name: 'Vert Robo Con Summit 2026',
    dek: 'Three afternoons on methane leaks, soil carbon, flood recovery, greenhouses and training the people who keep robots running.',
    tagline: 'What robots do after the storm, the leak and the pilot',
    description:
      'The second edition packed two keynotes, five panels, a student lightning round and two open sessions into three afternoons, covering methane leaks, soil carbon, flood recovery, greenhouse automation and training the people who fix robots.',
    days: [
      { date: '2026-05-19', label: 'Day 1' },
      { date: '2026-05-20', label: 'Day 2' },
      { date: '2026-05-21', label: 'Day 3' },
    ],
    window: { start: '15:00', end: '18:00' },
    format: 'Online',
    price: 'Free · open to everyone',
    program: 'published',
    recordings: 'in-editing',
    stats: { attendees: '280+', countries: '18', sessions: '10', speakers: '24' },
    recap: 'Keynotes from Hollis Wexford and Anaïs Brekke, plus eight panels and open sessions.',
    alsoShow: ['US Eastern', 'Central European'],
  },
  {
    year: 2025,
    name: 'Vert Robo Con Summit 2025',
    dek: 'The first full Vert Robo Con Summit brought 240+ people from 18 countries together for three afternoons, from wetlands and water boards to glaciers and city heat.',
    tagline: 'Wet ground, thin ice and hot streets',
    description:
      'The first edition brought 240+ people from 18 countries together for three afternoons of talks, pitch rounds and a single keynote, moving from wetlands and water agencies to glaciers and city heat, and ending on the unglamorous work of keeping robots running.',
    days: [
      { date: '2025-06-10', label: 'Day 1' },
      { date: '2025-06-11', label: 'Day 2' },
      { date: '2025-06-12', label: 'Day 3' },
    ],
    format: 'Online',
    price: 'Free · open to everyone',
    program: 'published',
    recordings: 'published',
    stats: { attendees: '240+', countries: '18', sessions: '12', speakers: '8' },
    recap: '240+ attendees from 18 countries. Keynote from Tamsin Ocampo.',
  },
  {
    year: 2024,
    name: 'Vert Robo Con Summit 2024',
    dek: 'The online pilot that started the Vert Robo Con Summit, held over two days, September 24–25, 2024.',
    pilot: true,
    recap: 'The online pilot that started the Vert Robo Con Summit, with a recap video.',
    days: [
      { date: '2024-09-24', label: 'Day 1' },
      { date: '2024-09-25', label: 'Day 2' },
    ],
    format: 'Online',
    price: 'Free · open to everyone',
    program: 'published',
    recordings: 'published',
  },
];
