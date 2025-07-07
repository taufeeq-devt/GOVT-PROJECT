module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#181c23',
        'dark-surface': '#23293a',
        'dark-card': '#23293a',
        'text-main': '#f3f4f6',
        'text-secondary': '#b0b8c1',
        'accent-teal': '#4fd1c5',
        'accent-gold': '#f6c177',
        'border-slate': '#2e3650',
        'navy': '#1a2233',
        'teal': '#00bfae',
        'gold': '#f6c177',
        'slate-bg': '#23293a',
        'slate-surface': '#2e3650',
        'offwhite': '#f8fafc',
        'muted-blue': '#a3b8d8',
        'purple-900': '#4c1d95',
        'blue-900': '#1e3a8a',
        'indigo-900': '#312e81',
      },
      fontFamily: {
        sans: [
          'Raleway',
          'Inter',
          'Roboto',
          'Open Sans',
          'Source Sans Pro',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}; 