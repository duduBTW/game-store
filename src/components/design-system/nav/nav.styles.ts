import styled, { css } from "styled-components";

export const NavContainer = styled.nav(({ theme }) => {
  return css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem ${theme.sizes.gaps["5"]} ${theme.sizes.gaps["6"]};
    background: linear-gradient(
      180deg,
      ${theme.colors.background.main} 0%,
      ${theme.colors.brand.dark} 100%
    );
  `;
});

export const NavUpperPartContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    align-items: center;
    padding: ${theme.sizes.gaps["2"]} 0rem;
    gap: ${theme.sizes.gaps["4"]};
  `;
});

export const NavUpperPartItem = styled.div(({ theme }) => {
  return css`
    display: flex;
    gap: ${theme.sizes.gaps["2"]};
  `;
});

export const NavBottomPart = styled.div(({ theme }) => {
  return css`
    display: flex;
    gap: ${theme.sizes.gaps["4"]};
    padding: ${theme.sizes.gaps["2"]} 0rem;
  `;
});

export const UserContainer = styled.div(({ theme }) => {
  return css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${theme.sizes.gaps["2"]};
    padding: ${theme.sizes.gaps["1"]} ${theme.sizes.gaps["3"]};
    border-radius: ${theme.borderRadius.round};
    border: ${theme.sizes.gaps["px"]} solid ${theme.colors.blue["900"]};
    background: ${theme.colors.blueGray["800"]};
    user-select: none;

    &:hover {
      border-color: ${theme.colors.blue["700"]};
      background: ${theme.colors.blueGray["700"]};
    }
  `;
});

export const UserAvatar = styled.img(({ theme }) => {
  return css`
    width: ${theme.sizes.gaps["8"]};
    height: ${theme.sizes.gaps["8"]};
    border-radius: ${theme.borderRadius.round};
    pointer-events: none;
  `;
});
