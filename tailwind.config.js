const defaultTheme = require("tailwindcss/defaultTheme");
const iOSHeight = require("@rvxlab/tailwind-plugin-ios-full-height");
const typography = require("@tailwindcss/typography");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [iOSHeight, typography],
};
