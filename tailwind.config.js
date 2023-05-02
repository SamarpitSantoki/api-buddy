/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    colors: {
      primary: "#0040ff",
    },
    extend: {},
  },
  darkMode: "className",
  plugins: [require("tw-elements/dist/plugin.cjs")],
};