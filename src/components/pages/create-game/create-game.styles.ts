import Button from "@/components/design-system/button/button";
import SizeContainer from "@/components/design-system/size-container/size-container";
import styled, { css } from "styled-components";

export const Wrapper = styled(SizeContainer)(({ theme }) => {
  return css`
    height: 100%;
    padding: 0 ${theme.sizes.gaps["4"]};

    ${theme.mq.fromDesktop} {
      padding: 0;
    }
  `;
});

export const Container = styled(SizeContainer)(({ theme }) => {
  return css`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: ${theme.sizes.gaps["8"]};
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
