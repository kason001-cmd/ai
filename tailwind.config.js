/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1e1b4b',
          DEFAULT: '#3b2f7d',
          light: '#6366f1',
        },
        secondary: {
          dark: '#581c87',
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

