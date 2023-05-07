import get from "lodash.get";
import styled, { DefaultTheme, css } from "styled-components";
import {
  TypographyCustomization,
  TypographySize,
  TypographyColor,
  TypographyWeight,
  TypographyFontFamily,
} from "./typography.props";

export const Container = styled.p<TypographyCustomization>(
  ({ theme, size, color, weight, fontFamily }) => {
    return css`
      ${getTypographySizeStyles(size)}
      ${getTypographyWeightStyles(weight)}
      ${getTypographyFontFamilyStyles(fontFamily)}
      ${getTypographyColorStyles(theme, color)}
    `;
  }
);

// Elpers
const getTypographySizeStyles = (size: TypographySize) => {
  switch (size) {
    case "regular":
      return css``;

    case "lg":
      return css``;

    case "3xl":
      return css``;
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
