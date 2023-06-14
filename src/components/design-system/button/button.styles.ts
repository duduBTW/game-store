import styled, { DefaultTheme, css, keyframes } from "styled-components";
import LoaderLineIcon from "remixicon-react/LoaderLineIcon";
import {
  Container as TypographyContainer,
  getTypographyColorStyles,
  getTypographyWeightStyles,
} from "../typography/typography.styles";
import { ButtonCustomization, ButtonVariant } from "./button.props";

export const StyledButton = styled.button<ButtonCustomization>(
  ({ theme, variant, isLoading }) => {
    return css`
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

        ${() => {
          if (!isLoading) {
            return;
          }

          return css`
            cursor: wait;
            background: linear-gradient(
              90deg,
              ${theme.colors.loading.gradient}
            );
            background-size: 400% 400%;
            animation: ${loadingButtonAnimation} 10s ease infinite;
            z-index: 2;
          `;
        }}
      }
    `;
  }
);

export const StyledLoaderLineIcon = styled(LoaderLineIcon)(() => {
  return css`
    animation: ${loadingIconSpinAnimation} 5s linear infinite;
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
