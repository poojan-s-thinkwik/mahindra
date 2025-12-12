// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',  // Ensure Tailwind scans all JS and TS files in src
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#2D55B4',  // Define the custom color
      },
    }, // Add any custom theme extensions here
  },
  plugins: [], // Add any additional Tailwind plugins if needed
};
