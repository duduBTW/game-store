import { Asset } from "@/service/game";

export type Params = {
  id: string;
};

export interface GameTitleFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  id: string;
}

export interface AssetListProps {
  assets: Asset[];
  id: string;
}

export interface AssetItemProps {
  asset: Asset;
  id: string;
}
