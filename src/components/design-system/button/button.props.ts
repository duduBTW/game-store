export type ButtonVariant = "contained" | "outlined";

export interface ButtonCustomization {
  variant: ButtonVariant;
  isLoading: boolean;
}

export interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ButtonCustomization> {
  children?: React.ReactNode;
}
