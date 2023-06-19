import styled, { DefaultTheme, css, keyframes } from "styled-components";
import LoaderLineIcon from "remixicon-react/LoaderLineIcon";
import Typography, {
  Container as TypographyContainer,
  getTypographyColorStyles,
  getTypographyWeightStyles,
} from "@/components/design-system/typography";

import { ButtonCustomization, ButtonVariant } from "./button.props";

export const StyledButton = styled.button<ButtonCustomization>(
  ({ theme, variant, isLoading, size, buttonColor }) => {
    if (size === "small") {
      return css`
        position: relative;
        padding: 0 ${theme.sizes.gaps["3"]};
        height: ${theme.sizes.gaps["6"]};
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${theme.sizes.gaps["2"]};
        border-radius: ${theme.borderRadius.round};
        ${getButtonColorStyles(theme, buttonColor, variant)}

        &:hover {
          cursor: pointer;
        }

        &:disabled {
          cursor: initial;
          background: ${theme.colors.gray["800"]};

          ${TypographyContainer} {
            color: ${theme.colors.gray["300"]};
            font-weight: 400;
          }

          ${getLoadingStyles(theme, isLoading)}
        }
      `;
    }

    return css`
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      padding: ${theme.sizes.gaps["3"]} ${theme.sizes.gaps["8"]};
      border-radius: 1.2rem;

      transition: background 0.2s ease;

      ${getButtonVariantStyles(theme, variant)}

      &:disabled {
        cursor: initial;
        background: ${theme.colors.gray["800"]};

        ${TypographyContainer} {
          color: ${theme.colors.gray["300"]};
          font-weight: 400;
        }

        ${getLoadingStyles(theme, isLoading)}
      }
    `;
  }
);

export const StartIconContainer = styled.div(() => {
  return css`
    &[data-loading="true"] {
      opacity: 0;
    }
  `;
});

export const StyledLoaderLineIcon = styled(LoaderLineIcon)(() => {
  return css`
    animation: ${loadingIconSpinAnimation} 5s linear infinite;
    position: absolute;
  `;
});

export const StyledTypography = styled(Typography)(() => {
  return css`
    &[data-loading="true"] {
      opacity: 0;
    }
  `;
});

export const loadingButtonAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const loadingIconSpinAnimation = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

// ------------
// Elpers
// ------------
export function getButtonVariantStyles(
  theme: DefaultTheme,
  variant: ButtonVariant
) {
  switch (variant) {
    case "contained":
      return css`
        background: linear-gradient(90deg, ${theme.colors.brand.gradient.main});

        &:hover,
        &:focus {
          transition: background 0.2s ease;
          background: linear-gradient(
            90deg,
            ${theme.colors.brand.gradient.light}
          );
        }
      `;
    case "outlined":
      return css`
        border: ${theme.sizes.gaps["px"]} solid ${theme.colors.gray["800"]};

        ${TypographyContainer} {
          ${getTypographyWeightStyles("regular")};
          ${getTypographyColorStyles(theme, "gray.300")};
        }

        &:hover,
        &:focus {
          border-color: ${theme.colors.brand.light};

          ${TypographyContainer} {
            color: ${theme.colors.brand.light};
          }
        }
      `;
  }
}

function getLoadingStyles(theme: DefaultTheme, isLoading: boolean) {
  if (!isLoading) {
    return "";
  }

  return css`
    cursor: wait;
    border-color: transparent;
    background: linear-gradient(90deg, ${theme.colors.loading.gradient});
    background-size: 400% 400%;
    animation: ${loadingButtonAnimation} 10s ease infinite;
    z-index: 2;
  `;
}

export function getButtonColorStyles(
  theme: DefaultTheme,
  buttonColor: ButtonCustomization["buttonColor"],
  variant: ButtonCustomization["variant"]
) {
  if (buttonColor === "brand") {
    return css`
      background: linear-gradient(90deg, ${theme.colors.brand.gradient.main});

      &:hover:not([disabled]),
      &:focus:not([disabled]) {
        background: linear-gradient(
          90deg,
          ${theme.colors.brand.gradient.light}
        );
      }
    `;
  }

  if (variant === "contained") {
    return css`
      border: ${theme.sizes.gaps.px} solid transparent;
      background-color: ${theme.colors[buttonColor]["900"]};
      color: ${theme.colors[buttonColor]["100"]};

      &:hover:not([disabled]),
      &:focus:not([disabled]) {
        background-color: ${theme.colors[buttonColor]["700"]};
      }
    `;
  }

  return css`
    border: ${theme.sizes.gaps.px} solid ${theme.colors[buttonColor]["800"]};

    &:hover:not([disabled]),
    &:focus:not([disabled]) {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `;
}
