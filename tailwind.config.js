/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#ff4f28",
        dark: "#121212",
        grey: "#f3f4f6",
      },
      container: {
        center: true,
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
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "70%",
          },
        },
      },
    },
    animation: {
      text: "text 5s ease infinite",
      floting: "floting 2.5s infinite",
      shadow: "shadow 2.5s infinite",
      typing: "typing 7s steps(50)",
    },
    fontFamily: {
      assistant: ["Assistant"],
      rem: ["'REM', sans-serif"],
      tilt: ["'Tilt Prism', cursive"],
    },
  },
  plugins: [require("tailwindcss-animated"), require("tailwind-scrollbar")],
});
