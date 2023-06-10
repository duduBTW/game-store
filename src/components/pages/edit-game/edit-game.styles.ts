import styled, { css } from "styled-components";
import Tabs from "@/components/design-system/tabs";

export const Container = styled.div(() => {
  return css`
    display: grid;
    grid-template-columns: auto 1fr;
    height: 100vh;
  `;
});

export const SidePartContainer = styled(Tabs.List)(({ theme }) => {
  return css`
    padding: ${theme.sizes.gaps["12"]} ${theme.sizes.gaps["8"]};
    display: flex;
    flex-direction: column;
  `;
});

export const SidePartTrigger = styled(Tabs.Trigger)(({ theme }) => {
  return css`
    padding: ${theme.sizes.gaps["3"]} 0;
    width: ${theme.sizes.gaps["64"]};
  `;
});

export const MainPartContainer = styled(Tabs.Content)(({ theme }) => {
  return css`
    padding: ${theme.sizes.gaps["12"]} ${theme.sizes.gaps["16"]};
  `;
});
