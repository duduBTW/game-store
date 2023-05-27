import styled, { css } from "styled-components";

export const Container = styled.button(({ theme }) => {
  const {
    sizes: { gaps },
    colors,
  } = theme;

  return css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: ${gaps["3"]} ${gaps["8"]};
    background: linear-gradient(90deg, ${colors.brand.gradiant.main});
    border-radius: 1.2rem;

    transition: background 0.2s ease;
    &:hover {
      transition: background 0.2s ease;
      background: linear-gradient(90deg, ${colors.brand.gradiant.light});
    }
  `;
});
