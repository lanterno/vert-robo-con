/**
 * Data for the Vert Robo Con map.
 *
 * Every organisation in src/data/organizations.json is fictional demo data:
 * invented names, vert-robo-con.example websites and city-level coordinates only.
 */

import type { OrganizationEntry } from './types';
import organizations from '../data/organizations.json' with { type: 'json' };

const ENTRIES = organizations as unknown as OrganizationEntry[];

/**
 * Return the fictional map dataset. Kept async so callers do not change.
 */
export async function fetchOrganizationsData(): Promise<OrganizationEntry[]> {
  return ENTRIES;
}

/**
 * Get unique values for a field (for filter dropdowns)
 */
export function getUniqueValues(entries: OrganizationEntry[], field: keyof OrganizationEntry): string[] {
  const values = new Set<string>();
  
  for (const entry of entries) {
    const value = entry[field];
    if (typeof value === 'string' && value.trim()) {
      values.add(value.trim());
    }
  }
  
  return Array.from(values).sort();
}

/**
 * Filter entries based on search and filter criteria
 */
export function filterEntries(
  entries: OrganizationEntry[],
  filters: {
    search?: string;
    continent?: string;
    roboticsType?: string;
    application?: string;
    biome?: string;
  }
): OrganizationEntry[] {
  return entries.filter(entry => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        entry.name.toLowerCase().includes(searchLower) ||
        entry.description.toLowerCase().includes(searchLower) ||
        entry.countryHQ.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    // Continent filter
    if (filters.continent && entry.continentHQ !== filters.continent) {
      return false;
    }
    
    // Robotics type filter
    if (filters.roboticsType && entry.roboticsType !== filters.roboticsType) {
      return false;
    }
    
    // Application filter
    if (filters.application && entry.mainApplication !== filters.application) {
      return false;
    }
    
    // Biome filter
    if (filters.biome && entry.biomeType !== filters.biome) {
      return false;
    }
    
    return true;
  });
}

