/**
 * A calendar file for one session (#29): /summits/2026/sessions/<slug>.ics.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getEditions, getPerson, getSessions, sessionIcs } from '@/lib/content';

export const getStaticPaths: GetStaticPaths = () =>
  getEditions().flatMap((edition) =>
    (getSessions(edition.year) ?? []).map((session) => ({
      params: { year: String(edition.year), slug: session.slug },
      props: { session, edition },
    })),
  );

export const GET: APIRoute = ({ props, site, params }) => {
  const { session, edition } = props as { session: Parameters<typeof sessionIcs>[0]['session']; edition: Parameters<typeof sessionIcs>[0]['edition'] };
  const path = `/summits/${params['year']}/sessions/${session.slug}`;
  const body = sessionIcs({
    session,
    edition,
    url: new URL(path, site ?? 'https://crn.elghareeb.space').href,
    speakerNames: session.speakers.map((s) => getPerson(s)?.name).filter((n): n is string => n !== undefined),
  });
  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${session.slug}.ics"`,
    },
  });
};
