/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./apps/*/src/**/*.{html,ts}",
    "./libs/*/src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
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
  plugins: [
    require('flowbite/plugin')
  ],
}
