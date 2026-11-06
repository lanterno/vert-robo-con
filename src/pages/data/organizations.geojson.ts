/** The map dataset as GeoJSON (#32), under CC BY 4.0. */
import type { APIRoute } from 'astro';
import { getOrganizations, toGeoJson } from '@/lib/content';
import { SITE } from '@/lib/constants';

export const GET: APIRoute = ({ site }) =>
  new Response(toGeoJson(getOrganizations(), (site ?? new URL(SITE.url)).href), {
    headers: {
      'Content-Type': 'application/geo+json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="vert-robo-con-organizations.geojson"',
    },
  });
