import styled, { css } from "styled-components";

export const LoadingOverlayContent = styled.div(() => {
  return css`
    position: fixed;
    z-index: 2;
    inset: 0;
  `;
});
