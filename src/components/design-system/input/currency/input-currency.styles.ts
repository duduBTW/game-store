import styled, { css } from "styled-components";
import { getTypographySizeStyles } from "@/components/design-system/typography";

export const StyledInput = styled.input(({ theme }) => {
  return css`
    ${getTypographySizeStyles("base")}
    flex: 1;

    background-color: ${theme.colors.background};
    border: ${theme.sizes.gaps["0.5"]} solid ${theme.colors.gray["800"]};
    outline: none;
    color: ${theme.colors.gray["100"]};
    padding: ${theme.sizes.gaps["3"]} ${theme.sizes.gaps["5"]};
    border-radius: ${theme.borderRadius.medium};

    &:focus {
      border-color: ${theme.colors.brand.main};
    }

    &[data-error="true"] {
      border-color: ${theme.colors.red["800"]};
    }
  `;
});

export const Container = styled.div(() => {
  return css`
    display: flex;
    flex-direction: column;
  `;
});

export const InputWrapper = styled.div(({ theme }) => {
  return css`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.gray["800"]};
    border-radius: ${theme.borderRadius.medium};
  `;
});

export const Currency = styled.div(({ theme }) => {
  return css`
    border-radius: ${theme.borderRadius.medium};
    padding: 0 ${theme.sizes.gaps["4"]};
  `;
});
