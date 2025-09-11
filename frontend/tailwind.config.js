/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-primary-color': '#E83350',
        'primary-color': '#019031',
        'secondary-color': '#2ecc71',
      },
    },
  },
  plugins: [],
}