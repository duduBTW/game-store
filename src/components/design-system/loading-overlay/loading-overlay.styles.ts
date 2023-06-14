import styled, { css } from "styled-components";

export const LoadingOverlayContent = styled.div(({ theme }) => {
  return css`
    position: fixed;
    z-index: 2;
    inset: 0;
    background-color: ${theme.colors.gray["900"]};
    opacity: 0.4;
  `;
});
