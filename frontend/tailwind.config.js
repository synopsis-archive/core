/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./apps/*/src/**/*.{html,ts}",
    "./libs/*/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          80: "#FAFAFA",
          100: "#F7F7F7",
          200: "#E1E1E1",
          300: "#CFCFCF",
          400: "#A6A6A6",
          500: "#7E7E7E",
          600: "#626262",
        },
      },
    },
  },
  plugins: [],
};
