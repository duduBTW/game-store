import styled, { css } from "styled-components";
import SizeContainer from "@/components/design-system/size-container/size-container";
import Typography from "@/components/design-system/typography";

export const Container = styled.div(() => {
  return css`
    flex-grow: 1;
    display: grid;
    grid-template-rows: auto auto 1fr;
  `;
});

export const UpperPartContainer = styled(SizeContainer)(({ theme }) => {
  const { sizes, mq } = theme;

  return css`
    padding: ${sizes.gaps[12]} 0;
    padding-left: ${sizes.gaps[5]};
    padding-right: ${sizes.gaps["12"]};

    ${mq.fromMobile} {
      padding-left: 0;
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

export const Button = styled.button(() => {
  return css`
    width: 100%;
  `;
});
