import styled, { css } from "styled-components";

export const StyledTabList = styled.div(() => {
  return css`
    display: flex;
    align-items: center;
  `;
});

export const StyledTabTrigger = styled.button(({ theme }) => {
  return css`
    padding: ${theme.sizes.gaps["1"]} ${theme.sizes.gaps["6"]};
    border-radius: ${theme.borderRadius.small};
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: ${theme.colors.gray["800"]};
    }

    &[data-selected="true"] {
      cursor: initial;
      background: ${theme.colors.brand.main};
    }
  `;
});

export const StyledTriggerSeparator = styled.div(({ theme }) => {
  return css`
    width: ${theme.sizes.gaps.px};
    height: ${theme.sizes.gaps["5"]};
    background-color: ${theme.colors.gray["600"]};
    margin-left: -${theme.sizes.gaps.px};
  `;
});
