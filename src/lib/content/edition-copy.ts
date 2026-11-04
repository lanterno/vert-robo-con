/**
 * What the site says about an edition's state, from SummitV3 and HomeV3, so
 * every page says the same thing.
 */
import { editionState, editionTimeline, liveDay } from './editions';
import { formatShortDate } from './format';
import type { Edition, EditionState } from './types';

/**
 * The moment the static site is built for. Pages are rebuilt daily (#76), so
 * a state is at most a day behind. VRC_NOW builds the site as of another
 * moment, for checking each state.
 */
export function getNow(): Date {
  const forced = process.env['VRC_NOW'];
  if (!forced) return new Date();
  const t = Date.parse(forced);
  if (Number.isNaN(t)) throw new Error(`VRC_NOW is not a date: ${forced}`);
  return new Date(t);
}

export interface StateChip {
  state: EditionState;
  /** Chip tones: no blue, which is only for things you can act on (#24). */
  tone: 'neutral' | 'green' | 'amber';
  label: string;
}

const DAY_MS = 86_400_000;
const upper = (s: string) => s.toUpperCase();

export function editionChip(edition: Edition, now: Date): StateChip {
  const state = editionState(edition, now);
  const reg = edition.registration;
  switch (state) {
    case 'upcoming':
      return {
        state,
        tone: 'neutral',
        label: reg ? `REGISTRATION OPENS ${upper(formatShortDate(reg.opensAt))}` : 'COMING UP',
      };
    case 'open':
      return { state, tone: 'green', label: 'REGISTRATION OPEN · FREE' };
    case 'closing': {
      const closes = editionTimeline(edition).closingEnd;
      const days = Math.max(1, Math.ceil((closes - now.getTime()) / DAY_MS));
      const closeDate = reg?.closesAt ?? edition.days[edition.days.length - 1]?.date ?? '';
      return { state, tone: 'amber', label: `CLOSES IN ${days} DAY${days === 1 ? '' : 'S'} · ${upper(formatShortDate(closeDate))}` };
    }
    case 'closed':
      return { state, tone: 'neutral', label: 'REGISTRATION CLOSED' };
    case 'live':
      return { state, tone: 'green', label: `LIVE NOW · DAY ${liveDay(edition, now) ?? 1}` };
    case 'concluded':
      return {
        state,
        tone: 'neutral',
        label: edition.recordings === 'in-editing' ? 'CONCLUDED · RECORDINGS IN EDITING' : 'CONCLUDED',
      };
  }
}
