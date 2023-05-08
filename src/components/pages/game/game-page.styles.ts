import SizeContainer from "@/components/design-system/size-container/size-container";
import Typography from "@/components/design-system/typography/typography";
import styled, { css } from "styled-components";

export const UpperPartContainer = styled(SizeContainer)(({ theme }) => {
  const { gaps } = theme.sizes;

  return css`
    padding: ${gaps[12]} 0;
  `;
});

export const BottomPartContainer = styled(SizeContainer)(({ theme }) => {
  const { gaps } = theme.sizes;

  return css`
    padding: ${gaps[6]};
  `;
});

export const Image = styled.img(({ theme }) => {
  return css`
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center 20%;
    border-radius: ${theme.borderRadius.medium};
  `;
});

export const GameDescription = styled(Typography)(() => {
  return css`
    hyphens: auto;
    text-align: justify;
  `;
});
