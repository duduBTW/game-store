import styled, { css } from "styled-components";

export const Container = styled.div(({ theme }) => {
  return css`
    position: relative;
    min-height: 100vh;
    background-color: ${theme.colors.background.main};
    isolation: isolate;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 30rem;
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
