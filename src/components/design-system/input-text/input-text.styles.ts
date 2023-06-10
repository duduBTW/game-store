import styled, { css } from "styled-components";
import { getTypographySizeStyles } from "@/components/design-system/typography";

export const Container = styled.div(() => {
  return css`
    display: flex;
    flex-direction: column;
  `;
});

export const Input = styled.input(({ theme }) => {
  return css`
    ${getTypographySizeStyles("base")}

    background-color: transparent;
    border: ${theme.sizes.gaps["px"]} solid ${theme.colors.gray["800"]};
    outline: none;
    color: ${theme.colors.gray["100"]};
    padding: ${theme.sizes.gaps["3"]} ${theme.sizes.gaps["5"]};
    border-radius: ${theme.borderRadius.medium};
    margin-top: ${theme.sizes.gaps["3"]};

    &:focus {
      border-color: ${theme.colors.brand.main};
    }

    &[data-error="true"] {
      border-color: ${theme.colors.red["800"]};
    }
  `;
});

export const UpperPart = styled.div(() => {
  return css`
    display: inline-flex;
    justify-content: space-between;
    align-items: baseline;
  `;
});
