import styled, { css } from "styled-components";
import {
  loadingButtonAnimation,
  loadingIconSpinAnimation,
} from "../button/button.styles";
import LoaderLineIcon from "remixicon-react/LoaderLineIcon";

export const StyledIconButton = styled.button(({ theme }) => {
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

    :not(:disabled) {
      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      cursor: initial;
      opacity: 0.4;
    }

    &[data-is-loading="true"] {
      cursor: wait;
      background: linear-gradient(90deg, ${theme.colors.loading.gradient});
      background-size: 400% 400%;
      animation: ${loadingButtonAnimation} 10s ease infinite;
      z-index: 2;
      border-color: transparent;
    }
  `;
});

export const StyledLoaderLineIcon = styled(LoaderLineIcon)(() => {
  return css`
    animation: ${loadingIconSpinAnimation} 5s linear infinite;
  `;
});
