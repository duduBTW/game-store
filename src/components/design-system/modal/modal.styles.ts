import styled, { css } from "styled-components";

export const ContentContainer = styled.div(({ theme }) => {
  return css`
    z-index: 3;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* padding: ${theme.sizes.gaps["4"]} ${theme.sizes.gaps["6"]};
    width: 100%;
    max-width: ${theme.sizes.container["large"]};
    max-height: 90vh;
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.shadow["lg"]};
    background-color: ${theme.colors.gray["800"]}; */
  `;
});

export const StyledOverlay = styled.div(({ theme }) => {
  return css`
    z-index: 2;
    position: fixed;
    inset: 0;
    background-color: ${theme.colors.blueGray["900"]};
    opacity: 0.4;
  `;
});
