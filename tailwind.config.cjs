/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./src/utils/helpers.ts",
  ],
  safelist: [
    // Add any classes that might be used dynamically
    'bg-green-50', 'text-green-600',
    'bg-red-50', 'text-red-600',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
