import styled, { css } from "styled-components";

export const UpperPartContainer = styled.div(({ theme }) => {
  return css`
    display: inline-flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: ${theme.sizes.gaps["2"]};
  `;
});
