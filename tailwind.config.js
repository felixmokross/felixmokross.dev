const { fontFamily } = require("tailwindcss/defaultTheme");
const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const iOSHeight = require("@rvxlab/tailwind-plugin-ios-full-height");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
  },
  plugins: [typography, forms, iOSHeight],
};
