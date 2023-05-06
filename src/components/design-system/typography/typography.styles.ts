import styled, { css } from "styled-components";
import { StyledContainerProps, TypographyVariant } from "./typography.props";

const getTypografyVariantStyles = (type: TypographyVariant) => {
  switch (type) {
    case "regular":
      return css``;

    case "lg":
      return css``;

    case "3xl":
      return css``;
  }
};

export const Container = styled.p<StyledContainerProps>(({ variant }) => {
  return css`
    ${getTypografyVariantStyles(variant)}
  `;
});
