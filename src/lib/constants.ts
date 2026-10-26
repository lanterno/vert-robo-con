/**
 * Site-wide constants for Vert Robo Con.
 *
 * Every organisation, person, event, link and statistic on this site is
 * fictional demo content. The brand lives here so it can be swapped in one place.
 * vert-robo-con.example is a domain reserved for documentation (RFC 2606).
 */

// =============================================================================
// LINKS
// =============================================================================

export const LINKS = {
  community: {
    join: 'https://vert-robo-con.example/community/join',
    codeOfConduct: '/slack#code-of-conduct',
  },

  social: {
    linkedIn: 'https://vert-robo-con.example/social/linkedin',
    videos: '/summits#recordings',
  },

  research: {
    whitePaper: '/research#white-paper',
    whitePaperPdf: '/research#white-paper',
    feedback: '/research#feedback',
  },

  map: {
    data: '/data/organizations.json',
  },

  summit: {
    sponsorInfo: '/summits#partners',
    agenda2026: '/summits/2026#program',
  },

  contact: {
    email: 'hello@vert-robo-con.example',
    mailto: 'mailto:hello@vert-robo-con.example',
  },
} as const;

// =============================================================================
// SITE METADATA
// =============================================================================

export const SITE = {
  name: 'Vert Robo Con',
  shortName: 'VRC',
  tagline: 'Robots for a cooler planet',
  description: 'A fictional community that connects people building robots for climate work. All content on this site is demo data.',
  url: 'https://crn.elghareeb.space',

  // Fictional statistics
  stats: {
    members: '120+',
    countries: '18',
    sectors: '12',
  },
} as const;

// =============================================================================
// SUMMIT INFO
// =============================================================================

export const SUMMIT = {
  name: 'Vert Robo Con Summit',
  current: {
    year: '2026',
    dates: 'May 19-21, 2026',
    registrationOpens: 'TBA',
    format: 'Online',
    isRegistrationOpen: false,
  },
  archive: {
    '2026': {
      dates: 'May 19-21, 2026',
      videoCount: 0,
    },
    '2025': {
      dates: 'June 10-12, 2025',
      videoCount: 12,
    },
  },
} as const;

export const SUMMIT_DATES = SUMMIT.current.dates;
export const SUMMIT_REGISTRATION_OPENS = SUMMIT.current.registrationOpens;
