/**
 * The map dataset as a file (#32): CSV, JSON and GeoJSON, under CC BY 4.0.
 *
 * One row per organisation, with the same fields in the same order in both,
 * so a reader of one can follow the other.
 *
 * JSON is served from the dataset itself at /data/organizations.json, which
 * is a documented address and keeps its shape; these two flatten the
 * coordinates into a latitude and a longitude, which CSV needs and GeoJSON
 * puts in its geometry.
 */
import type { OrganizationEntry } from '@/lib/types';

/** The columns, in the order they appear in every download. */
export const EXPORT_FIELDS = [
  'id',
  'name',
  'website',
  'countryHQ',
  'continentHQ',
  'deploymentCountries',
  'roboticsType',
  'mainApplication',
  'additionalApplication',
  'adaptationMitigation',
  'biomeType',
  'isDeployed',
  'founded',
  'latitude',
  'longitude',
  'coordinateSource',
  'description',
] as const;

export const MAP_LICENCE = 'CC BY 4.0';
export const MAP_LICENCE_URL = 'https://creativecommons.org/licenses/by/4.0/';

/** How to cite the dataset, as MapV3 words it. */
export function citation(site: string, updated = '[DATE]'): string {
  return `Vert Robo Con. Vert Robo Con Map [Data set]. Updated ${updated}. Licensed under ${MAP_LICENCE}. Available at ${site.replace(/\/$/, '')}/map.`;
}

function value(org: OrganizationEntry, field: (typeof EXPORT_FIELDS)[number]): string | number | boolean | null {
  switch (field) {
    case 'deploymentCountries':
      return org.deploymentCountries.join('; ');
    case 'latitude':
      return org.coordinates?.[0] ?? null;
    case 'longitude':
      return org.coordinates?.[1] ?? null;
    default:
      return org[field];
  }
}

/** A CSV cell, quoted when it holds a comma, a quote or a line break. */
function cell(v: string | number | boolean | null): string {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(orgs: OrganizationEntry[]): string {
  const rows = [EXPORT_FIELDS.join(',')];
  for (const org of orgs) rows.push(EXPORT_FIELDS.map((f) => cell(value(org, f))).join(','));
  // CRLF, as RFC 4180 asks, so spreadsheets on every platform agree.
  return `${rows.join('\r\n')}\r\n`;
}

/** GeoJSON, leaving out organisations with no coordinates. */
export function toGeoJson(orgs: OrganizationEntry[], site: string): string {
  const features = orgs
    .filter((o) => o.coordinates !== null)
    .map((org) => ({
      type: 'Feature' as const,
      // GeoJSON is longitude first, which is the other way round from how
      // the dataset stores it.
      geometry: { type: 'Point' as const, coordinates: [org.coordinates![1], org.coordinates![0]] },
      properties: Object.fromEntries(
        EXPORT_FIELDS.filter((f) => f !== 'latitude' && f !== 'longitude').map((f) => [f, value(org, f)]),
      ),
    }));
  return `${JSON.stringify(
    { type: 'FeatureCollection', licence: MAP_LICENCE, citation: citation(site), features },
    null,
    2,
  )}\n`;
}
