import { describe, expect, it } from 'vitest';
import { EXPORT_FIELDS, citation, countsByType, getOrganizations, toCsv, toGeoJson } from '@/lib/content';

/** The map downloads (#32). */
const orgs = getOrganizations();

describe('CSV', () => {
  const csv = toCsv(orgs);
  const rows = csv.trimEnd().split('\r\n');

  it('has a header and one row per organisation, with CRLF line endings', () => {
    expect(rows[0]).toBe(EXPORT_FIELDS.join(','));
    expect(rows).toHaveLength(orgs.length + 1);
    expect(csv.endsWith('\r\n')).toBe(true);
    expect(csv.replace(/\r\n/g, '')).not.toContain('\n');
  });

  it('quotes a field that holds a comma, and doubles a quote inside one', () => {
    expect(toCsv([{ ...orgs[0]!, name: 'Robots, Ltd' }])).toContain('"Robots, Ltd"');
    expect(toCsv([{ ...orgs[0]!, name: 'The "Big" One' }])).toContain('"The ""Big"" One"');
  });

  it('flattens the lists and coordinates into single columns', () => {
    const first = rows[1]!.split(',');
    const lat = EXPORT_FIELDS.indexOf('latitude');
    expect(Number(first[lat])).not.toBeNaN();
    expect(toCsv([{ ...orgs[0]!, deploymentCountries: ['Brazil', 'Chile'] }])).toContain('Brazil; Chile');
  });

  it('leaves a missing coordinate empty rather than writing "null"', () => {
    const csvNoCoords = toCsv([{ ...orgs[0]!, coordinates: null }]);
    expect(csvNoCoords).not.toContain('null');
  });
});

describe('GeoJSON', () => {
  const geo = JSON.parse(toGeoJson(orgs, 'https://example.test'));

  it('is a FeatureCollection carrying the licence and citation', () => {
    expect(geo.type).toBe('FeatureCollection');
    expect(geo.licence).toBe('CC BY 4.0');
    expect(geo.citation).toContain('Vert Robo Con Map [Data set]');
  });

  it('writes longitude before latitude, as GeoJSON requires', () => {
    const brazil = geo.features.find((f: { properties: { name: string } }) => f.properties.name === 'Ploverhollow Dynamics');
    const source = orgs.find((o) => o.name === 'Ploverhollow Dynamics')!;
    expect(brazil.geometry.coordinates).toEqual([source.coordinates![1], source.coordinates![0]]);
  });

  it('leaves out an organisation with no coordinates', () => {
    const without = JSON.parse(toGeoJson([{ ...orgs[0]!, coordinates: null }], 'https://example.test'));
    expect(without.features).toHaveLength(0);
  });
});

describe('the page’s figures', () => {
  it('count every organisation by robot type, biggest first', () => {
    const counts = countsByType();
    expect(counts.reduce((n, c) => n + c.count, 0)).toBe(orgs.length);
    expect(counts.map((c) => c.count)).toEqual([...counts.map((c) => c.count)].sort((a, b) => b - a));
  });

  it('cite the dataset without doubling the site’s slash', () => {
    expect(citation('https://example.test/')).toContain('https://example.test/map.');
    expect(citation('https://example.test')).not.toContain('test//');
  });
});
