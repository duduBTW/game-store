import styled, { DefaultTheme, css } from "styled-components";
import SizeContainer from "@/components/design-system/size-container/size-container";
import Tabs from "@/components/design-system/tabs";
import Carousel from "@/components/design-system/carousel/carousel";
import UserReviewList from "../reviews/user";
import ReviewStatistcs from "../reviews/statistics/reviews-statistics";
import CreateReview from "../reviews/create";

export const AbsoluteContainer = styled(SizeContainer)(({ theme }) => {
  const { sizes, mq } = theme;

  return css`
    background-color: ${theme.colors.background.main};
    border-left: 0.1rem solid ${theme.colors.gray["800"]};
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 2;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    gap: ${sizes.gaps["6"]};

    ${mq.fromMobile} {
      padding-top: ${sizes.gaps["6"]};
    }
  `;
});

export const SideBarIcon = styled.button(({ theme }) => {
  const { sizes } = theme;

  return css`
    z-index: 2;
    position: fixed;
    vertical-align: baseline;
    height: 3rem;
    top: 2.4rem;
    right: ${sizes.gaps["5"]};
    cursor: pointer;
  `;
});

export const DesktopContainer = styled(SizeContainer)(({ theme }) => {
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
    padding: 0 ${getHorizontalGap(theme)} ${theme.sizes.gaps["6"]};
  `;
});

export const StyledCarouselScroller = styled(Carousel.Scroller)(({ theme }) => {
  return css`
    gap: ${theme.sizes.gaps["4"]};
  `;
});

export const StyledUserReviewList = styled(UserReviewList)(({ theme }) => {
  return css`
    // prettier-ignore
    padding: ${theme.sizes.gaps["10"]} ${getHorizontalGap(theme)} ${theme.sizes
      .gaps["6"]};
  `;
});

export const StyledCreateReview = styled(CreateReview)(({ theme }) => {
  return css`
    margin: ${theme.sizes.gaps["10"]} ${getHorizontalGap(theme)} 0;
  `;
});

export const StyledReviewStatistcs = styled(ReviewStatistcs)(({ theme }) => {
  return css`
    opacity: 0.4;
    // prettier-ignore
    width: calc(
      ${theme.sizes.container.small} - ${getHorizontalGap(
      theme
    )} - ${getHorizontalGap(theme)}
    );

    transition: opacity 0.2s ease;
    &[data-active="true"] {
      opacity: 1;
    }
  `;
});

// ----------
// Tabs
// ----------
export const StyledTabsContent = styled(Tabs.Content)(() => {
  return css`
    flex-grow: 1;
    overflow-y: auto;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `;
});

export const StyledTabsList = styled(Tabs.List)(({ theme }) => {
  return css`
    width: min-content;
    display: flex;
    align-items: center;
    margin: 0 ${getHorizontalGap(theme)};
    background-color: ${theme.colors.gray["900"]};
    border-radius: ${theme.borderRadius.small};
  `;
});

export const StyledTabsTrigger = styled(Tabs.Trigger)(({ theme }) => {
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

// ----------
// Helpers
// ----------

function getHorizontalGap(theme: DefaultTheme) {
  return theme.sizes.gaps["12"];
}
