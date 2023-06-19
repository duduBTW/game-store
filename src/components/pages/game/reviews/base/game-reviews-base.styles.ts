import geHtmlCss from "@/components/design-system/html";
import styled, { css } from "styled-components";

export const UserAvatar = styled.img(({ theme }) => {
  return css`
    width: ${theme.sizes.gaps["10"]};
    height: ${theme.sizes.gaps["10"]};
    border-radius: ${theme.borderRadius.round};
  `;
});

export const UserReviewObservation = styled.div(({ theme }) => {
  return css`
    ${geHtmlCss(theme)};
    word-break: break-all;
  `;
});
