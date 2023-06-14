import { ControllerFieldState } from "react-hook-form";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  fieldState: ControllerFieldState;
}
