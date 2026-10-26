/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        vrc: {
          blue: '#1e40af',
          'blue-dark': '#1e3a8a',
          'blue-light': '#3b82f6',
          green: '#16a34a',
          'green-dark': '#15803d',
          navy: '#0f172a',
        },
      },
      fontFamily: {
        heading: ['Oswald', 'system-ui', 'sans-serif'],
        body: ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

