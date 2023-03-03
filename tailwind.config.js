/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: {
          light: "#7070AC",
          DEFAULT: "#9E94C0",
        },
        pink: {
          DEFAULT: "#FF39B0",
        },
        blue: {
          dark: "#0e0e1a",
          DEFAULT: "#00FFFF",
        },
        lemon: {
          light: "#C4C598",
          DEFAULT: "#f9ff01",
        },
        green: {
          aqua: "#75F2D7",
          light: "#9DC094",
          DEFAULT: "#6fff4a",
        },
        gray: {
          DEFAULT: "#676767",
          dark: "#2F3130",
        },
      },
      boxShadow: {
        pink: " 0 0 5px 0 #FF39B0, inset 0 0 5px 0 #FF39B0",
        blue: " 0 0 4px 0 #00FFFF, inset 0 0 4px 0 #00FFFF",
        lemon: "0 0 5px 0 #f9ff01, inset 0 0 5px 0 #f9ff01",
        green: "0 0 5px 0 #6fff4a, inset 0 0 5px 0 #6fff4a",
        aqua: "0 0 5px 0 #75F2D7, inset 0 0 5px 0 #75F2D7",
        slate: "0 0 5px 0 #0f172a, inset 0 0 5px 0 #0f172a",
        small: "4px 4px 10px 0 #00000040",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      display: ["Syne", "sans-serif"],
    },
  },
  plugins: [],
};
