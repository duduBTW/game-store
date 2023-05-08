import styled, { css } from "styled-components";
import { Props } from "./size-container.props";

export const Container = styled.div<Pick<Props, "size" | "centered">>(
  ({ theme, size, centered }) => {
    const getCenteredStyles = () => {
      if (!centered) {
        return;
      }

      return css`
        margin: 0 auto;
      `;
    };

    return css`
      max-width: ${theme.sizes.container[size]};
      width: 100%;
      ${getCenteredStyles()}
    `;
  }
);
