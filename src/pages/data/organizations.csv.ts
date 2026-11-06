/** The map dataset as CSV (#32), under CC BY 4.0. */
import type { APIRoute } from 'astro';
import { getOrganizations, toCsv } from '@/lib/content';

export const GET: APIRoute = () =>
  new Response(toCsv(getOrganizations()), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="vert-robo-con-organizations.csv"',
    },
  });
