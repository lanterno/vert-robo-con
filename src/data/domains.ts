/**
 * The four places a robot works, as the home page sorts the map (HomeV3,
 * "01 The field"), with the board's copy and its example organisations.
 *
 * Organisations are sorted by robot type, and only the "Other" type by what
 * it does. That puts every example the board shows in its own tab, and gives
 * the board's counts for Sky (37), Field (36) and Water (31). The board says
 * 9 for Factory, but no rule gives 9 from this dataset: the waste-sorting
 * and retrofit organisations it shows there number 4, so the page says 4.
 * Hybrid robots, and "Other" robots that do neither, are in no tab.
 */
export interface Domain {
  id: 'sky' | 'field' | 'water' | 'factory';
  label: string;
  lede: string;
  /** Names in src/data/organizations.json, shown in this order. */
  examples: string[];
  types?: string[];
  applications?: string[];
}

export const DOMAINS: Domain[] = [
  {
    id: 'sky',
    label: 'Sky',
    lede: 'Drones scatter seed over cleared slopes, watch dry woodland for new fires and check turbine blades for cracks.',
    examples: ['Ploverridge Instruments', 'Puffinlark Systems', 'Sorrelmere Robotics'],
    types: ['Aerial Robot'],
  },
  {
    id: 'field',
    label: 'Field',
    lede: 'Ground robots weed crops row by row, map the carbon in the soil and keep solar farms clean without fresh water.',
    examples: ['Rowanburrow Instruments', 'Shoallark Works', 'Nettlelark Collective'],
    types: ['Ground Robot'],
  },
  {
    id: 'water',
    label: 'Water',
    lede: 'Underwater and surface robots replant damaged reef, skim litter from harbours and log coastal water for months at a time.',
    examples: ['Heathmere Dynamics', 'Nettleburrow Works', 'Kelpcombe Robotics'],
    types: ['Underwater Robot', 'Surface Robot'],
  },
  {
    id: 'factory',
    label: 'Factory',
    lede: 'Robotic arm cells pick recyclables off fast belts and insulate the walls of older homes.',
    examples: ['Tidelark Machines', 'Brackford Systems', 'Puffinhollow Labs'],
    applications: ['Waste Sorting', 'Building Retrofit'],
  },
];
