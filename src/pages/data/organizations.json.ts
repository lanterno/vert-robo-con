/**
 * The map dataset as JSON: /data/organizations.json.
 *
 * This address and shape are documented and linked from the site, so they
 * stay as they are. CSV and GeoJSON sit beside it (#32).
 *
 * Every organisation in it is fictional demo data created for this site; no
 * real company, person or location record.
 */
import type { APIRoute } from 'astro';
import { getOrganizations } from '@/lib/content';

export const GET: APIRoute = () =>
  new Response(JSON.stringify(getOrganizations(), null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
