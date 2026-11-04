/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // The V3 palette, taken from the design boards (#24). Every text pair
      // listed below meets 4.5:1, and the axe check in CI enforces it.
      colors: {
        vrc: {
          // Blue is only for things you can act on: links, buttons, focus
          // rings, the selected tab. Statuses never use it; see the chips.
          blue: '#0138AC', // 9.7:1 on white, and white on it
          'blue-dark': '#002A80', // hover and pressed
          'blue-tint': '#EEF2FB', // a blue chip's background

          // Green means open, done or live. The bright shade is for status
          // dots and icons only: white text on it is 2.7:1, so it never sits
          // behind text. Use green-dark for green text, and for any green
          // surface that carries white text.
          green: '#1DB46C',
          'green-dark': '#0B7A47', // 5.4:1 on white, 4.9:1 on green-tint
          'green-tint': '#E8F6EE',

          // Amber means soon, closing or needs attention.
          amber: '#D9822B', // dots and icons only
          'amber-dark': '#8A4B00', // amber text, 6.3:1 on amber-tint
          'amber-tint': '#FFF4E5',

          // Red is for errors and destructive actions.
          red: '#B42318', // 6.6:1 on white
          'red-tint': '#FEF3F2',

          // Neutrals. A status with no colour of its own, such as "Coming
          // soon", is a grey chip: ink-2 on surface.
          ink: '#0A1222', // body text
          'ink-2': '#3D4556', // secondary text
          muted: '#646B7A', // captions and labels; 4.9:1 on surface, so no lighter background than that
          disabled: '#A7ADB8', // disabled controls only, which WCAG exempts
          line: '#E5E7EB', // dividers and card borders
          'line-strong': '#D5D8DE', // input and button borders
          surface: '#F3F4F2', // tinted sections and grey chips
          'surface-2': '#F7F8F9', // hover on white

          // Dark sections: the footer, and heroes on navy.
          navy: '#0A1222',
          'navy-raised': '#141D30', // a card on navy
          'navy-line': '#2E3850',
          'on-navy': '#C8CEDA', // body text on navy, 11.9:1
          'on-navy-muted': '#9AA3B5', // 7.4:1 on navy, 6.6:1 on navy-raised
          'on-navy-green': '#7FD6A8',
          'on-navy-blue': '#BFD0F5', // links on navy
        },
      },
      // Self-hosted through Fontsource, imported in src/styles/global.css.
      // No request goes to Google Fonts.
      fontFamily: {
        heading: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        body: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
