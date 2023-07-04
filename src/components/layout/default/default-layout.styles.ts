import styled, { css } from "styled-components";

export const Container = styled.div(({ theme }) => {
  return css`
    min-height: 100vh;
    background-color: ${theme.colors.background.main};
  `;
});

export const Content = styled.div(({ theme }) => {
  return css`
    position: relative;
    height: 100%;
    isolation: isolate;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50rem;
      z-index: -1;
      background: linear-gradient(
          0deg,
          ${theme.colors.background.main} 0%,
          rgba(${theme.colors.background.rgb}, 1) 47.74%,
          rgba(${theme.colors.background.rgb}, 0.72) 100%
        ),
        ${theme.colors.brand.main};
    }
  `;
});
