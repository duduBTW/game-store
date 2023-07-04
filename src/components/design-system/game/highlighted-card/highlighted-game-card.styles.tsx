import styled, { css } from "styled-components";
import AssetDisplay from "@/components/design-system/assets/display";
import { getTypographyStyles } from "@/components/design-system/typography";
import geHtmlCss from "@/components/design-system/html";

export const Container = styled.div(({ theme }) => {
  return css`
    max-width: 100%;
    width: ${theme.sizes.container.large};
    padding: ${theme.sizes.gaps["10"]};
    display: grid;
    grid-template-areas:
      "asset title"
      "asset description"
      "asset action";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
    row-gap: ${theme.sizes.gaps["3"]};
    column-gap: ${theme.sizes.gaps["8"]};
    border: ${theme.sizes.gaps.px} solid ${theme.colors.gray["800"]};
    border-radius: ${theme.borderRadius.medium};
    opacity: 0.1;
    transition: opacity 0.25s ease-out;

    &[data-active="true"] {
      opacity: 1;
    }
  `;
});

export const AssetDisplayContainer = styled.button(({ theme }) => {
  return css`
    cursor: pointer;
    grid-area: asset;
    position: relative;
    display: flex;

    &:hover {
      &::after {
        opacity: 0.2;
      }
    }

    &::after {
      transition: opacity 0.2s ease;
      content: "";
      position: absolute;
      background-color: ${theme.colors.brand.light};
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: ${theme.borderRadius.medium};
      opacity: 0;
    }
  `;
});

export const StyledAssetDisplay = styled(AssetDisplay)(({ theme }) => {
  return css`
    width: auto;
    height: ${theme.sizes.gaps["64"]};
  `;
});

export const Html = styled.div(({ theme }) => {
  return css`
    ${geHtmlCss(theme)}

    p {
      ${getTypographyStyles({
        theme,
        color: "gray.300",
        fontFamily: "Nunito",
        lineHeight: "paragraph",
        size: "sm",
        weight: "regular",
      })}
    }

    overflow: hidden;
    max-height: ${theme.sizes.gaps["32"]};
  `;
});
