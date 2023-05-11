/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0040ff",
      },
    },
  },
  darkMode: "className",
  plugins: [require("daisyui")],
  plugins: [
    require("@tailwindcss/typography"),
    require("tw-elements/dist/plugin.cjs"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f9e572",
          secondary: "#86e9f4",
          accent: "#e87197",
          neutral: "#181424",
          "base-100": "#F5F8F9",
          info: "#48A4CB",
          success: "#249978",
          warning: "#F7B32B",
          error: "#ED5345",
        },
      },
    ],
  },
};
