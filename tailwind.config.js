/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette lifted from the Play Store artwork and the app itself:
        // night-stadium black + one coral-red accent. No second accent anywhere.
        ink: {
          900: '#0A0A0C',
          800: '#0F1013',
          700: '#16181D',
          600: '#1E2026',
        },
        brand: {
          DEFAULT: '#F04A42',
          light: '#FF6257',
          dark: '#D93A33',
        },
        fg: {
          DEFAULT: '#F4F4F6',
          muted: '#9C9CA6',
          faint: '#6B6B75',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Shape lock: containers 16px, interactive elements are pills.
        card: '1rem',
      },
      maxWidth: {
        page: '1400px',
      },
    },
  },
  plugins: [],
};
