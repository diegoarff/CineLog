/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: [
    "app/**/*.{js,jsx}",
    "components/**/*.{js,jsx}",
    "screens/**/*.{js,jsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        accent: colors.teal[500],
        accentLight: colors.teal[300],
        accentDark: colors.teal[700],
        base: "#101015",
        baseDark: colors.zinc[900],
        baseAccent: "#10181f",
        baseMedium: colors.zinc[700],
        baseLight: colors.zinc[400],
        light: colors.zinc[200],
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
