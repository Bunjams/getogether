const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {},
    },
    colors: {
      transparent: "transparent",
      whitebase: "#FFFFFF",
      white: "#FEFDFD",
      black: "#07070D",
      neutral: {
        0: "#FAFAFA",
        100: "#F3F4F8",
        200: "#D2D4D9",
        300: "#B3B5BC",
        400: "#9496A0",
        500: "#777985",
        600: "#5B5D6A",
        700: "#404251",
        800: "#282A39",
        900: "#101222",
      },
      red: {
        0: "#FDF3F2",
        100: "#FFEDEB",
        150: "#FCE7E4",
        200: "#FFD5D0",
        300: "#FCBAB0",
        400: "#F6A295",
        500: "#EF897A",
        600: "#D85E4D",
        700: "#B93A28",
        800: "#871B0C",
        900: "#3D0800",
      },
      green: {
        100: "#EBFFF5",
        200: "#CFFFE8",
        300: "#B1FCD8",
        400: "#9FF5CB",
        500: "#79F0B7",
        600: "#4BD994",
        700: "#20AE6A",
        800: "#0C874C",
        900: "#003D20",
      },

      blue: {
        100: "#EBF5FF",
        200: "#CFE8FF",
        300: "#B6DBFC",
        400: "#9FCCF5",
        500: "#79B7EF",
        600: "#4E97D9",
        700: "#2774BA",
        800: "#0C4D87",
        900: "#00203D",
      },

      orange: {
        100: "#FFF3EB",
        200: "#FFE7D6",
        300: "#FFDBC3",
        400: "#F5C39F",
        500: "#EFAB7A",
        600: "#D9884E",
        700: "#BA6527",
        800: "#87400C",
        900: "#3D1A00",
      },

      yellow: {
        100: "#FFF9EB",
        200: "#FFF3D6",
        300: "#FFEEC3",
        400: "#F5DD9F",
        500: "#EFCE7A",
        600: "#D9B14E",
        700: "#BA9027",
        800: "#87640C",
        900: "#3D2C00",
      },

      purple: {
        100: "#F3EBFF",
        200: "#E7D6FF",
        300: "#DBC2FF",
        400: "#C29FF5",
        500: "#AA7AF0",
        600: "#864ED9",
        700: "#6327BA",
        800: "#3E0C87",
        900: "#19003D",
      },
    },
    fontSize: {
      h1: [
        "2.375rem",
        {
          fontWeight: 500,
          lineHeight: "2.875rem;",
        },
      ],

      h2: [
        "1.875rem",
        {
          fontWeight: 500,
          lineHeight: "2.5rem",
        },
      ],

      h3: [
        "1.5rem",
        {
          fontWeight: 500,
          lineHeight: "2rem",
        },
      ],

      h4: [
        "1.25rem",
        {
          fontWeight: 500,
          lineHeight: "1.75rem",
        },
      ],

      "h5-regular": [
        "1rem",
        {
          fontWeight: 400,
          lineHeight: "1.5rem",
        },
      ],

      "h5-medium": [
        "1rem",
        {
          fontWeight: 500,
          lineHeight: "1.5rem",
        },
      ],

      "h5-bold": [
        "1rem",
        {
          fontWeight: 700,
          lineHeight: "1.5rem",
        },
      ],

      "body-regular": [
        "0.875rem",
        {
          fontWeight: 400,
          lineHeight: "1.375rem",
        },
      ],

      "body-medium": [
        "0.875rem",
        {
          fontWeight: 500,
          lineHeight: "1.375rem",
        },
      ],

      "body-bold": [
        "0.875rem",
        {
          fontWeight: 700,
          lineHeight: "1.375rem",
        },
      ],

      footnote: [
        "0.75rem",
        {
          fontWeight: 400,
          lineHeight: "1.25rem",
        },
      ],

      "footnote-system-monospace": [
        "0.75rem",
        {
          fontWeight: 500,
          lineHeight: "1.25rem",
        },
      ],
    },
  },
  plugins: [],
};
