import styled, { css } from "styled-components";

export const BreadcrumbsContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    align-items: center;
    gap: ${theme.sizes.gaps["6"]};
  `;
});
