import styled, { css } from "styled-components";

export const ReviewStatistcsContainer = styled.div(({ theme }) => {
  return css`
    height: ${theme.sizes.gaps["32"]};
    border: ${theme.sizes.gaps.px} solid ${theme.colors.gray["800"]};
    border-radius: ${theme.borderRadius["medium"]};
  `;
});
