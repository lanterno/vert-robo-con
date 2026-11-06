/**
 * Contact topics and the questions people ask most, from ContactV3.
 *
 * Each topic says where it goes. A topic that has its own page sends people
 * there now; the rest are answered by the message form, which arrives in
 * #54, so until then they offer the email address.
 */
export type TopicRoute =
  /** A page on the site already answers this. */
  | { kind: 'page'; href: string; cta: string }
  /** The message form will handle it (#54). */
  | { kind: 'form' }
  /** The consulting enquiry, a two-step form (#54). */
  | { kind: 'consulting' };

export interface ContactTopic {
  id: string;
  label: string;
  /** Who picks it up, shown so people know where a message lands. */
  team: string;
  route: TopicRoute;
  /** What to say about it until the form exists. */
  note?: string;
}

export const CONTACT_TOPICS: ContactTopic[] = [
  {
    id: 'summit',
    label: 'Summit & registration',
    team: 'Summit',
    route: { kind: 'page', href: '/summits/2027', cta: 'Summit 2027' },
    note: 'Dates, registration and the program are all on the summit page.',
  },
  {
    id: 'speaking',
    label: 'Speaking or recommend a speaker',
    team: 'Program',
    route: { kind: 'page', href: '/get-involved#speaker', cta: 'Recommend a speaker' },
  },
  { id: 'sponsorship', label: 'Sponsorship', team: 'Partnerships', route: { kind: 'page', href: '/get-involved#sponsor', cta: 'Sponsor the summit' } },
  { id: 'research', label: 'White paper & research', team: 'Research', route: { kind: 'form' } },
  {
    id: 'map',
    label: 'Map listing',
    team: 'Map',
    route: { kind: 'page', href: '/map', cta: 'Open the map' },
    note: 'Suggesting an organization opens with the map’s own form (#56).',
  },
  { id: 'jobs', label: 'Jobs & internships', team: 'Jobs', route: { kind: 'page', href: '/jobs', cta: 'Jobs & internships' } },
  { id: 'consulting', label: 'Consulting', team: 'Consulting', route: { kind: 'consulting' } },
  { id: 'press', label: 'Press', team: 'Press', route: { kind: 'form' } },
  { id: 'volunteering', label: 'Volunteering', team: 'Volunteer', route: { kind: 'page', href: '/get-involved#volunteer', cta: 'Volunteer with us' } },
  { id: 'else', label: 'Something else', team: 'General', route: { kind: 'form' } },
];

export const CONTACT_FAQ: { question: string; answer: string; cta: string; href: string }[] = [
  {
    question: 'When is the next summit?',
    answer:
      'Vert Robo Con Summit 2027 runs April 20–22, 2027, online. It’s free and open to everyone, with no cap on places. Registration opens Monday, December 7, 2026, and you can ask us to email you when it does.',
    cta: 'Summit 2027',
    href: '/summits/2027',
  },
  {
    question: 'How do I get my organization on the map?',
    answer:
      'Suggest it directly on the map. An admin reviews every suggestion before it’s published, and you get a reference to track it.',
    cta: 'Suggest an organization',
    href: '/map',
  },
  {
    question: 'How do I join the Slack?',
    answer:
      'Join the network and choose Slack. An admin approves each request by hand, then we email your invite, typically within 24–48 hours. Then say hello in #welcome and tell us what you work on.',
    cta: 'Join the network',
    href: '/#join',
  },
  {
    question: 'Where are past recordings?',
    answer: 'Sessions from past summits are free to watch here, including all 12 recordings from 2025.',
    cta: 'Go to Watch',
    href: '/watch',
  },
];

/** How long a reply takes, said in the same words everywhere. */
export const REPLY_TIME = 'within 24–48 hours';
