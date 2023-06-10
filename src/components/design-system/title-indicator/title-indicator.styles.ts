import styled, { css } from "styled-components";

export const Container = styled.div(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    gap: ${theme.sizes.gaps["1"]};
  `;
});

export const Indicator = styled.div(({ theme }) => {
  return css`
    height: ${theme.sizes.gaps["1"]};
    width: ${theme.sizes.gaps["8"]};
    background-color: ${theme.colors.brand.main};
    border-radius: ${theme.borderRadius.round};
  `;
});
