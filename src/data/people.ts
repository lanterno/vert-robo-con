/**
 * What PeopleV3 adds to the people the summit data already names: their
 * bios, their public links, and who wrote the white paper. Demo content.
 *
 * Portraits aren't here: the repo has one per person at
 * /images/people/<slug>.svg, which the content layer already uses.
 */

/** A short note about a person, shown on their page and in the drawer. */
export const BIOS: Record<string, string> = {
  'elif-brandvold': 'Elif started Vert Robo Con as a mailing list for people who repair field robots. She still keeps the books.',
  'imogen-calder': 'Imogen reads every consulting enquiry first and matches it with members who have done that kind of work.',
  'hollis-wexford': 'Hollis coordinated the clean-up after two river floods in one year and now writes the city’s rules for when drones and ground robots go in before people do.',
  'anais-brekke': 'Anaïs reads the final reports of grant-funded robot pilots and follows up a year later to see which machines are still in use, and why the others stopped.',
  'tamsin-ocampo': 'Tamsin has lost more weather stations to crevasses than she likes to admit, and now designs instrument sleds that can be dug out and reused.',
  'odile-farrow': 'Odile plans ditch-blocking work on upland bogs and tests which survey tools can cross wet peat without damaging it.',
  'rafael-quist': 'Rafael writes the tenders that decide which inspection equipment a regional water board can buy.',
  'ines-valderrama': 'Ines turns street-level temperature readings into shade and tree-planting plans for a mid-sized city.',
  'kenji-albescu': 'Kenji climbs turbines for a living and trains new technicians to work alongside blade-inspection robots.',
  'marguerite-osterhout': 'Marguerite keeps the drawings, parts lists and repair guides for a family of community-built sensor rovers up to date.',
  'henrik-paledo': 'Henrik assesses what can go wrong before an insurer agrees to cover a field trial.',
  'yewande-sorensen': 'Yewande reports on environmental technology and moderated the wetlands panel and the first pitch round.',
};

/** Their public profile, where they have one. */
export const LINKS: Record<string, string> = {
  'elif-brandvold': 'https://vert-robo-con.example/social/linkedin/elif-brandvold',
  'imogen-calder': 'https://vert-robo-con.example/social/linkedin/imogen-calder',
  'saskia-overmeer': 'https://vert-robo-con.example/social/linkedin/saskia-overmeer',
  'kofi-ashgrove': 'https://vert-robo-con.example/social/linkedin/kofi-ashgrove',
  'mireille-vos': 'https://vert-robo-con.example/social/linkedin/mireille-vos',
  'chidinma-varga': 'https://vert-robo-con.example/social/linkedin/chidinma-varga',
  'hollis-wexford': 'https://vert-robo-con.example/social/linkedin/hollis-wexford',
  'anais-brekke': 'https://vert-robo-con.example/social/linkedin/anais-brekke',
  'tamsin-ocampo': 'https://vert-robo-con.example/social/linkedin/tamsin-ocampo',
};

/**
 * The white paper's authors, in credited order, with the name and
 * affiliation as the paper credits them.
 */
export const WHITE_PAPER_AUTHORS: { slug: string; credited: string; org: string; edition: number }[] = [
  { slug: 'elif-brandvold', credited: 'Elif Brandvold', org: 'Vert Robo Con', edition: 2025 },
  { slug: 'mireille-vos', credited: 'Dr. Mireille Vos', org: 'Example University', edition: 2025 },
  { slug: 'noor-halloran', credited: 'Noor Halloran', org: 'Example Coastal Trust', edition: 2025 },
  { slug: 'chidinma-varga', credited: 'Chidinma Varga', org: 'Example Data Commons', edition: 2025 },
  { slug: 'kenji-albescu', credited: 'Kenji Albescu', org: 'Example Wind Cooperative', edition: 2025 },
  { slug: 'marguerite-osterhout', credited: 'Marguerite Osterhout', org: 'Example Open Hardware Collective', edition: 2025 },
];
