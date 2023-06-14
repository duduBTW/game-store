import { cloneElement } from "react";
import { useTheme } from "styled-components";

import { Props } from "./icon-button.props";
import { StyledIconButton, StyledLoaderLineIcon } from "./icon-button.styles";

function IconButton({ children, isLoading, ...rest }: Props) {
  const theme = useTheme();
  const content = isLoading ? <StyledLoaderLineIcon /> : children;

  return (
    <StyledIconButton {...rest} data-is-loading={isLoading}>
      {cloneElement(content, {
        size: theme.sizes.gaps["5"],
      })}
    </StyledIconButton>
  );
}

export default IconButton;
