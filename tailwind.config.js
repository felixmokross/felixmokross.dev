const defaultTheme = require("tailwindcss/defaultTheme");
const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [typography, forms],
};
