/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      phone: "280px",
      tablet: "640px",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
