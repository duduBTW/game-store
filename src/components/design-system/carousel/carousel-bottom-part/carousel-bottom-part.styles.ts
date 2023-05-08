import styled, { css } from "styled-components";

export const Container = styled.div``;

export const Image = styled.img<{
  active: boolean;
}>(({ active }) => {
  const activeStyes = css`
    opacity: 1;
    margin: 0 auto;
  `;

  return css`
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 1.2rem;
    opacity: 0.1;
    transition: opacity 0.2s ease;

    ${active && activeStyes}
  `;
});
