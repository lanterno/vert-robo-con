/**
 * Vert Robo Con Summit data
 *
 * Summit metadata, programs, speakers, partners and the recording catalogue.
 * Every person, organisation, session and recording in this file is fictional
 * demo content. There are no real videos: each recording renders a placeholder.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface Summit {
  year: string;
  name: string;
  dates: string;
  dateRange: { start: string; end: string };
  location: string;
  status: 'upcoming' | 'past';
  tagline: string;
  description: string;
  registrationUrl?: string;
  stats?: {
    attendees: string;
    countries: string;
    sessions: string;
    speakers: string;
  };
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio?: string;
  photoUrl?: string;
  isKeynote?: boolean;
  summitYear: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  duration: string;
  type: 'keynote' | 'panel' | 'talk' | 'pitch' | 'opening' | 'closing';
  speakers?: string[];
  day: number;
  order: number;
}

export interface Session {
  id: string;
  title: string;
  time: string;
  description?: string;
  videos: Video[];
  type: 'keynote' | 'panel' | 'break' | 'networking';
}

export interface ProgramDay {
  day: number;
  date: string;
  theme: string;
  sessions: Session[];
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  organization?: string;
  photoUrl?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  tier: 'platinum' | 'gold' | 'silver' | 'partner' | 'organizing';
}

const avatar = (slug: string) => `/images/people/${slug}.svg`;
const partnerLogo = (slug: string) => `/images/partners/${slug}.svg`;
const partnerSite = (slug: string) => `https://vert-robo-con.example/partners/${slug}`;

// =============================================================================
// SUMMITS
// =============================================================================

export const SUMMITS: Record<string, Summit> = {
  '2026': {
    year: '2026',
    name: 'Vert Robo Con Summit 2026',
    dates: 'May 19-21, 2026',
    dateRange: { start: '2026-05-19', end: '2026-05-21' },
    location: 'Online',
    status: 'past',
    tagline: 'What robots do after the storm, the leak and the pilot',
    description: 'The second edition packed two keynotes, five panels, a student lightning round and two open sessions into three afternoons, covering methane leaks, soil carbon, flood recovery, greenhouse automation and training the people who fix robots.',
    stats: {
      attendees: '280+',
      countries: '18',
      sessions: '10',
      speakers: '24',
    },
  },
  '2025': {
    year: '2025',
    name: 'Vert Robo Con Summit 2025',
    dates: 'June 10-12, 2025',
    dateRange: { start: '2025-06-10', end: '2025-06-12' },
    location: 'Online',
    status: 'past',
    tagline: 'Wet ground, thin ice and hot streets',
    description: 'The first edition brought 240+ people from 18 countries together for three afternoons of talks, pitch rounds and a single keynote, moving from wetlands and water agencies to glaciers and city heat, and ending on the unglamorous work of keeping robots running.',
    stats: {
      attendees: '240+',
      countries: '18',
      sessions: '12',
      speakers: '8',
    },
  },
};

// =============================================================================
// SUMMIT 2025 RECORDINGS (placeholders only)
// =============================================================================

export const SUMMIT_2025_VIDEOS: Video[] = [
  // Day 1 - Wetlands & water agencies
  {
    id: 'v25-welcome',
    title: 'Welcome and How the Three Days Work',
    duration: '6:20',
    type: 'opening',
    day: 1,
    order: 1,
  },
  {
    id: 'v25-peat',
    title: 'Robots on Soft Ground: Peat and Marsh',
    description: 'Why tracked robots sink, why drones miss the water table, and what restoration crews actually measure.',
    duration: '41:05',
    type: 'panel',
    speakers: ['Odile Farrow', 'Yewande Sorensen'],
    day: 1,
    order: 2,
  },
  {
    id: 'v25-tender',
    title: 'Writing a Robot Into a Public Tender',
    description: 'A water board buyer walks through the paperwork, line by line.',
    duration: '27:30',
    type: 'talk',
    speakers: ['Rafael Quist'],
    day: 1,
    order: 3,
  },
  {
    id: 'v25-pitches-water',
    title: 'Pitch Round: Water and Wetland Teams',
    description: 'Four invented start-ups get eight minutes each, then questions from a buyer.',
    duration: '44:10',
    type: 'pitch',
    speakers: ['Yewande Sorensen'],
    day: 1,
    order: 4,
  },
  // Day 2 - Ice & heat
  {
    id: 'v25-heat',
    title: 'Sidewalk Robots and the Urban Heat Map',
    description: 'Slow rovers that log surface temperature street by street through a summer.',
    duration: '24:55',
    type: 'talk',
    speakers: ['Ines Valderrama'],
    day: 2,
    order: 1,
  },
  {
    id: 'v25-keynote-ocampo',
    title: 'Keynote: Measuring a Glacier That Will Not Hold Still',
    duration: '33:40',
    type: 'keynote',
    speakers: ['Tamsin Ocampo'],
    day: 2,
    order: 2,
  },
  {
    id: 'v25-cold',
    title: 'Batteries, Sensors and Minus Twenty',
    description: 'Field notes on what fails first when the temperature drops.',
    duration: '38:15',
    type: 'panel',
    speakers: ['Tamsin Ocampo', 'Kenji Albescu'],
    day: 2,
    order: 3,
  },
  {
    id: 'v25-pitches-city',
    title: 'Pitch Round: City and Cold-Climate Teams',
    description: 'Five invented teams, judged on what it would take to buy their robot.',
    duration: '42:00',
    type: 'pitch',
    speakers: ['Rafael Quist'],
    day: 2,
    order: 4,
  },
  // Day 3 - Keeping robots running
  {
    id: 'v25-technicians',
    title: 'A Technician’s Wishlist for Robot Makers',
    description: 'Access panels, labelled cables and manuals that survive the rain.',
    duration: '29:10',
    type: 'talk',
    speakers: ['Kenji Albescu'],
    day: 3,
    order: 1,
  },
  {
    id: 'v25-open-hardware',
    title: 'Spare Parts, Open Designs and Long Lives',
    description: 'How published drawings keep a robot working after its maker moves on.',
    duration: '26:45',
    type: 'talk',
    speakers: ['Marguerite Osterhout'],
    day: 3,
    order: 2,
  },
  {
    id: 'v25-insurance',
    title: 'Who Pays When a Field Robot Breaks?',
    description: 'Liability, cover and the questions an insurer asks before a pilot starts.',
    duration: '31:20',
    type: 'talk',
    speakers: ['Henrik Paledo'],
    day: 3,
    order: 3,
  },
  {
    id: 'v25-wrap',
    title: 'Audience Vote and Wrap-up',
    duration: '12:05',
    type: 'closing',
    day: 3,
    order: 4,
  },
];

const videos25 = (id: string) => SUMMIT_2025_VIDEOS.filter(v => v.id === id);

export const SUMMIT_2025_PROGRAM: ProgramDay[] = [
  {
    day: 1,
    date: 'June 10, 2025',
    theme: 'Wetlands & Water Agencies',
    sessions: [
      {
        id: 's25-1-1',
        title: 'Welcome and Housekeeping',
        time: '13:00 - 13:10 UTC',
        description: 'Captions, chat etiquette and where to find the pitch voting form.',
        type: 'networking',
        videos: videos25('v25-welcome'),
      },
      {
        id: 's25-1-2',
        title: 'Robots on Soft Ground: Peat and Marsh',
        time: '13:10 - 13:55 UTC',
        description: 'A restoration officer and a journalist compare notes from the bog.',
        type: 'panel',
        videos: videos25('v25-peat'),
      },
      {
        id: 's25-1-3',
        title: 'Writing a Robot Into a Public Tender',
        time: '14:05 - 14:35 UTC',
        description: 'What a public buyer needs to see before signing anything.',
        type: 'panel',
        videos: videos25('v25-tender'),
      },
      {
        id: 's25-1-4',
        title: 'Pitch Round: Water and Wetland Teams',
        time: '14:45 - 15:30 UTC',
        description: 'Short pitches, then a buyer asks the awkward questions.',
        type: 'panel',
        videos: videos25('v25-pitches-water'),
      },
    ],
  },
  {
    day: 2,
    date: 'June 11, 2025',
    theme: 'Ice & Heat',
    sessions: [
      {
        id: 's25-2-1',
        title: 'Sidewalk Robots and the Urban Heat Map',
        time: '13:00 - 13:30 UTC',
        description: 'Street-level temperature data and how a city planner uses it.',
        type: 'panel',
        videos: videos25('v25-heat'),
      },
      {
        id: 's25-2-2',
        title: 'Keynote: Measuring a Glacier That Will Not Hold Still',
        time: '13:40 - 14:15 UTC',
        description: 'Keeping instruments alive on ice that moves, melts and buries them.',
        type: 'keynote',
        videos: videos25('v25-keynote-ocampo'),
      },
      {
        id: 's25-2-3',
        title: 'Batteries, Sensors and Minus Twenty',
        time: '14:25 - 15:05 UTC',
        description: 'A glaciologist and a wind technician on working in the cold.',
        type: 'panel',
        videos: videos25('v25-cold'),
      },
      {
        id: 's25-2-4',
        title: 'Pitch Round: City and Cold-Climate Teams',
        time: '15:15 - 16:00 UTC',
        description: 'The second pitch round, with the audience vote open until Day 3.',
        type: 'panel',
        videos: videos25('v25-pitches-city'),
      },
    ],
  },
  {
    day: 3,
    date: 'June 12, 2025',
    theme: 'Keeping Robots Running',
    sessions: [
      {
        id: 's25-3-1',
        title: 'A Technician’s Wishlist for Robot Makers',
        time: '13:00 - 13:30 UTC',
        description: 'Design choices that save a repair crew an afternoon.',
        type: 'panel',
        videos: videos25('v25-technicians'),
      },
      {
        id: 's25-3-2',
        title: 'Spare Parts, Open Designs and Long Lives',
        time: '13:40 - 14:10 UTC',
        description: 'Why some robots are still working ten years on.',
        type: 'panel',
        videos: videos25('v25-open-hardware'),
      },
      {
        id: 's25-3-3',
        title: 'Who Pays When a Field Robot Breaks?',
        time: '14:20 - 14:55 UTC',
        description: 'An insurance engineer on cover, liability and pilot contracts.',
        type: 'panel',
        videos: videos25('v25-insurance'),
      },
      {
        id: 's25-3-4',
        title: 'Audience Vote and Wrap-up',
        time: '15:05 - 15:20 UTC',
        description: 'Pitch vote results and the topics attendees asked for next year.',
        type: 'networking',
        videos: videos25('v25-wrap'),
      },
    ],
  },
];

// =============================================================================
// SPEAKERS 2025
// =============================================================================

export const SPEAKERS_2025: Speaker[] = [
  {
    id: 'tamsin-ocampo',
    name: 'Tamsin Ocampo',
    title: 'Glaciologist',
    organization: 'Example University',
    photoUrl: avatar('tamsin-ocampo'),
    bio: 'Tamsin has lost more weather stations to crevasses than she likes to admit, and now designs instrument sleds that can be dug out and reused.',
    isKeynote: true,
    summitYear: '2025',
  },
  {
    id: 'odile-farrow',
    name: 'Odile Farrow',
    title: 'Peatland Restoration Officer',
    organization: 'Example Wetlands Trust',
    photoUrl: avatar('odile-farrow'),
    bio: 'Odile plans ditch-blocking work on upland bogs and tests which survey tools can cross wet peat without damaging it.',
    summitYear: '2025',
  },
  {
    id: 'rafael-quist',
    name: 'Rafael Quist',
    title: 'Procurement Lead',
    organization: 'Example Regional Water Board',
    photoUrl: avatar('rafael-quist'),
    bio: 'Rafael writes the tenders that decide which inspection equipment a regional water board can buy.',
    summitYear: '2025',
  },
  {
    id: 'ines-valderrama',
    name: 'Ines Valderrama',
    title: 'Urban Climate Analyst',
    organization: 'City of Example',
    photoUrl: avatar('ines-valderrama'),
    bio: 'Ines turns street-level temperature readings into shade and tree-planting plans for a mid-sized city.',
    summitYear: '2025',
  },
  {
    id: 'kenji-albescu',
    name: 'Kenji Albescu',
    title: 'Wind Turbine Technician & Trainer',
    organization: 'Example Wind Cooperative',
    photoUrl: avatar('kenji-albescu'),
    bio: 'Kenji climbs turbines for a living and trains new technicians to work alongside blade-inspection robots.',
    summitYear: '2025',
  },
  {
    id: 'marguerite-osterhout',
    name: 'Marguerite Osterhout',
    title: 'Open-Hardware Maintainer',
    organization: 'Example Open Hardware Collective',
    photoUrl: avatar('marguerite-osterhout'),
    bio: 'Marguerite keeps the drawings, parts lists and repair guides for a family of community-built sensor rovers up to date.',
    summitYear: '2025',
  },
  {
    id: 'henrik-paledo',
    name: 'Henrik Paledo',
    title: 'Risk Engineer',
    organization: 'Example Mutual',
    photoUrl: avatar('henrik-paledo'),
    bio: 'Henrik assesses what can go wrong before an insurer agrees to cover a field trial.',
    summitYear: '2025',
  },
  {
    id: 'yewande-sorensen',
    name: 'Yewande Sorensen',
    title: 'Science Journalist & Moderator',
    organization: 'Freelance',
    photoUrl: avatar('yewande-sorensen'),
    bio: 'Yewande reports on environmental technology and moderated the wetlands panel and the first pitch round.',
    summitYear: '2025',
  },
];

// =============================================================================
// PARTNERS
// =============================================================================

export const SPONSORS_2025: Sponsor[] = [
  {
    id: 'vrc',
    name: 'Vert Robo Con',
    logoUrl: partnerLogo('vrc'),
    websiteUrl: partnerSite('vrc'),
    tier: 'organizing',
  },
  {
    id: 'example-polytechnic',
    name: 'Example Polytechnic',
    logoUrl: partnerLogo('example-polytechnic'),
    websiteUrl: partnerSite('example-polytechnic'),
    tier: 'organizing',
  },
  {
    id: 'example-climate-fund',
    name: 'Example Climate Fund',
    logoUrl: partnerLogo('example-climate-fund'),
    websiteUrl: partnerSite('example-climate-fund'),
    tier: 'gold',
  },
  {
    id: 'example-field-tools',
    name: 'Example Field Tools Co.',
    logoUrl: partnerLogo('example-field-tools'),
    websiteUrl: partnerSite('example-field-tools'),
    tier: 'silver',
  },
  {
    id: 'example-data-commons',
    name: 'Example Data Commons',
    logoUrl: partnerLogo('example-data-commons'),
    websiteUrl: partnerSite('example-data-commons'),
    tier: 'silver',
  },
  {
    id: 'example-wetlands-trust',
    name: 'Example Wetlands Trust',
    logoUrl: partnerLogo('example-wetlands-trust'),
    websiteUrl: partnerSite('example-wetlands-trust'),
    tier: 'partner',
  },
  {
    id: 'example-coastal-trust',
    name: 'Example Coastal Trust',
    logoUrl: partnerLogo('example-coastal-trust'),
    websiteUrl: partnerSite('example-coastal-trust'),
    tier: 'partner',
  },
  {
    id: 'example-makerspace',
    name: 'Example Makerspace',
    logoUrl: partnerLogo('example-makerspace'),
    websiteUrl: partnerSite('example-makerspace'),
    tier: 'partner',
  },
];

export const SPONSORS_2026: Sponsor[] = [
  {
    id: 'ern-2026',
    name: 'Vert Robo Con',
    logoUrl: partnerLogo('vrc'),
    websiteUrl: partnerSite('vrc'),
    tier: 'organizing',
  },
  {
    id: 'example-university',
    name: 'Example University',
    logoUrl: partnerLogo('example-university'),
    websiteUrl: partnerSite('example-university'),
    tier: 'organizing',
  },
  {
    id: 'example-data-commons-2026',
    name: 'Example Data Commons',
    logoUrl: partnerLogo('example-data-commons'),
    websiteUrl: partnerSite('example-data-commons'),
    tier: 'silver',
  },
  {
    id: 'example-field-tools-2026',
    name: 'Example Field Tools Co.',
    logoUrl: partnerLogo('example-field-tools'),
    websiteUrl: partnerSite('example-field-tools'),
    tier: 'silver',
  },
  {
    id: 'example-makerspace-2026',
    name: 'Example Makerspace',
    logoUrl: partnerLogo('example-makerspace'),
    websiteUrl: partnerSite('example-makerspace'),
    tier: 'partner',
  },
  {
    id: 'example-coastal-trust-2026',
    name: 'Example Coastal Trust',
    logoUrl: partnerLogo('example-coastal-trust'),
    websiteUrl: partnerSite('example-coastal-trust'),
    tier: 'partner',
  },
];

// =============================================================================
// SUMMIT 2026 RECORDINGS (none yet)
// =============================================================================

export const SUMMIT_2026_VIDEOS: Video[] = [];

// =============================================================================
// SPEAKERS 2026
// =============================================================================

const speaker26 = (
  name: string,
  title: string,
  organization: string,
  extra: Partial<Speaker> = {}
): Speaker => {
  const id = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z]+/g, '-')
    .replace(/^-|-$/g, '');
  return { id, name, title, organization, photoUrl: avatar(id), summitYear: '2026', ...extra };
};

export const SPEAKERS_2026: Speaker[] = [
  // Panel A: methane leaks (Day 1)
  speaker26('Ruth Calloway', 'Leak Survey Technician', 'Example Gas Utility'),
  speaker26('Tobias Hartnell', 'Founder', 'Example Leak Sensing'),
  speaker26('Selin Aydemir', 'PhD Researcher', 'Example University'),
  speaker26('Gregor Pazdera', 'Environmental Inspector', 'Example Regional Environment Agency'),
  // Panel B: soil carbon (Day 1)
  speaker26('Amaya Thorne', 'Agronomist', 'Example Farmers’ Cooperative'),
  speaker26('Lorcan Beddoes', 'Sensor Engineer', 'Example Field Tools Co.'),
  speaker26('Chidinma Varga', 'Data Scientist', 'Example Data Commons'),
  // Keynotes (Day 2)
  speaker26('Hollis Wexford', 'City Resilience Officer', 'City of Example', {
    bio: 'Hollis coordinated the clean-up after two river floods in one year and now writes the city’s rules for when drones and ground robots go in before people do.',
    isKeynote: true,
  }),
  speaker26('Anaïs Brekke', 'Programme Evaluator', 'Example Climate Fund', {
    bio: 'Anaïs reads the final reports of grant-funded robot pilots and follows up a year later to see which machines are still in use, and why the others stopped.',
    isKeynote: true,
  }),
  // Panel C: after floods and storms (Day 2)
  speaker26('Pieter Oduro', 'Emergency Planner', 'Example County Civil Protection'),
  speaker26('Esme Kintyre', 'Drone Pilot & Trainer', 'Example Search and Rescue Volunteers'),
  speaker26('Matías Ferland', 'Structural Engineer', 'Example Polytechnic'),
  speaker26('Ngozi Tremaine', 'Claims Analyst', 'Example Mutual'),
  // Panel D: greenhouses and indoor farms (Day 2)
  speaker26('Mina Saarinen', 'Grower', 'Example Greenhouse Cooperative'),
  speaker26('Taro Ellingsen', 'Automation Engineer', 'Example Vertical Farms'),
  speaker26('Adaeze Lindholm', 'Plant Scientist', 'Example University'),
  speaker26('Bruno Castellane', 'Energy Manager', 'Example Greenhouse Cooperative'),
  // Panel E: training robot technicians (Day 3)
  speaker26('Dagny Morrow', 'Apprenticeship Coordinator', 'Example Polytechnic'),
  speaker26('Ishaan Reval', 'Field Service Manager', 'Example Field Tools Co.'),
  speaker26('Colette Nyquist', 'Maintenance Lead', 'Example Wind Cooperative'),
  // Student lightning round (Day 3)
  speaker26('Femi Garrow', 'MSc Student', 'Example University'),
  speaker26('Lena Moravec', 'Undergraduate Student', 'Example Polytechnic'),
  speaker26('Hugo Brennerman', 'PhD Student', 'Example Institute of Technology'),
  speaker26('Sakura Delmont', 'MSc Student', 'Example University'),
];

// =============================================================================
// SUMMIT 2026 PROGRAM
// =============================================================================

export const SUMMIT_2026_PROGRAM: ProgramDay[] = [
  {
    day: 1,
    date: 'May 19, 2026',
    theme: 'Leaks, Soil & Carbon',
    sessions: [
      {
        id: 's26-1-1',
        title: 'Panel: Finding Methane Leaks Sooner',
        time: '15:00 - 15:50 UTC',
        description: 'Ruth Calloway, Tobias Hartnell, Selin Aydemir and Gregor Pazdera on crawlers, fixed sensors and who acts on the alerts.',
        type: 'panel',
        videos: [],
      },
      {
        id: 's26-1-2',
        title: 'Panel: Measuring Soil Carbon Without Digging Every Field',
        time: '16:00 - 16:45 UTC',
        description: 'Amaya Thorne, Lorcan Beddoes and Chidinma Varga on sampling robots, lab costs and sharing the data.',
        type: 'panel',
        videos: [],
      },
      {
        id: 's26-1-3',
        title: 'Hallway Hour',
        time: '16:45 - 17:30 UTC',
        description: 'Unstructured video rooms by topic. Not recorded.',
        type: 'networking',
        videos: [],
      },
    ],
  },
  {
    day: 2,
    date: 'May 20, 2026',
    theme: 'Keynote Double Bill & Recovery',
    sessions: [
      {
        id: 's26-2-1',
        title: 'Keynote: Hollis Wexford',
        time: '15:00 - 15:30 UTC',
        description: 'Sending machines into flooded streets first: what worked, what got stuck and what the rules now say.',
        type: 'keynote',
        videos: [],
      },
      {
        id: 's26-2-2',
        title: 'Keynote: Anaïs Brekke',
        time: '15:30 - 16:00 UTC',
        description: 'A year after the pilot ends: which robots are still in use, and the warning signs in the ones that are not.',
        type: 'keynote',
        videos: [],
      },
      {
        id: 's26-2-3',
        title: 'Panel: Robots After Floods and Storms',
        time: '16:10 - 17:00 UTC',
        description: 'Pieter Oduro, Esme Kintyre, Matías Ferland and Ngozi Tremaine on damage surveys, safety and paying for the response.',
        type: 'panel',
        videos: [],
      },
      {
        id: 's26-2-4',
        title: 'Panel: Greenhouses and Indoor Farms',
        time: '17:10 - 17:55 UTC',
        description: 'Mina Saarinen, Taro Ellingsen, Adaeze Lindholm and Bruno Castellane on automation that cuts heating and water use.',
        type: 'panel',
        videos: [],
      },
    ],
  },
  {
    day: 3,
    date: 'May 21, 2026',
    theme: 'Skills & New Voices',
    sessions: [
      {
        id: 's26-3-1',
        title: 'Panel: Training the Next Robot Technicians',
        time: '15:00 - 15:45 UTC',
        description: 'Dagny Morrow, Ishaan Reval and Colette Nyquist on apprenticeships, certification and keeping trained people.',
        type: 'panel',
        videos: [],
      },
      {
        id: 's26-3-2',
        title: 'Student Lightning Round',
        time: '15:55 - 16:40 UTC',
        description: 'Femi Garrow, Lena Moravec, Hugo Brennerman and Sakura Delmont each get seven minutes and one slide of open questions.',
        type: 'panel',
        videos: [],
      },
      {
        id: 's26-3-3',
        title: 'Open Q&A and Topic Wishlist',
        time: '16:50 - 17:20 UTC',
        description: 'Attendees ask the organising team anything and vote on topics for 2027.',
        type: 'networking',
        videos: [],
      },
    ],
  },
];

// =============================================================================
// ORGANISERS & VOLUNTEERS
// =============================================================================

export const ORGANIZERS: TeamMember[] = [
  {
    id: 'saskia-overmeer-team',
    name: 'Saskia Overmeer',
    role: 'Captions & Accessibility',
    organization: 'Example Polytechnic',
    photoUrl: avatar('saskia-overmeer'),
  },
  {
    id: 'dario-fenwick-team',
    name: 'Dario Fenwick',
    role: 'Livestream Producer',
    organization: 'Example Makerspace',
    photoUrl: avatar('dario-fenwick'),
  },
  {
    id: 'kofi-ashgrove-team',
    name: 'Kofi Ashgrove',
    role: 'Speaker Care',
    organization: 'Example Data Commons',
    photoUrl: avatar('kofi-ashgrove'),
  },
  {
    id: 'noor-halloran-team',
    name: 'Noor Halloran',
    role: 'Program Committee',
    organization: 'Example Coastal Trust',
    photoUrl: avatar('noor-halloran'),
  },
  {
    id: 'elif-brandvold-team',
    name: 'Elif Brandvold',
    role: 'Treasurer',
    organization: 'Vert Robo Con',
    photoUrl: avatar('elif-brandvold'),
  },
  {
    id: 'mireille-vos-team',
    name: 'Mireille Vos',
    role: 'Program Committee',
    organization: 'Example University',
    photoUrl: avatar('mireille-vos'),
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getSummit(year: string): Summit | undefined {
  return SUMMITS[year];
}

export function getVideosByDay(day: number): Video[] {
  return SUMMIT_2025_VIDEOS.filter(v => v.day === day).sort((a, b) => a.order - b.order);
}

export function getKeynoteVideos(): Video[] {
  return SUMMIT_2025_VIDEOS.filter(v => v.type === 'keynote');
}

export const ALL_SPEAKERS: Speaker[] = [...SPEAKERS_2025, ...SPEAKERS_2026];

export function getSpeakersByYear(year: string): Speaker[] {
  return ALL_SPEAKERS.filter(s => s.summitYear === year);
}

export function getKeynoteSpeakers(year: string): Speaker[] {
  return ALL_SPEAKERS.filter(s => s.summitYear === year && s.isKeynote);
}

export function getSponsorsByTier(tier: Sponsor['tier'], year: string): Sponsor[] {
  const sponsors = year === '2025' ? SPONSORS_2025 : SPONSORS_2026;
  return sponsors.filter(s => s.tier === tier);
}

export function getVideosByDay2026(day: number): Video[] {
  return SUMMIT_2026_VIDEOS.filter(v => v.day === day).sort((a, b) => a.order - b.order);
}
