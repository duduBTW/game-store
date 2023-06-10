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
  | "48";
export type ContainerSize = "small" | "medium" | "large";

export type BorderRadiusSize = "small" | "medium" | "round";

export type MediaQueryBreakPoints = "fromDesktop" | "fromTablet" | "fromMobile";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      backgroundRgb: string;
      brand: {
        main: string;
        light: string;
        gradiant: { main: string; light: string };
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
  }
}
