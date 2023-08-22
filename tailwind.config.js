/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#ff4f28",
      },
      container: {
        center: true,
      },
      animation: {
        text: "text 5s ease infinite",
        floting: "floting 2.5s infinite",
        shadow: "shadow 2.5s infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        floting: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(15px)" },
        },
        shadow: {
          "0%,100%": { transform: "scale(1,1)" },
          "50%": { transform: "scale(.85,.85)" },
        },
      },
    },
    fontFamily: {
      assistant: ["Assistant"],
      rem: ["'REM', sans-serif"]
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
});
