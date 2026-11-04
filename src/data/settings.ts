/**
 * The switches admins set in AdminSettingsV3 (#46), with the board's values.
 * Until #46 moves them into the admin, they change here.
 */
import type { Settings } from '@/lib/content/types';

export const SETTINGS: Settings = {
  programmes: { fieldSkills: 'later', schools: 'soon' },
  internshipTracks: [
    { id: 'map', status: 'open' },
    { id: 'summit', status: 'open' },
    { id: 'writing', status: 'soon' },
    { id: 'own', status: 'open' },
  ],
  mapLicence: 'CC BY 4.0',
  geocoding: true,
};
