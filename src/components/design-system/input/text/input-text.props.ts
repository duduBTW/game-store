import { FieldValues, UseControllerProps } from "react-hook-form";

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
}
