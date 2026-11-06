/**
 * Where today's URLs go once the site is rebuilt (#38).
 *
 * On GitHub Pages these are redirect pages: a meta refresh, a canonical
 * link to the destination and a visible link for anyone the refresh doesn't
 * carry. Once the site runs on the server, Caddy answers them with 301s
 * (#19) and these pages can go.
 */
export const REDIRECTS: { from: string; to: string; why: string }[] = [
  // Consulting is a topic on the contact page now, not a page of its own.
  { from: '/consulting', to: '/contact#consulting', why: 'Consulting is part of Contact.' },
  // Joining happens through the join sheet, which the home page opens.
  { from: '/slack', to: '/#join', why: 'Joining the community is on the home page.' },
];
