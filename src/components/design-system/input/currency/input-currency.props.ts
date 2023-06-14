import { UseControllerProps, FieldValues } from "react-hook-form";

export type CurrencyValues = {
  maskedValue: string;
  rawValue: number;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type ContainerHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "name"
>;

export interface Props<T extends FieldValues = FieldValues>
  extends ContainerHTMLAttributes,
    UseControllerProps<T> {
  label?: string;
  inputProps?: InputProps;
  onValueChange?: (newValue: CurrencyValues) => void;
  precision?: number;
}

export type UseInputCurrency = Pick<Props, "defaultValue" | "precision">;
