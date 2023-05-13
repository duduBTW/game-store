import styled, { css } from "styled-components";
import SizeContainer from "@/components/design-system/size-container/size-container";

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
    padding: ${sizes.gaps["12"]};
    z-index: 2;
    overflow-y: auto;

    ${mq.fromMobile} {
      padding: ${sizes.gaps["12"]} ${sizes.gaps["16"]};
    }
  `;
});

export const Tabs = styled.div(() => {
  return css`
    height: 3.2rem;
    background-color: red;
    position: sticky;
    top: 0;
  `;
});

export const SideBarIcon = styled.button(({ theme }) => {
  const { mq, sizes } = theme;

  return css`
    z-index: 2;
    position: fixed;
    vertical-align: baseline;
    height: 3rem;
    top: 4.8rem;
    right: ${sizes.gaps["5"]};
    cursor: pointer;

    ${mq.fromMobile} {
      right: ${sizes.gaps["8"]};
    }
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
