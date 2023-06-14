import styled, { css } from "styled-components";

export const StyledDefaultAsset = styled.div(({ theme }) => {
  return css`
    display: grid;
    place-items: center;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: ${theme.colors.gray["800"]};
    border-radius: ${theme.borderRadius.medium};
  `;
});

export const StyledImageAsset = styled.img(({ theme }) => {
  return css`
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: ${theme.borderRadius.medium};
    object-fit: cover;
    object-position: center;
    pointer-events: none;
  `;
});
