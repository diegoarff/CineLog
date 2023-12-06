/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["app/**/*.{js,jsx,ts,tsx}", "components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        accent: colors.teal[500],
        accentLight: colors.teal[300],
        accentDark: colors.teal[700],
        base: colors.zinc[900],
        baseLight: colors.zinc[400],
        error: colors.red,
      },
      fontFamily: {
        interLight: ["interLight"],
        interRegular: ["interRegular"],
        interMedium: ["interMedium"],
        interSemiBold: ["interSemiBold"],
        interBold: ["interBold"],
        interBlack: ["interBlack"],
      },
    },
  },
  plugins: [],
};
