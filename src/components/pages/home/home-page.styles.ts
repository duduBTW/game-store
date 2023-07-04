import Carousel from "@/components/design-system/carousel";
import SizeContainer from "@/components/design-system/size-container/size-container";
import styled, { css } from "styled-components";

export const Container = styled.div(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    gap: ${theme.sizes.gaps["16"]};
  `;
});

export const StyledCarouselScroller = styled(Carousel.Scroller)(({ theme }) => {
  return css`
    gap: ${theme.sizes.gaps["5"]};
  `;
});

export const CarouselUpperPartContainer = styled(SizeContainer)(({ theme }) => {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: ${theme.sizes.gaps["4"]};
  `;
});
