import styled, { css } from "styled-components";
import SizeContainer from "@/components/design-system/size-container/size-container";
import Typography from "@/components/design-system/typography";
import Button from "@/components/design-system/button/button";
import Carousel from "@/components/design-system/carousel/carousel";
import AssetDisplay from "@/components/design-system/assets/display";
import getHtmlCss from "@/components/design-system/html";
import Nav from "@/components/design-system/nav";

export const Container = styled.div(() => {
  return css`
    height: 100%;
    display: flex;
    flex-direction: column;
  `;
});

export const Content = styled.div(({ theme }) => {
  return css`
    position: relative;
    flex-grow: 1;
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    position: relative;
    isolation: isolate;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50rem;
      z-index: -1;
      background: linear-gradient(
          0deg,
          ${theme.colors.background.main} 0%,
          rgba(${theme.colors.background.rgb}, 1) 47.74%,
          rgba(${theme.colors.background.rgb}, 0.72) 100%
        ),
        ${theme.colors.brand.main};
    }
  `;
});

export const StyledNav = styled(Nav)(({ theme }) => {
  return css`
    &[data-expanded="false"] {
      padding-right: ${theme.sizes.gaps["16"]};
    }
  `;
});

export const UpperPartContainer = styled(SizeContainer)(({ theme }) => {
  const { sizes, mq } = theme;

  return css`
    padding: 0 0 ${sizes.gaps["8"]};
    padding-left: ${sizes.gaps["5"]};
    padding-right: ${sizes.gaps["12"]};

    ${mq.fromMobile} {
      padding-left: 0;
    }
  `;
});

export const CarouselUpperPartContainer = styled(SizeContainer)(({ theme }) => {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: ${theme.sizes.gaps["6"]};
    padding-inline: ${theme.sizes.gaps["6"]};

    ${theme.mq.fromMobile} {
      padding-inline: 0;
    }
  `;
});

export const StyledCarouselScroller = styled(Carousel.Scroller)(({ theme }) => {
  return css`
    gap: 1.2rem;

    ${theme.mq.fromMobile} {
      gap: 2.4rem;
    }
  `;
});

export const BottomPartContainer = styled(SizeContainer)(({ theme }) => {
  const { sizes } = theme;

  return css`
    display: grid;
    grid-template-rows: 1fr auto;
    padding: ${sizes.gaps[6]};
  `;
});

export const GameDescription = styled.div(({ theme }) => {
  return css`
    hyphens: auto;
    text-align: justify;
    ${getHtmlCss(theme)}

    p {
      color: ${theme.colors.gray["300"]};
    }
  `;
});

export const BuyContainer = styled.div(({ theme }) => {
  return css`
    width: 100%;
    background-color: ${theme.colors.gray["900"]};
    border-radius: 1.2rem;
    display: flex;
    align-items: center;
  `;
});

export const Price = styled(Typography)(({ theme }) => {
  return css`
    width: ${theme.sizes.gaps["48"]};
    text-align: center;
  `;
});

export const BuyButton = styled(Button)(({ theme }) => {
  return css`
    flex-grow: 1;
    border: 0.3rem solid ${theme.colors.gray["900"]};
  `;
});

interface ImageStyledProps {
  isActive?: boolean;
}

export const StyledAssetDisplayContainer = styled.button(() => {
  return css`
    cursor: pointer;
  `;
});

export const StyledAssetDisplay = styled(AssetDisplay)<ImageStyledProps>(
  ({ theme, isActive }) => {
    return css`
      pointer-events: none;
      width: ${theme.sizes.container.small};
      max-width: calc(100vw - ${theme.sizes.gaps["12"]});
      aspect-ratio: 16 / 9;
      border-radius: ${theme.borderRadius.medium};
      transition: opacity 0.25s ease-out;
      opacity: 1;

      ${!isActive &&
      css`
        opacity: 0.08;
      `}
    `;
  }
);
