import "styled-components";

type SolidColor = {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
};

export type GapSize =
  | "px"
  | "0.5"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12"
  | "16"
  | "32"
  | "48"
  | "64";

export type ContainerSize = "small" | "medium" | "large";

export type BorderRadiusSize = "small" | "medium" | "round";

export type MediaQueryBreakPoints = "fromDesktop" | "fromTablet" | "fromMobile";

export type ShadowIntensity = "lg";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: {
        main: string;
        rgb: string;
      };
      brand: {
        dark: string;
        main: string;
        light: string;
        gradient: { main: string; light: string };
      };
      loading: {
        gradient: string;
      };
      gray: SolidColor;
      red: SolidColor;
      blue: SolidColor;
      blueGray: SolidColor;
    };
    sizes: {
      container: Record<ContainerSize, string>;
      gaps: Record<GapSize, string>;
    };
    borderRadius: Record<BorderRadiusSize, string>;
    mq: Record<MediaQueryBreakPoints, string>;
    shadow: Record<ShadowIntensity, string>;
  }
}
