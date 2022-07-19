const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: ["Inter", "sans-serif"],
      },
      colors: {
        darkprimary: "hsl(214,32%,91%)",
        darksecondary: "hsl(214,20%,69%)",
        darkbg: "hsl(221,39%,11%)",
        lightbg: "hsl(0,100%,100%)",
        lightprimary: "hsl(218,23%,15%)",
        lightsecondary: "hsl(218,15%,25%)",
      },
      screens: { ...defaultTheme.screens, med: "1024px" },
    },
  },
  plugins: [],
};
