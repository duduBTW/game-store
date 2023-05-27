import get from "lodash.get";
import styled, { DefaultTheme, css } from "styled-components";
import {
  TypographyCustomization,
  TypographySize,
  TypographyColor,
  TypographyWeight,
  TypographyFontFamily,
  TypographyLineHeight,
} from "./typography.props";

export const Container = styled.p<TypographyCustomization>(
  ({ theme, size, color, weight, fontFamily, lineHeight }) => {
    return css`
      ${getTypographySizeStyles(size)}
      ${getTypographyWeightStyles(weight)}
      ${getTypographyFontFamilyStyles(fontFamily)}
      ${getTypographyLineHeight(lineHeight)}
      ${getTypographyColorStyles(theme, color)}
    `;
  }
);

// Elpers
const getTypographyLineHeight = (lineHeight: TypographyLineHeight) => {
  switch (lineHeight) {
    case "paragraph":
      return css`
        line-height: 1.5em;
      `;

    case "title":
      return css`
        line-height: 1em;
      `;
  }
};

const getTypographyFontFamilyStyles = (fontFamily: TypographyFontFamily) => {
  switch (fontFamily) {
    case "Nunito":
      return css`
        font-family: "Nunito";
      `;

    case "Rubik":
      return css`
        font-family: "Rubik";
      `;
  }
};

const getTypographyWeightStyles = (weight: TypographyWeight) => {
  switch (weight) {
    case "regular":
      return css`
        font-weight: 400;
      `;
    case "medium":
      return css`
        font-weight: 500;
      `;
    case "bold":
      return css`
        font-weight: bold;
      `;
  }
};

const getTypographyColorStyles = (
  theme: DefaultTheme,
  colorKey: TypographyColor
) => {
  const color = get(theme.colors, colorKey);

  return css`
    color: ${color};
  `;
};

const getTypographySizeStyles = (size: TypographySize) => {
  const fontSize = FONT_SIZES[size];

  return css`
    font-size: ${fontSize};
  `;
};

// Consts
export const FONT_SIZES: Record<TypographySize, string> = {
  xs: "1.2rem",
  sm: "1.4rem",
  base: "1.6rem",
  lg: "1.8rem",
  xl: "2rem",
  "2xl": "2.4rem",
  "3xl": "3rem",
} as const;
