import styled, { css, keyframes } from "styled-components";
import InputText from "@/components/design-system/input/text";

export const Container = styled.form(({ theme }) => {
  return css`
    padding: ${theme.sizes.gaps["4"]} ${theme.sizes.gaps["5"]};
    width: ${theme.sizes.container["small"]};
    max-width: 100%;
    max-height: 90vh;
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.shadow["lg"]};
    background-color: ${theme.colors.gray["900"]};
    display: flex;
    flex-direction: column;
    gap: ${theme.sizes.gaps["4"]};
    animation: ${popIn} 0.15s ease;
  `;
});

export const popIn = keyframes`
  0% {
    transform: scale(0.99);
  }
  100% {
    transform: scale(1);
  }
`;

export const UpperPartContainer = styled.div(() => {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
});

export const UpperPartActionContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    gap: ${theme.sizes.gaps["2"]};
  `;
});

export const BottomPartContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: ${theme.sizes.gaps["3"]};
  `;
});

export const StyledInputText = styled(InputText)(() => {
  return css`
    flex: 1;
  `;
});

export const SendIconContainer = styled.div(() => {
  return css`
    height: 46px;
    display: grid;
    place-items: center;
  `;
});
