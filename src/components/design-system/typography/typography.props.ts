import { DefaultTheme } from "styled-components";
import { DotNestedKeys } from "@/utils/types";

export type TypographyColor = DotNestedKeys<DefaultTheme["colors"]>;
export type TypographyWeight = "regular" | "medium" | "bold" | "black";
export type TypographyFontFamily = "Nunito" | "Rubik";
export type TypographyLineHeight = "paragraph" | "title";
export type TypographySize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

export interface TypographyCustomization {
  size: TypographySize;
  color: TypographyColor;
  weight: TypographyWeight;
  fontFamily: TypographyFontFamily;
  lineHeight: TypographyLineHeight;
}

export interface Props extends Partial<TypographyCustomization> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}
