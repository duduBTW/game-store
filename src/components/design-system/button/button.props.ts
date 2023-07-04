import { RemixiconReactIconComponentType } from "remixicon-react";
import { DefaultTheme } from "styled-components";

export type ButtonColor = keyof DefaultTheme["colors"];
export type ButtonVariant = "contained" | "outlined";
export type ButtonSize = "small" | "default";

export interface ButtonCustomization {
  variant: ButtonVariant;
  size: ButtonSize;
  isLoading: boolean;
  buttonColor: Exclude<ButtonColor, "background" | "loading">;
}

export interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ButtonCustomization> {
  children?: React.ReactNode;
  startIcon?: RemixiconReactIconComponentType;
  as?: React.ElementType;
}

export interface AdditionalInfoProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}
