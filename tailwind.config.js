/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      phone: "280px",
      tablet: "640px",
      desktop: "1025px",
    },
    extend: {
      transitionProperty: {
        spacing: "margin",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
