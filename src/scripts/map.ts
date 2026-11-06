/**
 * The organisation map (#32), on MapLibre GL.
 *
 * The list beside the map is the map's equal, not a fallback: it is in the
 * page already, works by keyboard, and filtering drives both. So the page
 * is complete without the map, and without JavaScript.
 *
 * Tiles are today's hosted raster tiles while the site is on GitHub Pages;
 * #77 moves them to a basemap on our own server.
 */
import { GeoJSONSource, Map as MapLibreMap, NavigationControl, ScaleControl, setWorkerUrl } from 'maplibre-gl';
// MapLibre finds its worker relative to its own module URL, which stops
// being right once the library is bundled. Importing the worker for its URL
// makes the bundler emit it and tells MapLibre where it landed.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';

setWorkerUrl(workerUrl);

/**
 * OpenStreetMap's own tiles, which need no key. The Leaflet map used CARTO's
 * basemap, but that now answers with an "API key required" image, so the
 * basemap was broken wherever it was shown. #77 replaces this with a
 * PMTiles basemap on our own server, and no third party at all.
 */
const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export interface MapOrg {
  slug: string;
  name: string;
  lat: number;
  lon: number;
  colour: string;
}

function build(container: HTMLElement, orgs: MapOrg[]): MapLibreMap {
  const map = new MapLibreMap({
    container,
    style: {
      version: 8,
      sources: {
        base: { type: 'raster', tiles: [TILES], tileSize: 256, maxzoom: 19, attribution: TILE_ATTRIBUTION },
      },
      layers: [{ id: 'base', type: 'raster', source: 'base' }],
    },
    center: [10, 25],
    zoom: 1.4,
    // The map is a second way to read the list, so it never takes the page's
    // scroll; a reader zooms with the controls or Ctrl and the wheel.
    scrollZoom: false,
    attributionControl: { compact: true },
  });
  map.addControl(new NavigationControl({ showCompass: false }), 'top-right');
  map.addControl(new ScaleControl({ maxWidth: 100 }), 'bottom-left');

  map.on('load', () => {
    map.addSource('orgs', {
      type: 'geojson',
      cluster: true,
      clusterRadius: 44,
      clusterMaxZoom: 8,
      data: {
        type: 'FeatureCollection',
        features: orgs.map((o) => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [o.lon, o.lat] },
          properties: { slug: o.slug, name: o.name, colour: o.colour },
        })),
      },
    });
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'orgs',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#0138AC',
        'circle-radius': ['step', ['get', 'point_count'], 16, 10, 22, 30, 28],
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      },
    });
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'orgs',
      filter: ['has', 'point_count'],
      layout: { 'text-field': ['get', 'point_count_abbreviated'], 'text-size': 12 },
      paint: { 'text-color': '#ffffff' },
    });
    map.addLayer({
      id: 'pins',
      type: 'circle',
      source: 'orgs',
      filter: ['!', ['has', 'point_count']],
      paint: { 'circle-color': ['get', 'colour'], 'circle-radius': 7, 'circle-stroke-width': 2, 'circle-stroke-color': '#ffffff' },
    });

    // A cluster opens up to what is inside it.
    map.on('click', 'clusters', (event) => {
      const feature = map.queryRenderedFeatures(event.point, { layers: ['clusters'] })[0];
      const id = feature?.properties?.['cluster_id'];
      const source = map.getSource('orgs');
      if (id === undefined || !(source instanceof GeoJSONSource) || feature?.geometry.type !== 'Point') return;
      const [lon, lat] = feature.geometry.coordinates as [number, number];
      void source.getClusterExpansionZoom(Number(id)).then((zoom) => map.easeTo({ center: [lon, lat], zoom }));
    });

    // Choosing a pin selects it in the list, which is where the detail is.
    map.on('click', 'pins', (event) => {
      const slug = event.features?.[0]?.properties?.['slug'];
      if (typeof slug === 'string') select(slug);
    });
    for (const layer of ['clusters', 'pins']) {
      map.on('mouseenter', layer, () => (map.getCanvas().style.cursor = 'pointer'));
      map.on('mouseleave', layer, () => (map.getCanvas().style.cursor = ''));
    }
  });

  return map;
}

let current: MapLibreMap | undefined;

/** Shows one organisation's card and marks it in the list. */
function select(slug: string): void {
  for (const row of document.querySelectorAll<HTMLElement>('[data-org]')) {
    row.setAttribute('aria-current', String(row.dataset['org'] === slug));
  }
  for (const card of document.querySelectorAll<HTMLElement>('[data-org-card]')) {
    card.hidden = card.dataset['orgCard'] !== slug;
  }
  const chosen = document.querySelector<HTMLElement>(`[data-org="${CSS.escape(slug)}"]`);
  chosen?.scrollIntoView({ block: 'nearest' });
}

export function initMap(): void {
  const root = document.querySelector<HTMLElement>('[data-map-page]');
  if (!root || root.dataset['mapReady']) return;
  root.dataset['mapReady'] = 'true';

  const rows = [...root.querySelectorAll<HTMLElement>('[data-org]')];
  const controls = root.querySelector<HTMLElement>('[data-map-controls]');
  const search = root.querySelector<HTMLInputElement>('[data-search]');
  const typeButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-type-filter]')];
  const appSelect = root.querySelector<HTMLSelectElement>('[data-app-filter]');
  const regionSelect = root.querySelector<HTMLSelectElement>('[data-region-filter]');
  const deployed = root.querySelector<HTMLButtonElement>('[data-deployed-filter]');
  const count = root.querySelector<HTMLElement>('[data-count]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const container = root.querySelector<HTMLElement>('[data-map]');

  controls?.removeAttribute('hidden');

  let type = 'all';
  let deployedOnly = false;

  const matching = (): MapOrg[] => {
    const app = appSelect?.value ?? 'all';
    const region = regionSelect?.value ?? 'all';
    const query = (search?.value ?? '').trim().toLowerCase();
    const shown: MapOrg[] = [];

    for (const row of rows) {
      const d = row.dataset;
      const ok =
        (type === 'all' || d['orgType'] === type) &&
        (app === 'all' || d['orgApp'] === app) &&
        (region === 'all' || d['orgRegion'] === region) &&
        (!deployedOnly || d['orgDeployed'] === 'true') &&
        (query === '' || (d['orgText'] ?? '').includes(query));
      row.hidden = !ok;
      if (ok && d['orgLat'] && d['orgLon']) {
        shown.push({
          slug: d['org'] ?? '',
          name: d['orgName'] ?? '',
          lat: Number(d['orgLat']),
          lon: Number(d['orgLon']),
          colour: d['orgColour'] ?? '#646B7A',
        });
      }
    }
    return shown;
  };

  const apply = () => {
    const shown = matching();
    for (const b of typeButtons) b.setAttribute('aria-pressed', String(b.dataset['typeFilter'] === type));
    deployed?.setAttribute('aria-checked', String(deployedOnly));
    if (count) count.textContent = `${shown.length} of ${rows.length} organizations`;
    if (empty) empty.hidden = shown.length > 0;

    const source = current?.getSource('orgs');
    if (source instanceof GeoJSONSource) {
      source.setData({
        type: 'FeatureCollection',
        features: shown.map((o) => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [o.lon, o.lat] },
          properties: { slug: o.slug, name: o.name, colour: o.colour },
        })),
      });
    }
  };

  for (const b of typeButtons) {
    b.addEventListener('click', () => {
      type = type === b.dataset['typeFilter'] ? 'all' : (b.dataset['typeFilter'] ?? 'all');
      apply();
    });
  }
  deployed?.addEventListener('click', () => {
    deployedOnly = !deployedOnly;
    apply();
  });
  appSelect?.addEventListener('change', apply);
  regionSelect?.addEventListener('change', apply);
  search?.addEventListener('input', apply);
  root.querySelector<HTMLButtonElement>('[data-clear]')?.addEventListener('click', () => {
    type = 'all';
    deployedOnly = false;
    if (appSelect) appSelect.value = 'all';
    if (regionSelect) regionSelect.value = 'all';
    if (search) search.value = '';
    apply();
  });

  for (const row of rows) {
    row.addEventListener('click', () => select(row.dataset['org'] ?? ''));
  }

  if (container) {
    current = build(container, matching());
    current.on('load', apply);
  }
  apply();
}
