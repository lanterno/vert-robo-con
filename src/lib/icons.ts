/**
 * The line icons from the V3 boards: one path each, drawn on a 24px grid with
 * a round stroke. Rendered by src/components/ui/Icon.astro.
 */
export const ICON_PATHS = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17L17 7M9 7h8v8',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-left': 'M15 6l-6 6 6 6',
  'chevron-right': 'M9 6l6 6-6 6',
  close: 'M6 6l12 12M18 6L6 18',
  download: 'M12 4v12M6 10l6 6 6-6M5 20h14',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  linkedin: 'M3 3h18v18H3zM8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7',
  video: 'M2 5h20v14H2zM10 9l5 3-5 3z',
  slack:
    'M9 3a2 2 0 0 0 0 4h2V5a2 2 0 0 0-2-2zM3 9a2 2 0 0 0 2 2h6V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zM21 15a2 2 0 0 0-2-2h-6v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2zM15 21a2 2 0 0 0 0-4h-2v2a2 2 0 0 0 2 2zM13 3v6h2a2 2 0 0 0 0-4M11 21v-6H9a2 2 0 0 0 0 4',
  home: 'M4 11l8-7 8 7v9H4z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  watch: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM10 9l5 3-5 3z',
  'map-pin': 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  document: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7',
  'user-plus': 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 11h6M19 8v6',
  briefcase: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 1 0 0-6M21 20c0-2.6-1.6-4.8-4-5.6',
  shield: 'M9 12l2 2 4-4M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7z',
  news: 'M5 4h12v16H5zM17 8h2v10a2 2 0 0 1-2 2M8 8h6M8 12h6M8 16h4',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-6 8-6s8 2 8 6',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
  play: 'M8 5v14l11-7z',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0',
} as const;

export type IconName = keyof typeof ICON_PATHS;
