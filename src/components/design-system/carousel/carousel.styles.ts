import styled, { css } from "styled-components";

export const ScrollerContainer = styled.div(({ theme }) => {
  return css`
    padding: 0 50%;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `;
});

export const SnapItemContainer = styled.div(() => {
  return css`
    scroll-snap-align: center;
  `;
});

export const PaginationContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    gap: ${theme.sizes.gaps["2"]};
  `;
});

export const PaginationPage = styled.div(({ theme }) => {
  return css`
    cursor: pointer;
    width: ${theme.sizes.gaps["2"]};
    height: ${theme.sizes.gaps["2"]};
    background-color: ${theme.colors.gray["600"]};
    border-radius: ${theme.borderRadius.round};
    transition: width 0.2s ease, background-color 0.1s ease;

    &:hover {
      background-color: ${theme.colors.gray["500"]};
    }

    &[data-active="true"] {
      cursor: initial;
      width: ${theme.sizes.gaps["4"]};
      background-color: ${theme.colors.brand.light};
    }
  `;
});

export const NavegationContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    gap: ${theme.sizes.gaps["2"]};
  `;
});

export const NavegationIconButton = styled.button(({ theme }) => {
  return css`
    cursor: pointer;
    height: ${theme.sizes.gaps["8"]};
    width: ${theme.sizes.gaps["8"]};
    border-radius: ${theme.borderRadius.round};
    border: 0.1rem solid ${theme.colors.gray["700"]};
    color: ${theme.colors.gray["300"]};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${theme.colors.gray["900"]};
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      cursor: initial;
      opacity: 0.4;
    }
  `;
});
