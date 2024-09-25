/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss');
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ['variant', [':is(.dark &):not(.light &)']],
  
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        SidebarItemBG: "rgba(183, 228, 199, 0.30)",
        SidebarItemIcon: "#66B5A3",
        mdDarkGreen: "#2D6A4F",
        darkGreen: "#103126",
        neonGreen: "#B7E4C7",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "header-bg": "url('/src/assets/headerbg.svg')",
        LoginBg: "url('/src/assets/LoginBg.webp')",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
   
  ],
};
