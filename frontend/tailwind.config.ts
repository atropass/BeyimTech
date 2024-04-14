import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      ...colors,
      main: {
        100: "#C6C6C6",
        200: "#B0B0B0",
        300: "#8E8E8E",
        400: "#555555",
        DEFAULT: "#1D1D1D",
      },
      secondary: {
        100: "#f3f7f8",
        200: "#c3d8de",
        300: "#99bcc7",
        400: "#6897a8",
        500: "#4d7c8d",
        600: "#426678",
        700: "#3b5663",
        800: "#364954",
        DEFAULT: "#364954",
      },
      blue: {
        100: "#e2f2fc",
        200: "#bfe3f8",
        300: "#87cff2",
        400: "#55bbeb",
        500: "#1f9dd8",
        600: "#117db8",
        DEFAULT: "#55bbeb",
      },
      gray: {
        100: "#F7F8FC",
        200: "#F5F6FB",
        300: "#F0F3FA",
        400: "#E7E7E7",
        DEFAULT: "#7A7C7D",
      },
      stroke: {
        100: "#F7F8FC",
        200: "#F5F6FB",
        300: "#F0F3FA",
        400: "#AFB1B2",
        DEFAULT: "#DCDCDC",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald"],
  },
};
export default config;
