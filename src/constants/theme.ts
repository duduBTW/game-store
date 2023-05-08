import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    background: "#0B0B0B",
    backgroundRgb: "11, 11, 11",
    brand: {
      gradiant: "#4D356A 0%, #352E82 100%",
      main: "#4B3D88",
    },
    gray: {
      "50": "#FAFAFA",
      "100": "#F4F4F5",
      "200": "#E4E4E7",
      "300": "#D4D4D8",
      "400": "#A1A1AA",
      "500": "#71717A",
      "600": "#52525B",
      "700": "#3F3F46",
      "800": "#27272A",
      "900": "#18181B",
    },
  },
  sizes: {
    container: {
      small: "64rem",
      medium: "76.8rem",
      large: "102.4rem",
    },
    gaps: {
      "1": "0.4rem",
      "2": "0.8rem",
      "3": "1.2rem",
      "12": "4.8rem",
      "6": "2.4rem",
      "8": "3.2rem",
    },
  },
  borderRadius: {
    medium: "1.2rem",
  },
};

export default theme;
