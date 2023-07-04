import styled, { css } from "styled-components";
import Typography from "../../typography/typography";
import { Link } from "react-router-dom";

export const Container = styled.div(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    gap: ${theme.sizes.gaps["6"]};
    margin-bottom: ${theme.sizes.gaps["8"]};
  `;
});

export const UpperPart = styled.div(() => {
  return css`
    display: flex;
    justify-content: space-between;
  `;
});

export const Bottompart = styled.div(({ theme }) => {
  return css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: ${theme.sizes.gaps["4"]};
    row-gap: ${theme.sizes.gaps["6"]};
  `;
});

export const GameCardContainer = styled(Link)(() => {
  return css``;
});

export const GameCardTitle = styled(Typography)(({ theme }) => {
  return css`
    margin-top: ${theme.sizes.gaps["3"]};
  `;
});

export const GameCardPrice = styled(Typography)(({ theme }) => {
  return css`
    margin-top: ${theme.sizes.gaps["2"]};
  `;
});
