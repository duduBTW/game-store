import { GameWithAssets } from "@/service/game";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  game: GameWithAssets;
  isActive?: boolean;
  onAssetClick?: (
    assets: GameWithAssets["Assets"],
    currentAsset: number
  ) => void;
}
