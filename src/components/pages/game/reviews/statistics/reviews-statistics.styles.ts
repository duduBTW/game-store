import styled, { css } from "styled-components";

export const ReviewStatistcsContainer = styled.div(({ theme }) => {
  return css`
    height: ${theme.sizes.gaps["32"]};
    border: ${theme.sizes.gaps.px} solid ${theme.colors.gray["800"]};
    border-radius: ${theme.borderRadius["medium"]};
    padding: ${theme.sizes.gaps["4"]} ${theme.sizes.gaps["6"]};
    display: grid;
    grid-template-areas:
      "title chart"
      "total chart";
    grid-template-columns: 1fr auto;
    overflow: hidden;
    position: relative;

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      right: 0;
      top: 0;
      width: 60%;
      height: 100%;
      background: linear-gradient(
          90deg,
          ${theme.colors.background.main} 0%,
          rgba(${theme.colors.background.rgb}, 1) 47.74%,
          rgba(${theme.colors.background.rgb}, 0.72) 100%
        ),
        ${theme.colors.brand.main};
    }
  `;
});

export const ChartContainer = styled.div(() => {
  return css`
    grid-area: chart;
  `;
});

export const TitleContainer = styled.div(() => {
  return css`
    grid-area: title;
  `;
});

export const TotalContainer = styled.div(() => {
  return css`
    grid-area: total;
    align-self: flex-end;
  `;
});
