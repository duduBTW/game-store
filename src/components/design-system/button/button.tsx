import { useTheme } from "styled-components";
import Typography from "@/components/design-system/typography";
import { Props } from "./button.props";
import { StyledButton, StyledLoaderLineIcon } from "./button.styles";

export default function Button({
  children,
  variant = "contained",
  isLoading = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <StyledButton
      {...rest}
      isLoading={isLoading}
      variant={variant}
      disabled={isLoading || rest.disabled}
    >
      {isLoading ? (
        <StyledLoaderLineIcon size={theme.sizes.gaps["5"]} />
      ) : (
        <Typography size="lg" weight="bold" lineHeight="title">
          {children}
        </Typography>
      )}
    </StyledButton>
  );
}
