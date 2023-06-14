import { NewAsset } from "@/service/game";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  asset?: NewAsset;
}

export interface ImageAssetProps extends React.HTMLAttributes<HTMLElement> {
  asset: NewAsset;
}
