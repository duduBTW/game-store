import styled, { css } from "styled-components";
import SizeContainer from "@/components/design-system/size-container/size-container";
import Tabs from "@/components/design-system/tabs/tabs";
import Carousel from "@/components/design-system/carousel/carousel";

export const Container = styled(SizeContainer)(() => {
  return css``;
});

export const AbsoluteContainer = styled(Container)(({ theme }) => {
  const { sizes, mq } = theme;

  return css`
    background-color: ${theme.colors.background};
    border-left: 0.1rem solid ${theme.colors.gray["800"]};
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 2;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    gap: ${sizes.gaps["12"]};

    ${mq.fromMobile} {
      padding-top: ${sizes.gaps["12"]};
    }
  `;
});

export const TabsContent = styled(Tabs.Content)(({ theme }) => {
  return css`
    flex-grow: 1;
    overflow-y: auto;
    /* padding: 0 ${theme.sizes.gaps["12"]} ${theme.sizes.gaps["12"]}; */
  `;
});

export const TabsList = styled(Tabs.List)(({ theme }) => {
  return css`
    padding: 0 ${theme.sizes.gaps["12"]};
  `;
});

export const SideBarIcon = styled.button(({ theme }) => {
  const { sizes } = theme;

  return css`
    z-index: 2;
    position: fixed;
    vertical-align: baseline;
    height: 3rem;
    top: 4.8rem;
    right: ${sizes.gaps["5"]};
    cursor: pointer;
  `;
});

export const DesktopContainer = styled(Container)(({ theme }) => {
  return css`
    display: none;

    ${theme.mq.fromDesktop} {
      display: block;
    }
  `;
});

export const MobileContainer = styled.div(({ theme }) => {
  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);

    ${theme.mq.fromDesktop} {
      display: none;
    }
  `;
});

export const CarouselUpperPartContainer = styled(SizeContainer)(({ theme }) => {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 ${theme.sizes.gaps["12"]} ${theme.sizes.gaps["6"]};
  `;
});

export const ReviewStatistcsContainer = styled.div(({ theme }) => {
  return css`
    width: calc(
      ${theme.sizes.container.small} - ${theme.sizes.gaps["12"]} -
        ${theme.sizes.gaps["12"]}
    );
    height: ${theme.sizes.gaps["32"]};
    background-color: red;
  `;
});

export const StyledCarouselScroller = styled(Carousel.Scroller)(({ theme }) => {
  return css`
    gap: ${theme.sizes.gaps["4"]};
  `;
});
