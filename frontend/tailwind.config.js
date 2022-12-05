/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./apps/*/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Space Grotesk",
          ...defaultTheme.fontFamily.sans
        ],
      },
    },
  },
  plugins: [],
}
