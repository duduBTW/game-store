import styled, { css } from "styled-components";

export const Container = styled.div(({ theme }) => {
  return css`
    border-radius: ${theme.borderRadius.medium};
    background-color: ${theme.colors.gray["900"]};
    border: ${theme.sizes.gaps.px} solid ${theme.colors.gray["800"]};
    padding: ${theme.sizes.gaps["5"]};
  `;
});

export const UpperPartContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
});

export const TitleContainer = styled.div(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    gap: ${theme.sizes.gaps["2"]};
  `;
});

export const BottomPartContainer = styled.form(({ theme }) => {
  return css`
    margin-top: ${theme.sizes.gaps["4"]};
  `;
});

export const BottomPartActions = styled.div(({ theme }) => {
  return css`
    margin-top: ${theme.sizes.gaps["3"]};
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto auto 1fr auto;
    gap: ${theme.sizes.gaps["2"]};
  `;
});

export const LikedRadioErrorMesageContainer = styled.div(() => {
  return css`
    grid-column: span 4;
  `;
});
