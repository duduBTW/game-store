import { Asset, NewAsset } from "@/service/game";

export interface Props {
  upperPart?: UpperPartProps;
  defaultAsset?: Asset;
  onSubmit?: (newAsset: NewAsset) => Promise<true | string>;
  onValueChange?: (newAsset: NewAsset) => void;
  isLoading?: boolean;
}

export interface UpperPartProps {
  title?: string;
  action?: React.ReactNode;
}

export interface BottomPartProps {
  isLoading?: boolean;
}
