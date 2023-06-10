import { FieldValues, UseControllerProps } from "react-hook-form";

export interface Props<T extends FieldValues = FieldValues>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "name">,
    UseControllerProps<T> {
  label?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
