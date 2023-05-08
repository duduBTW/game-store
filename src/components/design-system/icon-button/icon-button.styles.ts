import styled, { css } from "styled-components";

export const Container = styled.button(({ theme }) => {
  return css`
    cursor: pointer;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 222rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid ${theme.colors.gray["700"]};

    &:not(:disabled) {
      &:hover,
      &:focus {
        background-color: rgba(0, 0, 0, 0.2);
        border-color: ${theme.colors.gray["500"]};
      }
    }

    &:disabled {
      opacity: 0.6;
    }
  `;
});
