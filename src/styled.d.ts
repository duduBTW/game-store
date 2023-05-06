import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      backgroundRgb: string;
      brand: {
        main: string;
        gradiant: string;
      };
    };
  }
}
