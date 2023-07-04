import styled, { css } from "styled-components";
import Tabs from "@/components/design-system/tabs";
import SizeContainer from "@/components/design-system/size-container/size-container";
import Modal from "@/components/design-system/modal";
import { NavUpperPart } from "@/components/design-system/nav";

export const Container = styled.div(() => {
  return css`
    display: grid;
    grid-template-columns: 0.8fr 2fr;
    height: 100vh;
  `;
});

export const SidePartContainer = styled(Tabs.List)(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: ${theme.sizes.gaps["1"]};
    padding: ${theme.sizes.gaps["12"]} ${theme.sizes.gaps["4"]};
    background-color: ${theme.colors.background.main};
    border-right: ${theme.sizes.gaps.px} solid ${theme.colors.gray["800"]};
  `;
});

export const SidePartTrigger = styled(Tabs.Trigger)(({ theme }) => {
  return css`
    cursor: pointer;
    padding: ${theme.sizes.gaps["2"]} ${theme.sizes.gaps["4"]};
    width: ${theme.sizes.gaps["64"]};
    border-radius: ${theme.borderRadius.small};

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

export const MainPartContainerWrapper = styled.div(({ theme }) => {
  return css`
    width: 100%;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  `;
});

export const StyledNavUpperPart = styled(NavUpperPart)(({ theme }) => {
  return css`
    padding-left: ${theme.sizes.gaps["16"]};
  `;
});

export const MainPartContainer = styled(SizeContainer)(({ theme }) => {
  return css`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: ${theme.sizes.gaps["12"]} ${theme.sizes.gaps["16"]};
  `;
});

export const StyledTabsContent = styled(Tabs.Content)(() => {
  return css`
    flex: 1;
    height: 100%;
  `;
});

export const GameSingleInputFormContainer = styled.form(({ theme }) => {
  return css`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${theme.sizes.gaps["4"]};
  `;
});

export const NavContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    margin-bottom: ${theme.sizes.gaps["10"]};
  `;
});

export const GameAssetsContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    gap: ${theme.sizes.gaps["8"]};
  `;
});

export const GameAssetsModalContent = styled(Modal.Content)(({ theme }) => {
  return css`
    width: ${theme.sizes.container.small};
    display: flex;
    flex-direction: column;
    gap: ${theme.sizes.gaps["3"]};
    background-color: ${theme.colors.gray["800"]};
  `;
});

export const AssetListContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    gap: ${theme.sizes.gaps["6"]};
  `;
});
