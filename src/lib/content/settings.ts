/** Site settings: the programme and internship switches, the map licence. */
import { SETTINGS } from '@/data/settings';
import type { Settings } from './types';

export function getSettings(): Settings {
  return SETTINGS;
}
