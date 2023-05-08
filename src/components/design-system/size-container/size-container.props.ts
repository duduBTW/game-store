import { type ContainerSize } from "@/styled";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size: ContainerSize;
  centered?: boolean;
  children: React.ReactNode;
}
