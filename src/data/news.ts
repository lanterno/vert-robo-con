/**
 * News posts, from NewsV3. Demo content: "[ARTICLE TEXT]" and "[DATE]" are
 * the canvas's placeholders, kept as they are rather than invented (#7).
 *
 * Left out: the board's "Elsewhere" card for a cross-posted article, which
 * is placeholders throughout, including its address.
 */
import type { NewsPost } from '@/lib/content/types';

const TXT = '[ARTICLE TEXT]';
const sec = (heading: string, paragraphs: string[] = [TXT], list?: string[]) => ({ heading, paragraphs, ...(list ? { list } : {}) });
/**
 * NewsV3 credits every post it shows to the network's founder, and has no
 * per-post author, so each post here is hers. The field is per post, so a
 * later post can name someone else.
 */
const AUTHOR = 'elif-brandvold';

const IMG = {
  hand: '/images/v3/hero.svg',
  leaf: '/images/v3/leaf.svg',
  forest: '/images/v3/forest.svg',
  balloon: '/images/v3/balloon.svg',
  paper: '/images/v3/white-paper.svg',
  crowd: '/images/v3/summit-grid.svg',
  map: '/images/v3/world-map.svg',
};
const WHITE_PAPER = '/research/white-paper/2025';

export const NEWS: NewsPost[] = [
  {
    slug: 'vert-robo-con-summit-2027',
    author: AUTHOR,
    type: 'summit',
    title: 'Save the date: Vert Robo Con Summit 2027',
    summary: 'The next Vert Robo Con Summit runs April 20–22, 2027. Online, free and with no cap on places. Registration opens Monday, December 7, 2026.',
    readTime: '[N] MIN READ',
    image: IMG.crowd,
    sections: [sec('What to expect'), sec('How to take part')],
    links: [
      { title: 'Summit 2027', meta: 'April 20–22, 2027 · Online · Free', href: '/summits/2027' },
      { title: 'Register free', meta: 'Opens Dec 7, 2026 · free, no cap', href: '/summits/2027' },
      { title: 'Get involved', meta: 'Pitch, sponsor or nominate a speaker', href: '/get-involved' },
    ],
  },
  {
    slug: 'the-2025-white-paper-is-out',
    author: AUTHOR,
    type: 'announcement',
    title: 'The 2025 white paper is out',
    summary:
      'The 2025 edition of Working Notes on Climate Robots has four chapters: field notes, running costs, failure modes and a buying guide. Read it online, chapter by chapter.',
    readTime: '[N] MIN READ',
    image: IMG.paper,
    sections: [sec('The four chapters'), sec('Suggest an edit')],
    links: [
      { title: 'Read the white paper', meta: '2025 edition, on the site', href: WHITE_PAPER },
      { title: 'Introducing the white paper', meta: 'Video explainer', href: '/watch' },
    ],
  },
  {
    slug: 'who-checks-the-wind-turbines',
    author: AUTHOR,
    type: 'video',
    title: 'Who checks the wind turbines?',
    date: '2026-06-30',
    summary: 'Turbine blades crack, erode and get struck by lightning. Episode 4 of Robots in the Field meets the robots and technicians that keep them in service.',
    readTime: '[DURATION]',
    cover: { text: 'Wind turbine inspection', tint: 'blue' },
    episode: 4,
    sections: [],
    links: [],
  },
  {
    slug: 'who-repairs-the-robot-after-the-pilot-ends',
    author: AUTHOR,
    type: 'essay',
    title: 'Who repairs the robot after the pilot ends?',
    date: '2026-03-12',
    summary:
      'Field robots are usually judged on their first season. We asked technicians, buyers and makers what happens in year three, when the grant has ended and a motor fails far from the nearest workshop.',
    readTime: '6 MIN READ',
    cover: { text: 'Year three?', tint: 'green' },
    featured: true,
    quote: {
      text: 'A robot nobody local can fix is a demo, not a deployment.',
      by: 'Kenji Albescu, wind turbine technician and trainer, Example Wind Cooperative',
    },
    sections: [
      sec('Year one and year three'),
      sec('What technicians ask for'),
      sec('Spare parts and open drawings'),
      sec('Who pays for upkeep?'),
      sec('Training local crews'),
      sec('A checklist for the next pilot', ['Some questions to settle before a robot leaves the lab. What would you add?'], [
        'Spare parts on hand',
        'Repair manual',
        'Local technician',
        'Battery replacement',
        'Software updates',
        'Data ownership',
        'Insurance cover',
        'Budget for year three',
        'End-of-life plan',
      ]),
    ],
    links: [{ title: 'The white paper', meta: 'Field notes, running costs and failure modes', href: WHITE_PAPER }],
  },
  {
    slug: 'can-drones-reseed-a-burned-hillside',
    author: AUTHOR,
    type: 'video',
    title: 'Can drones reseed a burned hillside?',
    date: '2025-09-16',
    summary: 'After a wildfire, bare slopes wash away in the first heavy rain. Can seeding drones get plants back in time? Episode 3 of Robots in the Field.',
    readTime: '[DURATION]',
    image: IMG.balloon,
    episode: 3,
    sections: [],
    links: [],
  },
  {
    slug: 'five-questions-buyers-ask-before-a-field-trial',
    author: AUTHOR,
    type: 'essay',
    title: 'Five questions buyers ask before a field trial',
    date: '2025-07-01',
    summary:
      'Water boards, farms and city councils told us what they need to know before they let a robot onto their land. Most of it is about paperwork, not sensors.',
    readTime: '4 MIN READ',
    image: IMG.hand,
    sections: [sec('Who signs off?'), sec('What happens to the data?'), sec('What does a bad day look like?')],
    links: [
      { title: 'Watch the tender talk', meta: 'Summit 2025 · Writing a robot into a public tender', href: '/watch' },
      { title: 'The white paper', meta: 'The buying guide chapter', href: WHITE_PAPER },
    ],
  },
  {
    slug: 'replanting-reefs-with-diving-robots',
    author: AUTHOR,
    type: 'video',
    title: 'Replanting reefs with diving robots',
    date: '2025-04-08',
    summary: 'Small diving robots fix coral fragments to damaged reef and come back to check how they grow. Episode 2 of Robots in the Field.',
    readTime: '[DURATION]',
    image: IMG.forest,
    episode: 2,
    sections: [],
    links: [],
  },
  {
    slug: 'summit-2025-dates',
    author: AUTHOR,
    type: 'summit',
    title: 'Vert Robo Con Summit 2025: June 10–12, online',
    date: '2025-03-18',
    summary:
      'Three days, twelve sessions, all online and free. This year the program follows the questions you sent after the pilot: upkeep, buying and cold weather.',
    readTime: '2 MIN READ',
    cover: { text: 'Summit 2025', tint: 'blue' },
    sections: [sec('Three days, twelve sessions'), sec('Pitch your start-up'), sec('Help run the summit')],
    links: [
      { title: 'Past editions', meta: 'Every edition since 2024', href: '/summits' },
      { title: 'Summit 2027', meta: 'April 20–22, 2027 · Online · Free', href: '/summits/2027' },
    ],
  },
  {
    slug: 'why-robots-belong-in-climate-work',
    author: AUTHOR,
    type: 'video',
    title: 'Why robots belong in climate work',
    date: '2025-02-25',
    summary: 'The first episode of Robots in the Field: where robots already help climate work, and where people still do it better.',
    readTime: '[DURATION]',
    image: IMG.hand,
    episode: 1,
    sections: [],
    links: [],
  },
  {
    slug: 'the-organization-map-is-open',
    author: AUTHOR,
    type: 'announcement',
    title: 'The organization map is open',
    date: '2025-01-14',
    summary: 'Our map of organizations building robots for climate work is open, with 64 entries at launch. Anyone can suggest more, and an admin reviews each one.',
    readTime: '1 MIN READ',
    image: IMG.map,
    sections: [sec('What the map shows'), sec('Get your organization on the map')],
    links: [
      { title: 'Open the map', meta: '120 organizations · 18 countries · 70 deployed', href: '/map' },
      { title: 'Suggest an organization', meta: 'An admin reviews every suggestion', href: '/map' },
    ],
  },
  {
    slug: 'air-land-water-factory',
    author: AUTHOR,
    type: 'essay',
    title: 'Air, land, water, factory: a simple way to sort climate robots',
    date: '2024-11-19',
    summary: 'We needed one filter for the map that anyone could use without a glossary. So we sort robots by where they work.',
    readTime: '3 MIN READ',
    image: IMG.leaf,
    sections: [
      sec('Why not sort by purpose?'),
      sec('Four places a robot works', ['In the air, on land, in water, or inside a factory or sorting plant. Most robots fit one; a few fit two.', TXT]),
      sec('Where it gets fuzzy'),
    ],
    links: [{ title: 'Explore the map', meta: 'Organizations by where their robots work', href: '/map' }],
  },
  {
    slug: 'notes-from-the-2024-pilot',
    author: AUTHOR,
    type: 'summit',
    title: 'Notes from the 2024 pilot summit',
    date: '2024-10-08',
    summary: 'Thank you for joining our first, online pilot. Here is what worked, what did not, and what we will change next year.',
    readTime: '2 MIN READ',
    image: IMG.crowd,
    sections: [sec('What worked'), sec('What we will change'), sec('Join the organizing team')],
    links: [
      { title: 'Past editions', meta: 'Every edition since 2024', href: '/summits' },
      { title: 'Watch the recap', meta: 'Summit 2024 recap', href: '/watch' },
    ],
  },
];
