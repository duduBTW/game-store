import { DefaultTheme } from "styled-components";
import { DotNestedKeys } from "@/utils/types";

export type TypographyColor = DotNestedKeys<DefaultTheme["colors"]>;
export type TypographyWeight = "regular" | "medium" | "bold";
export type TypographySize = "regular" | "lg" | "3xl";
export type TypographyFontFamily = "Nunito" | "Rubik";

export interface TypographyCustomization {
  size: TypographySize;
  color: TypographyColor;
  weight: TypographyWeight;
  fontFamily: TypographyFontFamily;
}

export interface Props extends Partial<TypographyCustomization> {
  as?: React.ElementType;
  children: React.ReactNode;
}
