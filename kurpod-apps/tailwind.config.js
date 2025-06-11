import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#ffffff",
            foreground: "#11181c",
            primary: {
              50: "#e6f1fe",
              100: "#cce3fd",
              200: "#99c7fb",
              300: "#66aaf9",
              400: "#338ef7",
              500: "#006fee",
              600: "#005bc4",
              700: "#004493",
              800: "#002e62",
              900: "#001731",
              DEFAULT: "#006fee",
              foreground: "#ffffff",
            },
            focus: "#006fee",
          },
        },
        dark: {
          colors: {
            background: "#000000",
            foreground: "#ecedee",
            primary: {
              50: "#001731",
              100: "#002e62",
              200: "#004493",
              300: "#005bc4",
              400: "#006fee",
              500: "#338ef7",
              600: "#66aaf9",
              700: "#99c7fb",
              800: "#cce3fd",
              900: "#e6f1fe",
              DEFAULT: "#338ef7",
              foreground: "#ffffff",
            },
            focus: "#338ef7",
          },
        },
      },
    }),
  ],
};