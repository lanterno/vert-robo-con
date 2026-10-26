/**
 * TypeScript types for the Vert Robo Con map (fictional demo data)
 */

export interface OrganizationEntry {
  id: string;
  name: string;
  website: string;
  isRobotics: boolean;
  isDeployed: boolean;
  founded: number | null;
  countryHQ: string;
  continentHQ: string;
  deploymentCountries: string[];
  roboticsType: string;
  mainApplication: string;
  additionalApplication: string;
  adaptationMitigation: string;
  biomeType: string;
  description: string;
  linkedIn: string;
  coordinates: [number, number] | null;
  coordinateSource: 'city' | 'country';
  logoUrl: string | null;
  logoFallbackUrl: string | null;
}

export interface MapFilters {
  search: string;
  continent: string;
  roboticsType: string;
  application: string;
  biome: string;
}

export type RoboticsType = 
  | 'Aerial Robot'
  | 'Ground Robot'
  | 'Underwater Robot'
  | 'Surface Robot'
  | 'Hybrid'
  | 'Other';

export type Continent =
  | 'North America'
  | 'South America'
  | 'Europe'
  | 'Asia'
  | 'Africa'
  | 'Oceania';

export const ROBOTICS_TYPE_COLORS: Record<string, string> = {
  'Aerial Robot': '#3b82f6',      // Blue
  'Ground Robot': '#16a34a',      // Green
  'Underwater Robot': '#0891b2',  // Cyan
  'Surface Robot': '#8b5cf6',     // Purple
  'Hybrid': '#f59e0b',            // Amber
  'Other': '#6b7280',             // Gray
};

export const CONTINENT_COLORS: Record<string, string> = {
  'North America': '#ef4444',
  'South America': '#f97316',
  'Europe': '#3b82f6',
  'Asia': '#eab308',
  'Africa': '#22c55e',
  'Oceania': '#8b5cf6',
};

