/**
 * The map's organisations (src/data/organizations.json), and the figures the
 * home page and the map show about them. They move into Postgres in #55.
 */
import organizations from '@/data/organizations.json' with { type: 'json' };
import { DOMAINS, type Domain } from '@/data/domains';
import type { OrganizationEntry } from '@/lib/types';

const ORGS = organizations as unknown as OrganizationEntry[];

export function getOrganizations(): OrganizationEntry[] {
  return ORGS;
}

/** "120 organizations in 18 countries, 70 already deployed". */
export function getMapStats() {
  return {
    organizations: ORGS.length,
    countries: new Set(ORGS.map((o) => o.countryHQ)).size,
    deployed: ORGS.filter((o) => o.isDeployed).length,
  };
}

function inDomain(o: OrganizationEntry, d: Domain): boolean {
  if (d.types) return d.types.includes(o.roboticsType);
  return o.roboticsType === 'Other' && (d.applications ?? []).includes(o.mainApplication);
}

export interface DomainSummary {
  id: Domain['id'];
  label: string;
  lede: string;
  count: number;
  examples: { name: string; country: string; founded: number | null; description: string; tag: string }[];
}

/** The four places a robot works, with how many organisations work there. */
export function getDomains(): DomainSummary[] {
  return DOMAINS.map((d) => ({
    id: d.id,
    label: d.label,
    lede: d.lede,
    count: ORGS.filter((o) => inDomain(o, d)).length,
    examples: d.examples.map((name) => {
      const o = ORGS.find((x) => x.name === name);
      if (!o) throw new Error(`Example "${name}" for ${d.label} is not in organizations.json`);
      if (!inDomain(o, d)) throw new Error(`Example "${name}" is not a ${d.label} organisation`);
      return { name: o.name, country: o.countryHQ, founded: o.founded, description: o.description, tag: o.adaptationMitigation };
    }),
  }));
}
