#!/usr/bin/env bun
/**
 * Multi-strategy geocoder: enriches src/lib/geocode-cache.json with
 * city-level coordinates for every startup in the Climate Robotics spreadsheet.
 *
 * Usage:
 *   bun run scripts/geocode-orgs.ts        # add new entries, keep existing
 *   bun run scripts/geocode-orgs.ts --redo # re-geocode everything
 *
 * Strategy (per startup, in order):
 *   1. Photon (Komoot, OSM POI search, no rate-limit). Strict validation:
 *      result must be in the correct country AND its OSM name must contain
 *      the startup name (or at least its first significant word as a whole
 *      word). Prefers office/building/industrial/man_made POIs.
 *   2. Nominatim free-text: "<name>, <country>". Same validation.
 *   3. Nominatim short query: "<name>". Same validation.
 *   4. Skip — startup will fall back to its country centroid in mapData.ts.
 *
 * The cache key is `${name.toLowerCase()}|${country.toLowerCase()}`, matching
 * `geocodeKey()` in src/lib/mapData.ts. Re-run safely; the script preserves
 * existing entries unless --redo is passed.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const SPREADSHEET_ID = '1rFJPB4g8d21JJkzxu9Ro668cL5H66HUIQCD0pNWwO74';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = resolve(__dirname, '..', 'src', 'lib', 'geocode-cache.json');

const USER_AGENT = 'CRN-site-geocoder/2.0 (https://climaterobotics.network)';
const REDO = process.argv.includes('--redo');

type Coords = [number, number];

// ─── Country-name → ISO 3166-1 alpha-2 ───
// Sheet uses inconsistent country names; map them all to a canonical code so
// we can match Photon/Nominatim's `countrycode` field reliably.
const COUNTRY_TO_ISO: Record<string, string> = {
  US: 'US', USA: 'US', 'United States': 'US', 'United States of America': 'US',
  UK: 'GB', 'United Kingdom': 'GB', England: 'GB', Scotland: 'GB', Wales: 'GB', 'Northern Ireland': 'GB', Britain: 'GB',
  Canada: 'CA', Mexico: 'MX',
  Germany: 'DE', France: 'FR', Spain: 'ES', Italy: 'IT', Netherlands: 'NL', Belgium: 'BE',
  Switzerland: 'CH', Austria: 'AT', Sweden: 'SE', Norway: 'NO', Denmark: 'DK', Finland: 'FI',
  Poland: 'PL', 'Czech Republic': 'CZ', Czechia: 'CZ', Portugal: 'PT', Ireland: 'IE', Greece: 'GR',
  Hungary: 'HU', Romania: 'RO', Bulgaria: 'BG', Croatia: 'HR', Slovenia: 'SI', Slovakia: 'SK',
  Estonia: 'EE', Latvia: 'LV', Lithuania: 'LT', Luxembourg: 'LU', Iceland: 'IS', Serbia: 'RS',
  Ukraine: 'UA', Belarus: 'BY', Moldova: 'MD',
  China: 'CN', Japan: 'JP', 'South Korea': 'KR', Korea: 'KR', India: 'IN',
  Singapore: 'SG', Taiwan: 'TW', 'Hong Kong': 'HK', Israel: 'IL',
  UAE: 'AE', 'United Arab Emirates': 'AE', 'Saudi Arabia': 'SA', Qatar: 'QA',
  Thailand: 'TH', Vietnam: 'VN', Malaysia: 'MY', Indonesia: 'ID', Philippines: 'PH',
  Pakistan: 'PK', Bangladesh: 'BD', Kazakhstan: 'KZ', Turkey: 'TR', Iran: 'IR',
  Australia: 'AU', 'New Zealand': 'NZ',
  Brazil: 'BR', Argentina: 'AR', Chile: 'CL', Colombia: 'CO', Peru: 'PE', Ecuador: 'EC',
  Venezuela: 'VE', Uruguay: 'UY', Paraguay: 'PY', Bolivia: 'BO',
  'South Africa': 'ZA', Nigeria: 'NG', Kenya: 'KE', Egypt: 'EG', Morocco: 'MA',
  Ethiopia: 'ET', Ghana: 'GH', Tanzania: 'TZ', Rwanda: 'RW', Uganda: 'UG',
  Tunisia: 'TN', Algeria: 'DZ', Senegal: 'SN', "Côte d'Ivoire": 'CI', Cameroon: 'CM',
};

function countryIso(country: string): string | null {
  const direct = COUNTRY_TO_ISO[country];
  if (direct) return direct;
  for (const [name, iso] of Object.entries(COUNTRY_TO_ISO)) {
    if (name.toLowerCase() === country.trim().toLowerCase()) return iso;
  }
  return null;
}

function geocodeKey(name: string, country: string): string {
  return `${name.trim().toLowerCase()}|${country.trim().toLowerCase()}`;
}

// ─── CSV parsing ───
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim()); current = '';
    } else { current += char; }
  }
  result.push(current.trim());
  return result;
}
function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0] ?? '').map(h => h.trim());
  const results: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line?.trim()) continue;
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = values[idx] ?? ''; });
    results.push(row);
  }
  return results;
}

// ─── Validation ───
// Tokenize, drop generic words that don't disambiguate.
const STOPWORDS = new Set([
  'the', 'and', 'inc', 'ltd', 'llc', 'gmbh', 'co', 'corp', 'corporation',
  'company', 'group', 'technologies', 'technology', 'tech', 'systems',
  'solutions', 'labs', 'lab', 'project', 'a', 's', 'sa', 'ag',
]);

function nameTokens(name: string): string[] {
  return name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 3 && !STOPWORDS.has(t));
}

function isPlausibleMatch(orgName: string, resultName: string | undefined): boolean {
  if (!resultName) return false;
  const r = resultName.toLowerCase();
  const orgLower = orgName.toLowerCase().replace(/[,.]/g, '');
  // Strong match: result name contains the org name as substring
  if (r.includes(orgLower)) return true;
  // Weaker match: result name contains the most distinctive token as whole word
  const tokens = nameTokens(orgName);
  if (tokens.length === 0) return false;
  // Longest token first (more distinctive)
  tokens.sort((a, b) => b.length - a.length);
  const t = tokens[0]!;
  // Whole-word match in result name
  return new RegExp(`\\b${t.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\b`).test(r);
}

const PREFERRED_OSM_KEYS = new Set(['office', 'building', 'amenity', 'industrial', 'man_made', 'shop', 'craft']);
// Things we never want: places (villages/towns), highways, boundaries, natural
// features. A startup-shaped POI should be a building/office/business.
const REJECTED_OSM_KEYS = new Set(['place', 'highway', 'boundary', 'natural', 'landuse', 'leisure', 'waterway']);

// ─── Photon ───
// Haversine distance in km between two [lat, lng] pairs.
function distKm(a: Coords, b: Coords): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

async function tryPhoton(name: string, country: string, expectedIso: string | null): Promise<Coords | null> {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(name)}&limit=10`;
  let res: Response;
  try { res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } }); }
  catch (e) { console.warn(`  ! Photon network: ${(e as Error).message}`); return null; }
  if (!res.ok) return null;
  const data = (await res.json()) as { features: Array<{ properties: Record<string, unknown>; geometry: { coordinates: [number, number] } }> };
  const features = data.features || [];

  // Rank candidates by: country match, name plausibility, preferred OSM key.
  // Strict threshold: require BOTH country match (+10) AND name match (+6).
  const scored = features
    .map(f => {
      const p = f.properties;
      const cc = (p.countrycode as string | undefined)?.toUpperCase() ?? '';
      const rname = (p.name as string | undefined) ?? '';
      const osm_key = (p.osm_key as string | undefined) ?? '';
      let score = 0;
      if (expectedIso && cc === expectedIso) score += 10;
      else if (expectedIso) score -= 5;
      if (isPlausibleMatch(name, rname)) score += 6;
      if (PREFERRED_OSM_KEYS.has(osm_key)) score += 2;
      const [lon, lat] = f.geometry.coordinates;
      return { f, p, cc, rname, osm_key, score, coords: [lat, lon] as Coords };
    })
    .filter(s => !REJECTED_OSM_KEYS.has(s.osm_key)) // drop villages, highways, etc.
    .filter(s => s.score >= 14) // require BOTH country & name match
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;
  const top = scored[0]!;
  // Ambiguity check: if a second candidate has nearly the same score AND is
  // far from the top one, the result is unreliable — skip rather than guess.
  if (scored.length > 1) {
    const second = scored[1]!;
    if (top.score - second.score <= 2 && distKm(top.coords, second.coords) > 50) {
      return null;
    }
  }
  return top.coords;
}

// ─── Nominatim ───
// We only want company-shaped results — not streets, villages, or generic place
// names that happen to share the company's name.
const ACCEPTABLE_NOMINATIM_CLASSES = new Set(['office', 'amenity', 'building', 'shop', 'industrial', 'tourism', 'craft', 'man_made']);

async function tryNominatim(query: string, expectedIso: string | null, orgName: string): Promise<Coords | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=10&addressdetails=1&q=${encodeURIComponent(query)}`;
  let res: Response;
  try { res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' } }); }
  catch (e) { console.warn(`  ! Nominatim network: ${(e as Error).message}`); return null; }
  if (!res.ok) return null;
  const data = (await res.json()) as Array<{ lat: string; lon: string; display_name?: string; address?: { country_code?: string }; name?: string; class?: string; type?: string }>;
  const scored = data
    .filter(r => !r.class || ACCEPTABLE_NOMINATIM_CLASSES.has(r.class)) // drop highways/places/etc.
    .map(r => {
      const cc = (r.address?.country_code ?? '').toUpperCase();
      const rname = r.name || r.display_name || '';
      let score = 0;
      if (expectedIso && cc === expectedIso) score += 10;
      else if (expectedIso) score -= 5;
      if (isPlausibleMatch(orgName, rname)) score += 6;
      return { r, score };
    })
    .filter(s => s.score >= 14) // require country + name match
    .sort((a, b) => b.score - a.score);
  if (scored.length === 0) return null;
  const top = scored[0]!;
  const lat = parseFloat(top.r.lat);
  const lon = parseFloat(top.r.lon);
  if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
  return [lat, lon];
}

// ─── Cache I/O ───
function loadCache(): Record<string, Coords> {
  try { return JSON.parse(readFileSync(CACHE_PATH, 'utf-8')) as Record<string, Coords>; }
  catch { return {}; }
}
function saveCache(cache: Record<string, Coords>): void {
  const sorted: Record<string, Coords> = {};
  for (const key of Object.keys(cache).sort()) sorted[key] = cache[key]!;
  writeFileSync(CACHE_PATH, JSON.stringify(sorted, null, 2) + '\n');
}
function sleep(ms: number): Promise<void> { return new Promise(r => setTimeout(r, ms)); }

// ─── Main ───
async function main() {
  console.log(`Fetching spreadsheet…${REDO ? ' (--redo: re-geocoding everything)' : ''}`);
  const res = await fetch(CSV_URL, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const rows = parseCSV(await res.text());

  const startups = rows
    .map(r => ({
      name: (r['Startup/Company/Lab'] ?? r['Name'] ?? '').trim(),
      country: (r['Country HQ'] ?? '').trim(),
    }))
    .filter(s => s.name && s.country && s.name !== 'Startup/Company/Lab');

  const cache = REDO ? {} : loadCache();
  console.log(`${startups.length} startups in sheet · ${Object.keys(cache).length} already cached · ${startups.length - Object.keys(cache).length} to process`);

  let added = 0, missed = 0, photonHits = 0, nominatimHits = 0;
  let i = 0;
  for (const s of startups) {
    i++;
    const key = geocodeKey(s.name, s.country);
    if (cache[key]) continue;

    const iso = countryIso(s.country);

    // 1. Photon first (no rate limit)
    let coords = await tryPhoton(s.name, s.country, iso);
    let source: 'photon' | 'nominatim' | null = coords ? 'photon' : null;

    // 2. Nominatim with "<name>, <country>"
    if (!coords) {
      coords = await tryNominatim(`${s.name}, ${s.country}`, iso, s.name);
      if (coords) source = 'nominatim';
      await sleep(1100);
    }

    // 3. Nominatim with bare name
    if (!coords) {
      coords = await tryNominatim(s.name, iso, s.name);
      if (coords) source = 'nominatim';
      await sleep(1100);
    }

    if (coords) {
      cache[key] = coords;
      added++;
      if (source === 'photon') photonHits++;
      else if (source === 'nominatim') nominatimHits++;
      console.log(`  ✓ [${i}/${startups.length}] ${s.name} (${s.country}) → ${coords[0].toFixed(3)}, ${coords[1].toFixed(3)} via ${source}`);
    } else {
      missed++;
      console.log(`  - [${i}/${startups.length}] ${s.name} (${s.country})`);
    }

    if (added > 0 && added % 15 === 0) saveCache(cache);
  }

  saveCache(cache);
  console.log(`\nDone. Added ${added} (Photon: ${photonHits}, Nominatim: ${nominatimHits}) · Missed ${missed} · Total cached: ${Object.keys(cache).length}/${startups.length}.`);
}

main().catch(err => { console.error(err); process.exit(1); });
