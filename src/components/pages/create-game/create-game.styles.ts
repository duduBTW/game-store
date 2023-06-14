import Button from "@/components/design-system/button/button";
import SizeContainer from "@/components/design-system/size-container/size-container";
import styled, { css } from "styled-components";

export const Wrapper = styled(SizeContainer)(({ theme }) => {
  return css`
    padding: 0 ${theme.sizes.gaps["4"]};

    ${theme.mq.fromDesktop} {
      padding: 0;
    }
  `;
});

export const Container = styled(SizeContainer)(({ theme }) => {
  return css`
    padding-top: ${theme.sizes.gaps["32"]};
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: ${theme.sizes.gaps["16"]};
    gap: ${theme.sizes.gaps["8"]};
  `;
});

export const BottomPart = styled.div(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    gap: ${theme.sizes.gaps["4"]};
  `;
});

export const SubmitButton = styled(Button)(() => {
  return css`
    z-index: 2;
  `;
});
