import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  sizes: {
    container: {
      small: "68rem",
      medium: "76.8rem",
      large: "102.4rem",
    },
    gaps: {
      px: "0.1rem",
      "0.5": "0.2rem",
      "1": "0.4rem",
      "2": "0.8rem",
      "3": "1.2rem",
      "4": "1.6rem",
      "5": "2rem",
      "6": "2.4rem",
      "8": "3.2rem",
      "10": "4rem",
      "12": "4.8rem",
      "16": "6.4rem",
      "32": "12.8rem",
      "48": "19.2rem",
      "64": "25.6rem",
    },
  },
  colors: {
    loading: {
      gradient:
        "#3b9639 0%, #248126 7.29%, #28703c 37.5%, #216958 71.35%, #1d703e 100%",
    },
    background: {
      main: "#0B0B0B",
      rgb: "11, 11, 11",
    },
    brand: {
      gradient: {
        main: "#4D356A 0%, #352E82 100%",
        light: "#6F32BD 0%, #3629CB 100%",
      },
      dark: "#1d192e",
      main: "#4B3D88",
      light: "#9086E9",
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
    red: {
      "50": "#FEF2F2",
      "100": "#FEE2E2",
      "200": "#FECACA",
      "300": "#FCA5A5",
      "400": "#F87171",
      "500": "#EF4444",
      "600": "#DC2626",
      "700": "#B91C1C",
      "800": "#991B1B",
      "900": "#7F1D1D",
    },
    blue: {
      "50": "#EFF6FF",
      "100": "#DBEAFE",
      "200": "#BFDBFE",
      "300": "#93C5FD",
      "400": "#60A5FA",
      "500": "#3B82F6",
      "600": "#2563EB",
      "700": "#1D4ED8",
      "800": "#1E40AF",
      "900": "#1E3A8A",
    },
    blueGray: {
      "50": "#F8FAFC",
      "100": "#F1F5F9",
      "200": "#E2E8F0",
      "300": "#CBD5E1",
      "400": "#94A3B8",
      "500": "#64748B",
      "600": "#475569",
      "700": "#334155",
      "800": "#1E293B",
      "900": "#0F172A",
    },
  },
  borderRadius: {
    small: "0.8rem",
    medium: "1.2rem",
    round: "2222rem",
  },
  mq: {
    fromDesktop: "@media (min-width: 1360px)",
    fromTablet: "@media (min-width: 938px)",
    fromMobile: "@media (min-width: 720px)",
  },
  shadow: {
    lg: "0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)",
  },
};

export default theme;
