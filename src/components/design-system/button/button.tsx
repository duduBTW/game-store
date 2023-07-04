import { useTheme } from "styled-components";

import { Props as TypographyProps } from "@/components/design-system/typography";

import { Props, ButtonSize, AdditionalInfoProps } from "./button.props";
import {
  AdditionalInfoContainer,
  AdditionalInfoLabel,
  StartIconContainer,
  StyledButton,
  StyledLoaderLineIcon,
  StyledTypography,
} from "./button.styles";

export default function Button({
  children,
  variant = "contained",
  isLoading = false,
  size = "default",
  buttonColor = "blueGray",
  startIcon: StartIcon,
  ...rest
}: Props) {
  const theme = useTheme();

  const typographyConfiguration: Record<
    ButtonSize,
    Partial<TypographyProps>
  > = {
    default: {
      size: "lg",
      weight: "bold",
      lineHeight: "title",
    },
    small: {
      as: "span",
      weight: "medium",
      size: "sm",
    },
  };

  const getIconColor = () => {
    if (buttonColor === "brand") {
      return theme.colors.brand.main;
    }

    if (variant === "contained") {
      return theme.colors[buttonColor]["100"];
    }

    return theme.colors[buttonColor]["500"];
  };

  return (
    <StyledButton
      {...rest}
      isLoading={isLoading}
      variant={variant}
      size={size}
      buttonColor={buttonColor}
      disabled={isLoading || rest.disabled}
    >
      {StartIcon && (
        <StartIconContainer data-loading={isLoading}>
          <StartIcon size={theme.sizes.gaps["4"]} color={getIconColor()} />
        </StartIconContainer>
      )}

      {isLoading && <StyledLoaderLineIcon size={theme.sizes.gaps["5"]} />}

      {children && (
        <StyledTypography
          data-loading={isLoading}
          {...typographyConfiguration[size]}
        >
          {children}
        </StyledTypography>
      )}
    </StyledButton>
  );
}

function AdditionalInfo({ children, label, ...rest }: AdditionalInfoProps) {
  return (
    <AdditionalInfoContainer>
      <AdditionalInfoLabel>{label}</AdditionalInfoLabel>

      {children}
    </AdditionalInfoContainer>
  );
}

Button.AdditionalInfo = AdditionalInfo;
